# frozen_string_literal: true

require "nokogiri"
require "digest"

# Generates JSON indexes consumed by the MCP server at /api/mcp.
# Outputs:
#   /api/docs-index.json   -> [{ slug, name, category, url }, ...]
#   /api/posts-index.json  -> [{ slug, title, description, date, category,
#                                locale, author, url }, ...]
#
# These indexes are static (generated at Jekyll build time) so the MCP
# Function has nothing to query at runtime except two small JSON files.
#
# Files are registered as Jekyll::StaticFile entries so the build's cleanup
# phase does not remove them from _site/. Writing directly to _site/ via
# File.write is clobbered by keep_files hygiene.

module Vitrine
  module IndexGenerator
    SITE_URL = "https://bot-creator.fr".freeze

    # StaticFile subclass that serves in-memory content rather than a file on
    # disk. Skips front-matter rendering and writes raw bytes.
    class InMemoryStaticFile < ::Jekyll::StaticFile
      def initialize(site, dir, name, content)
        super(site, site.source, dir, name)
        @generated_content = content
      end

      def write(dest)
        dest_path = destination(dest)
        ::FileUtils.mkdir_p(::File.dirname(dest_path))
        ::File.binwrite(dest_path, @generated_content)
        true
      end

      # The on-disk source file does not exist, so override the default
      # `modified?` to always emit during write.
      def modified?
        true
      end
    end

    class Generator < ::Jekyll::Generator
      safe true
      priority :low

      def generate(site)
        docs = site.collections.fetch("docs", nil)&.docs || []
        top_level_names = docs.reject { |doc| doc.relative_path.sub(%r{^/?_docs/}, "").include?("/") }.map(&:basename_without_ext)
        docs.each do |doc|
          markdown_path = doc.relative_path.sub(%r{^/?_docs/}, "")
          directory = File.dirname(markdown_path)
          if directory == "."
            add_static_file(site, "api/docs", "#{doc.basename_without_ext}.md", doc.content)
          else
            # Preserve unambiguous existing aliases; nested paths identify the exact page.
            add_static_file(site, "api/docs/#{directory}", File.basename(markdown_path), doc.content)
            unless top_level_names.include?(doc.basename_without_ext)
              add_static_file(site, "api/docs", "#{doc.basename_without_ext}.md", doc.content)
            end
          end
        end
        add_static_file(site, "api", "docs-index.json", docs_index(site).to_json)
        add_static_file(site, "api", "posts-index.json", posts_index(site).to_json)
        generate_native_library(site, docs, "docs")
        generate_native_library(site, site.posts.docs, "guides")
        add_static_file(site, ".", "llms.txt", llms_summary(site))
        add_static_file(site, ".", "llms-full.txt", llms_full(site))
      end

      private

      def generate_native_library(site, documents, library)
        index = documents.map do |doc|
          id = if library == "docs"
                 doc.relative_path.sub(%r{^/?_docs/}, "").sub(/\.md\z/, "")
               else
                 doc.basename_without_ext
               end
          # Resolve site/page Liquid before exporting, without the site's layout.
          payload = site.site_payload.merge("page" => doc.to_liquid)
          rendered = site.liquid_renderer.file(doc.relative_path).parse(doc.content)
                         .render!(payload, registers: { site: site, page: doc.to_liquid })
          html = Kramdown::Document.new(rendered, input: "GFM").to_html
          markdown = native_markdown(Nokogiri::HTML.fragment(html)).strip + "\n"
          directory = File.dirname(id)
          target = directory == "." ? "api/native/#{library}" : "api/native/#{library}/#{directory}"
          add_static_file(site, target, "#{File.basename(id)}.md", markdown)
          {
            "id" => id,
            "name" => doc.data["title"] || function_name_from_slug(doc.basename_without_ext),
            "description" => doc.data["description"],
            "category" => doc.data["category"],
            "api_type" => doc.data["api_type"] || (library == "docs" ? "bdfd" : "general"),
            "status" => doc.data["status"] || "documented",
            "locale" => doc.data["locale"] || "en",
            "translation_key" => doc.data["translation_key"],
            "url" => "#{SITE_URL}#{doc.url}",
            "markdown_url" => "#{SITE_URL}/api/native/#{library}/#{id}.md",
            "revision" => Digest::SHA256.hexdigest(markdown),
          }
        end
        index.sort_by! { |entry| entry.fetch("name").downcase } if library == "docs"
        index.reverse! if library == "guides"
        add_static_file(site, "api", "native-#{library}-index.json", index.to_json)
      end

      # Convert presentation HTML to portable Markdown; no CSS or executable HTML
      # reaches the native reader. Code fences are sized to preserve literal code.
      def native_markdown(node)
        return node.text.gsub(/([\\`*\[\]])/, '\\\\\1') if node.text?
        classes = node['class'].to_s.split if node.element?
        if classes&.include?('dual-view-tabs')
          labels = node.css('.dual-tab-btn').map { |button| button.text.strip }
          panels = node.css('.dual-tab-panel').each_with_index.map do |panel, index|
            { 'label' => labels[index].to_s, 'markdown' => native_markdown(panel).strip }
          end
          return native_preview('bc-dual-view', { 'panels' => panels })
        elsif classes&.include?('block-flow-canvas') || classes&.include?('scratch-block-card')
          cards = classes.include?('scratch-block-card') ? [node] : node.css('.scratch-block-card')
          blocks = cards.map do |block|
            body = block.at_css('.scratch-block-body')&.dup
            body&.css('.scratch-block-field, .scratch-block-toggle-row')&.remove
            {
              'title' => block.at_css('.scratch-block-title')&.text.to_s.strip,
              'badge' => block.at_css('.scratch-block-badge')&.text.to_s.strip,
              'category' => block['class'].to_s[/\bblock-cat-([\w-]+)/, 1].to_s,
              'description' => body ? native_markdown(body).strip : '',
              'fields' => block.css('.scratch-block-field').map { |field| {
                'label' => field.at_css('.scratch-block-label')&.text.to_s.strip,
                'value' => native_markdown(field.at_css('.scratch-block-input') || field).strip
              } },
              'toggles' => block.css('.scratch-block-toggle-row').map { |toggle| {
                'label' => toggle.text.strip,
                'enabled' => toggle.at_css('.sim-switch')&.[]('class').to_s.split.include?('active')
              } }
            }
          end
          return native_preview('bc-block-flow', { 'blocks' => blocks })
        elsif classes&.include?('discord-simulator-frame')
          messages = node.css('.discord-msg-row').map do |row|
            content = row.at_css('.discord-msg-content')&.dup
            content&.css('.discord-header, .discord-embed, .discord-components-row, .discord-ephemeral-notice')&.remove
            {
              'avatar' => row.at_css('.discord-avatar')&.text.to_s.strip,
              'username' => row.at_css('.discord-username')&.text.to_s.strip,
              'timestamp' => row.at_css('.discord-timestamp')&.text.to_s.strip,
              'botTag' => row.at_css('.discord-bot-tag')&.text.to_s.strip,
              'content' => content ? native_markdown(content).strip : '',
              'embeds' => row.css('.discord-embed').map { |embed| {
                'color' => embed['style'].to_s[/--embed-color:\s*(#[a-fA-F0-9]{6})/, 1],
                'title' => embed.at_css('.discord-embed-title')&.text.to_s.strip,
                'description' => embed.at_css('.discord-embed-desc').then { |desc| desc ? native_markdown(desc).strip : '' },
                'footer' => embed.at_css('.discord-embed-footer')&.text.to_s.strip
              } },
              'buttons' => row.css('.discord-btn').map { |button| {
                'label' => button.text.strip,
                'style' => button['class'].to_s[/\bdiscord-btn-(\w+)/, 1].to_s
              } },
              'ephemeral' => row.at_css('.discord-ephemeral-notice')&.text.to_s.strip
            }
          end
          return native_preview('bc-discord-preview', { 'messages' => messages })
        end
        children = -> { node.children.map { |child| native_markdown(child) }.join }
        case node.name
        when "script", "style", "svg", "iframe" then ""
        when "pre"
          code = node.at_css("code") || node
          fence = "`" * [3, (code.text.scan(/`+/).map(&:length).max || 0) + 1].max
          language = code["class"].to_s[/\blanguage-([\w+-]+)/, 1].to_s
          "\n\n#{fence}#{language}\n#{code.text.rstrip}\n#{fence}\n\n"
        when "code"
          fence = "`" * [(node.text.scan(/`+/).map(&:length).max || 0) + 1, 1].max
          "#{fence} #{node.text} #{fence}"
        when /^h([1-6])$/
          level = Regexp.last_match(1).to_i
          anchor = node['id'].to_s
          suffix = anchor.empty? ? "" : " {##{anchor}}"
          "\n\n#{'#' * level} #{children.call.strip}#{suffix}\n\n"
        when "a" then "[#{children.call}](#{node['href']})"
        when "img" then "![#{node['alt']}](#{node['src']})"
        when "strong", "b" then "**#{children.call}**"
        when "em", "i" then "*#{children.call}*"
        when "br" then "  \n"
        when "hr" then "\n\n---\n\n"
        when "blockquote" then "\n\n" + children.call.strip.lines.map { |line| "> #{line}" }.join + "\n\n"
        when "ul", "ol"
          items = node.element_children.select { |child| child.name == "li" }
          "\n\n" + items.each_with_index.map do |item, i|
            prefix = node.name == "ol" ? "#{i + 1}. " : "- "
            lines = native_markdown(item).strip.lines
            prefix + lines.shift.to_s + lines.map { |line| "  #{line}" }.join + "\n"
          end.join + "\n"
        when "table"
          rows = node.css("tr").map do |row|
            row.element_children.map { |cell| native_markdown(cell).strip.gsub("|", "\\|").gsub(/\s*\n\s*/, " ") }
          end
          return "" if rows.empty?
          "\n\n| #{rows.first.join(' | ')} |\n| #{rows.first.map { '---' }.join(' | ')} |\n" + rows.drop(1).map { |row| "| #{row.join(' | ')} |\n" }.join + "\n"
        when "p", "div", "section", "details", "summary" then "\n\n#{children.call.strip}\n\n"
        else children.call
        end
      end

      def native_preview(kind, data)
        json = JSON.pretty_generate({ 'version' => 1 }.merge(data))
        fence = '`' * [3, (json.scan(/`+/).map(&:length).max || 0) + 1].max
        "\n\n#{fence}#{kind}\n#{json}\n#{fence}\n\n"
      end

      def add_static_file(site, dir, name, content)
        site.static_files << InMemoryStaticFile.new(site, dir, name, content)
        ::Jekyll.logger.info "Vitrine:", "registered #{dir}/#{name}"
      end

      def docs_index(site)
        docs = site.collections.fetch("docs", nil)&.docs || []
        docs.map do |doc|
          slug = doc.basename_without_ext
          {
            "slug"     => slug,
            "name"     => doc.data["title"] || function_name_from_slug(slug),
            "category" => doc.data["category"],
            "api_type" => doc.data["api_type"] || "bdfd",
            "description" => doc.data["description"],
            "status" => doc.data["status"] || "documented",
            "markdown_url" => "#{SITE_URL}/api/docs/#{slug}.md",
            "url"      => "#{SITE_URL}#{doc.url}",
          }
        end.sort_by { |d| d.fetch("slug") }
      end

      def posts_index(site)
        site.posts.docs.map do |post|
          slug = post.data["slug"] || post.basename_without_ext.sub(/\A\d{4}-\d{2}-\d{2}-/, "")
          {
            "slug"        => slug,
            "title"       => post.data["title"],
            "description" => post.data["description"],
            "date"        => post.date&.iso8601,
            "category"    => post.data["category"],
            "locale"      => post.data["locale"],
            "author"      => post.data["author"],
            "url"         => "#{SITE_URL}#{post.url}",
          }
        end.sort_by { |p| p.fetch("date") }.reverse
      end

      # sendmessage -> $sendMessage ; canvas_draw_arc -> $canvasDrawArc
      def function_name_from_slug(slug)
        camel = slug.split("_").map(&:capitalize).join
        "$#{camel}"
      end

      # llms.txt — small summary file with links, per https://llmstxt.org
      def llms_summary(site)
        docs = site.collections.fetch("docs", nil)&.docs || []
        groups = docs.group_by { |d| d.data["category"] || "Uncategorized" }.sort

        body = []
        body << "# Bot Creator"
        body << ""
        body << "> Bot Creator helps you build, run, and monitor Discord bots without code from mobile, desktop, or the Docker runner."
        body << ""
        body << "## Documentation"
        body << ""
        body << "- [All docs](https://bot-creator.fr/docs/): Browse the full function reference"
        body << "- [llms-full.txt](https://bot-creator.fr/llms-full.txt): Complete documentation as a single Markdown file"
        body << "- [Getting started](https://bot-creator.fr/docs/getting-started/): Documentation quick start"
        body << "- [JavaScript API](https://bot-creator.fr/docs/javascript/): BDJS script globals (db.*, interaction, message)"
        body << "- [Blocks Guide](https://bot-creator.fr/docs/blocks/): Visual no-code programming reference"
        body << "- [Blocks Dictionary](https://bot-creator.fr/docs/blocks-dictionary/): Complete catalog of all 112 block actions"
        body << "- [Support Ticket System](https://bot-creator.fr/docs/tickets/): Complete production-ready ticket system"
        body << "- [Execution model](https://bot-creator.fr/docs/execution-model/): Implicit slash replies, variables, interaction lifecycle and limits"
        body << "- [MCP server](https://bot-creator.fr/docs/mcp/): Connect via Model Context Protocol"
        body << ""
        body << "## Function reference by category"
        body << ""
        groups.each do |category, cat_docs|
          body << "### #{category}"
          body << ""
          cat_docs.sort_by { |d| d.basename_without_ext }.each do |doc|
            slug = doc.basename_without_ext
            name = doc.data["title"] || function_name_from_slug(slug)
            body << "- [#{name}](https://bot-creator.fr/docs/#{slug}/)"
          end
          body << ""
        end
        body.join("\n")
      end

      # llms-full.txt — all docs concatenated as one Markdown blob
      def llms_full(site)
        docs = site.collections.fetch("docs", nil)&.docs || []
        groups = docs.group_by { |d| d.data["category"] || "Uncategorized" }.sort

        parts = []
        parts << "# Bot Creator — Full Documentation"
        parts << ""
        parts << "> Bot Creator reference for Blocks, BDFD and JavaScript. Generated from the same docs collection as the MCP index. Read execution-model first and respect each page's compatibility status."
        parts << ""
        parts << "---"
        parts << ""

        groups.each do |category, cat_docs|
          parts << "## #{category}"
          parts << ""
          cat_docs.sort_by { |d| d.basename_without_ext }.each do |doc|
            parts << "### #{doc.data['title'] || function_name_from_slug(doc.basename_without_ext)}"
            parts << ""
            parts << doc.content
            parts << ""
            parts << "---"
            parts << ""
          end
        end
        parts.join("\n")
      end
    end
  end
end
