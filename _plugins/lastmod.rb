# frozen_string_literal: true

# Sets `last_modified_at` (read by jekyll-sitemap for <lastmod>) from _data/lastmod.json, which
# scripts/generate-lastmod.js builds from the git history. Without this, the sitemap would announce the
# build date for every page, which tells search engines nothing. A file with no entry gets no <lastmod>
# override (an explicit `last_modified_at` in its front matter always wins).

require 'json'

module Vitrine
  module Lastmod
    def self.table(site)
      @table ||= begin
        path = File.join(site.source, '_data', 'lastmod.json')
        File.exist?(path) ? JSON.parse(File.read(path)) : {}
      end
    end

    def self.reset!
      @table = nil
    end
  end
end

Jekyll::Hooks.register :site, :after_reset do |_site|
  Vitrine::Lastmod.reset!
end

Jekyll::Hooks.register %i[pages documents], :post_init do |item|
  next if item.data['last_modified_at']

  rel = item.respond_to?(:relative_path) ? item.relative_path : item.path
  date = Vitrine::Lastmod.table(item.site)[rel.to_s.sub(%r{\A/}, '')]
  item.data['last_modified_at'] = Time.parse(date) if date
end
