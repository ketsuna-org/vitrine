# frozen_string_literal: true

require "jekyll"
require "tmpdir"
require "json"
require_relative "../_plugins/generate_indexes"
require_relative "../_plugins/block_cards"

# Just what the block tags read from a Jekyll site: data files and the config.
FakeSite = Struct.new(:data, :config)

class NativeDocumentationTest
  def assert(value)
    raise "Assertion failed" unless value
  end

  def assert_equal(expected, actual)
    raise "Expected #{expected.inspect}, got #{actual.inspect}" unless expected == actual
  end

  def assert_includes(content, value)
    assert content.include?(value)
  end

  def refute_includes(content, value)
    assert !content.include?(value)
  end

  def refute_match(pattern, content)
    assert !pattern.match?(content)
  end
  def setup
    @generator = Vitrine::IndexGenerator::Generator.new
  end

  def markdown(source)
    html = Kramdown::Document.new(source, input: "GFM").to_html
    @generator.send(:native_markdown, Nokogiri::HTML.fragment(html))
  end

  def test_html_is_readable_without_executable_or_decorative_elements
    content = markdown('<div><strong>Value</strong><svg><use href="icon.svg"></use></svg><script>alert(1)</script><a href="/docs/getvar/">Read</a><img src="/assets/icon.webp" alt="Example"></div>')
    assert_includes content, "**Value**"
    assert_includes content, "[Read](/docs/getvar/)"
    assert_includes content, "![Example](/assets/icon.webp)"
    refute_match(/svg|script|alert|<div/, content)
  end

  def test_code_and_tables_survive_export
    source = "# Example\n\n```text\n$setVar[key;1]\n```\n\n| Key | Value |\n| --- | --- |\n| xp | 5 |\n"
    content = markdown(source)
    assert_includes content, "# Example"
    assert_includes content, "$setVar[key;1]"
    assert_includes content, "| Key | Value |"
    assert_includes content, "| xp | 5 |"
  end

  def test_original_heading_anchors_survive_export
    content = markdown('<h2 id="custom-target">A different title</h2><a href="#custom-target">Jump</a>')
    assert_includes content, '## A different title {#custom-target}'
    assert_includes content, '[Jump](#custom-target)'
  end

  # Resolves the {% app_block %} / {% app_entry %} tags like the real build does.
  def render_blocks(source)
    root = File.expand_path("..", __dir__)
    data = %w[blocks_registry blocks_examples].to_h { |n| [n, JSON.parse(File.read("#{root}/_data/#{n}.json", encoding: "UTF-8"))] }
    site = FakeSite.new(data, { "baseurl" => "" })
    source = source.gsub(/\{% include block_connector\.html %\}/, "")
    Liquid::Template.parse(source).render({}, registers: { site: site })
  end

  def test_real_examples_export_structured_previews_and_switchable_panels
    %w[blocks tickets].each do |name|
      source = File.read(File.expand_path("../_docs/#{name}.md", __dir__), encoding: "UTF-8").sub(/\A---.*?---\s*/m, '')
      content = markdown(render_blocks(source))
      previews = content.scan(/(`{3,})bc-([\w-]+)\n(.*?)\n\1/m).map { |_, kind, json| [kind, JSON.parse(json)] }
      dual = previews.select { |kind, _| kind == 'dual-view' }.map(&:last)
      discord = previews.select { |kind, _| kind == 'discord-preview' }.map(&:last)
      flows = previews.select { |kind, _| kind == 'block-flow' }.map(&:last)
      # The Blocks pages show the app's real blocks (no BDFD tab): every page must export block flows.
      assert !flows.empty?
      assert !discord.empty?
      flows.each do |flow|
        assert !flow['blocks'].empty?
        flow['blocks'].each do |block|
          assert block['action'] || block['trigger']
          assert block['action']['type'].is_a?(String) if block['action']
          assert block['action']['payload'].is_a?(Hash) if block['action']
        end
      end
      dual.each do |view|
        assert_equal 1, view['version']
        assert_equal 2, view['panels'].length
        assert_includes view['panels'][0]['markdown'], 'bc-block-flow'
        assert_includes view['panels'][1]['markdown'], '```bdfd'
        flow_json = view['panels'][0]['markdown'][/(`{3,})bc-block-flow\n(.*?)\n\1/m, 2]
        blocks = JSON.parse(flow_json)['blocks']
        assert !blocks.empty?
        blocks.each do |block|
          assert block['action'] || block['trigger']
          if block['action']
            assert block['action']['type'].is_a?(String)
            assert block['action']['payload'].is_a?(Hash)
          end
        end
      end
      assert_equal 'Bot Creator Assistant', discord.first['messages'].first['username']
      assert discord.any? { |frame| frame['messages'].any? { |message| !message['embeds'].empty? } }
      if name == 'tickets'
        assert discord.any? { |frame| frame['messages'].any? { |message| message['buttons'].any? { |button| button['label'] == 'Close Ticket' } } }
      end
      refute_includes content, '<div'
      refute_includes content, 'onclick'
    end
  end

  def test_nested_pages_have_unique_identity_and_liquid_is_resolved
    Dir.mktmpdir do |source|
      FileUtils.mkdir_p("#{source}/_docs/sub")
      FileUtils.mkdir_p("#{source}/_posts")
      File.write("#{source}/_docs/demo.md", "---\ntitle: Demo\n---\n# Demo\n[Home]({{ '/docs/' | relative_url }})")
      File.write("#{source}/_docs/sub/demo.md", "---\ntitle: Nested\n---\n# Nested")
      File.write("#{source}/_posts/2026-01-01-guide.md", "---\ntitle: Guide\nlocale: en\n---\n# Guide\n\nHello")
      site = Jekyll::Site.new(Jekyll.configuration("source" => source, "destination" => "#{source}/_site",
        "plugins" => [], "collections" => {"docs" => {"output" => true, "permalink" => "/docs/:path/"}}))
      site.read
      @generator.generate(site)
      site.static_files.each { |file| file.write(site.dest) }
      entries = JSON.parse(File.read("#{site.dest}/api/native-docs-index.json"))
      assert_equal ["demo", "sub/demo"], entries.map { |entry| entry["id"] }.sort
      assert_equal "https://bot-creator.fr/api/native/docs/sub/demo.md", entries.find { |entry| entry["id"] == "sub/demo" }["markdown_url"]
      body = File.read("#{site.dest}/api/native/docs/demo.md")
      assert_includes body, "[Home](/docs/)"
      refute_includes body, "{{"
      assert_equal Digest::SHA256.hexdigest(body), entries.find { |entry| entry["id"] == "demo" }["revision"]
      guides = JSON.parse(File.read("#{site.dest}/api/native-guides-index.json"))
      assert_equal "Guide", guides.first["name"]
      assert File.exist?("#{site.dest}/api/native/guides/2026-01-01-guide.md")
    end
  end
end

tests = NativeDocumentationTest.public_instance_methods(false).grep(/^test_/)
tests.each do |name|
  test = NativeDocumentationTest.new
  test.setup
  test.public_send(name)
  puts "PASS #{name}"
end
puts "#{tests.length} native documentation tests passed"
