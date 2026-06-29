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
        add_static_file(site, "api", "docs-index.json", docs_index(site).to_json)
        add_static_file(site, "api", "posts-index.json", posts_index(site).to_json)
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
    end
  end
end
