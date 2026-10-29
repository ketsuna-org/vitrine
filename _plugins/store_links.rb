# frozen_string_literal: true

# Liquid filter `store_url`: adds the acquisition campaign to a store link (Google Play, App Store, Steam).
# It is called by _includes/store_link.html; use the include rather than the filter in pages.
#
#   {{ site.data.downloads.stores.android_play.url | store_url: 'android_play', 'download', 'hero' }}
#
# - Google Play: `referrer=` carries the UTM parameters, encoded once (the Play Install Referrer API
#   hands this string to the app on first launch).
# - App Store: `ct=` is the campaign token (40 characters at most).
# - Steam: plain `utm_*` parameters.
#
# Every value is normalised to ^[a-z0-9_-]{1,32}$, so a typo cannot put free text in a store link.
# The website never links to the web Studio, including through a campaign link.

module Vitrine
  module StoreLinks
    SOURCE = 'vitrine'
    CAMPAIGN = 'vitrine'
    TOKEN = /\A[a-z0-9_-]{1,32}\z/.freeze
    APP_STORE_CT_MAX = 40

    # Lower case, anything outside [a-z0-9_-] becomes "-", at most 32 characters, never empty.
    def self.token(value, fallback = 'other')
      cleaned = value.to_s.downcase.gsub(/[^a-z0-9_-]+/, '-').gsub(/\A[-_]+|[-_]+\z/, '')[0, 32].to_s.sub(/[-_]+\z/, '')
      cleaned.empty? ? fallback : cleaned
    end

    def self.append(url, params)
      query = params.map { |key, value| "#{key}=#{value}" }.join('&')
      "#{url}#{url.include?('?') ? '&' : '?'}#{query}"
    end

    def self.build(url, store, medium, content, campaign = nil)
      base = url.to_s.strip
      return base if base.empty?

      medium = token(medium, 'page')
      content = token(content, 'page')
      campaign = token(campaign, CAMPAIGN)

      case store.to_s
      when 'android_play'
        referrer = "utm_source%3D#{SOURCE}%26utm_medium%3D#{medium}%26utm_campaign%3D#{campaign}%26utm_content%3D#{content}"
        append(base, 'referrer' => referrer)
      when 'ios_appstore'
        ct = "#{campaign}_#{medium}_#{content}"[0, APP_STORE_CT_MAX].sub(/[-_]+\z/, '')
        append(base, 'ct' => ct)
      when 'steam'
        append(base, 'utm_source' => SOURCE, 'utm_medium' => medium, 'utm_campaign' => campaign, 'utm_content' => content)
      else
        base
      end
    end
  end

  module StoreLinkFilter
    def store_url(url, store, medium = nil, content = nil, campaign = nil)
      Vitrine::StoreLinks.build(url, store, medium, content, campaign)
    end
  end
end

Liquid::Template.register_filter(Vitrine::StoreLinkFilter)
