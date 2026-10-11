# frozen_string_literal: true

# SEO helpers. Everything here only changes what is rendered in <head> (through the page payload used
# by jekyll-seo-tag) or the URL of the blog posts. It never touches `doc.data`, which the generated
# indexes (/api/*.json, llms.txt) and the MCP read.

module Vitrine
  module Seo
    DESCRIPTION_LIMIT = 160

    module_function

    def slugify(text)
      text.to_s.downcase.gsub(/[^\w\s-]/, '').gsub(/\s+/, '-').gsub(/-+/, '-').strip
    end

    # "Foo bar *baz* [x](y) `z`" -> "Foo bar baz x z"
    def plain_text(markdown)
      markdown.to_s
              .gsub(/```.*?```/m, ' ')
              .gsub(/!\[[^\]]*\]\([^)]*\)/, ' ')
              .gsub(/\[([^\]]*)\]\([^)]*\)/, '\1')
              .gsub(/[`*_>]/, '')
              .gsub(/<[^>]+>/, ' ')
              .gsub(/\s+/, ' ')
              .strip
    end

    def truncate(text, limit = DESCRIPTION_LIMIT)
      return text if text.length <= limit

      cut = text[0, limit - 1]
      cut = cut.sub(/\s+\S*\z/, '') if cut =~ /\s/
      "#{cut.sub(/[\s,;:.\-–—]+\z/, '')}…"
    end

    # First prose paragraph after the first H1, used when a page has no description of its own.
    def lead_paragraph(content)
      body = content.to_s.sub(/\A\s*#\s+[^\n]*\n/, '')
      body.split(/\n{2,}/).each do |block|
        block = block.strip
        next if block.empty? || block.start_with?('#', '|', '```', '<', '{', '-', '*', '!') || block =~ /\A\d+\./

        text = plain_text(block)
        return text unless text.empty?
      end
      nil
    end

    def heading_title(content)
      m = content.to_s.match(/^#\s+(.+?)\s*$/)
      m && plain_text(m[1])
    end

    # Title for function reference pages. `explicit` is the front-matter title (or nil).
    def function_name(explicit, content)
      name = explicit.to_s.strip.delete_prefix('"').delete_suffix('"')
      name = heading_title(content).to_s.split(/\s+[—–-]\s+/).first.to_s if name.empty?
      name = name.sub(/\[\]\z/, '').strip
      name.start_with?('$') && name =~ /\A\$\w+\z/ ? name : nil
    end
  end
end

# Blog posts: the category ("Getting Started") ended up verbatim in the URL, which produced addresses
# such as /getting%20started/... and /reference%20&amp;%20deployment/.... Use a slug instead.
module Vitrine
  class PostPermalinks < Jekyll::Generator
    safe true
    priority :highest

    def generate(site)
      site.posts.docs.each do |post|
        next if post.data['permalink']

        category = Vitrine::Seo.slugify(post.data['category'] || post.data['categories']&.first || 'guides')
        slug = Vitrine::Seo.slugify(post.basename_without_ext.sub(/\A\d{4}-\d{2}-\d{2}-/, ''))
        date = post.date
        post.data['permalink'] = format('/%s/%04d/%02d/%02d/%s.html', category, date.year, date.month, date.day, slug)
        post.instance_variable_set(:@url, nil)
      end
    end
  end
end

# Docs: titles, descriptions and dates as seen by jekyll-seo-tag and the head includes.
Jekyll::Hooks.register :docs, :pre_render do |doc, payload|
  next unless doc.collection.label == 'docs'

  # A Drop refuses to override front-matter keys, so render this page from a plain copy of it.
  drop = payload['page']
  page = {}
  drop.keys.each { |key| page[key] = drop[key] }
  payload['page'] = page
  explicit_title = doc.data['title']
  # Jekyll fills a missing title with the capitalised file name ("Addactionrow"); that is not a real title.
  generated = Jekyll::Utils.titleize_slug(doc.basename_without_ext)
  explicit_title = nil if explicit_title == generated

  name = Vitrine::Seo.function_name(explicit_title, doc.content)
  page['display_title'] = explicit_title || name
  page['seo_name'] = name
  if name
    page['title'] = "#{name} — BDScript function"
  elsif explicit_title.nil?
    heading = Vitrine::Seo.heading_title(doc.content)
    page['title'] = heading if heading && !heading.empty?
  end

  description = doc.data['description'].to_s.strip
  description = '' if description.length < 2
  description = Vitrine::Seo.lead_paragraph(doc.content).to_s if description.empty?
  page['description'] = Vitrine::Seo.truncate(description) unless description.empty?

  # Documentation has no publication date; the file date would be the build date, which is misleading.
  page['date'] = nil
  page['last_modified_at'] = nil
end
