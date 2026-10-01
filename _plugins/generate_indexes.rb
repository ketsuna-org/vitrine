# frozen_string_literal: true

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
        add_static_file(site, ".", "llms.txt", llms_summary(site))
        add_static_file(site, ".", "llms-full.txt", llms_full(site))
      end

      private

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
