# frozen_string_literal: true

require 'liquid'
require_relative '../_plugins/store_links'

# Run with: bundle exec ruby tests/store_links_test.rb
def check(expected, actual)
  raise "Expected #{expected.inspect}, got #{actual.inspect}" unless expected == actual
end

L = Vitrine::StoreLinks
play = 'https://play.google.com/store/apps/details?id=fr.botcreator.app'
check "#{play}&referrer=utm_source%3Dvitrine%26utm_medium%3Ddownload%26utm_campaign%3Dvitrine%26utm_content%3Dhero",
      L.build(play, 'android_play', 'download', 'hero')

ios = 'https://apps.apple.com/us/app/bot-creator-for-discord/id6760181193'
check "#{ios}?ct=vitrine_download_hero", L.build(ios, 'ios_appstore', 'download', 'hero')
long = L.build(ios, 'ios_appstore', 'a' * 32, 'b' * 32)
check true, long.split('ct=').last.length <= 40

steam = 'https://store.steampowered.com/app/4597050/Bot_Creator_For_Discord/'
check "#{steam}?utm_source=vitrine&utm_medium=download&utm_campaign=vitrine&utm_content=footer",
      L.build(steam, 'steam', 'download', 'footer')

# Free text never reaches a link.
check 'my-page', L.token('My Page!')
check 'page', L.token('', 'page')
check true, L.token("x&utm_source=evil#{'z' * 80}").match?(/\A[a-z0-9_-]{1,32}\z/)
check true, L.build(play, 'android_play', 'a b&c', 'd=e').match?(/medium%3Da-b-c%26/)
check 'https://example.org/', L.build('https://example.org/', 'unknown', 'x', 'y')

# The Liquid filter is registered.
out = Liquid::Template.parse("{{ u | store_url: 'steam', 'faq', 'docs' }}").render('u' => steam)
check "#{steam}?utm_source=vitrine&utm_medium=faq&utm_campaign=vitrine&utm_content=docs", out
puts 'store_links: ok'
