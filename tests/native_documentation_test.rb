# frozen_string_literal: true

require "jekyll"
require "tmpdir"
require_relative "../_plugins/generate_indexes"

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
