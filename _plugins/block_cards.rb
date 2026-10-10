# frozen_string_literal: true

require "cgi"
require "json"

# Renders Blocks the way the Bot Creator app draws them, from the registry the
# app itself exports (`_data/blocks_registry.json`, see
# scripts/extract-blocks-registry.mjs). Nothing here knows a block name, a field
# or a colour: an unknown block or field fails the build instead of rendering
# an invented one.
#
#   {% app_block type="sendMessage" %}                    full spec card (all fields, defaults)
#   {% app_block example="ping_reply" %}                  card filled with _data/blocks_examples.json
#   {% app_entry kind="slash" name="ping" %}              "Command Trigger" block
#   {% app_entry event="guildMemberAdd" %}                "Event trigger" block
module Vitrine
  module BlockCards
    # Parameter types the app edits in a dedicated sub-editor (no plain text field).
    EDITOR_TYPES = %w[
      embeds normalComponents componentV2 modalDefinition bdfdScript
      permissionFlags list map elseIfBranches
    ].freeze
    TEXT_TYPES = %w[
      string number duration url color userId channelId messageId roleId emoji
    ].freeze

    module_function

    def esc(value)
      CGI.escapeHTML(value.to_s)
    end

    def registry(site)
      site.data["blocks_registry"] || raise("_data/blocks_registry.json is missing")
    end

    def examples(site)
      site.data["blocks_examples"] || {}
    end

    def block_for(site, type)
      registry(site)["blocks"].find { |b| b["type"] == type } ||
        raise("Blocks docs: unknown block type #{type.inspect} (not in the app registry)")
    end

    def icon(site, name, css = "")
      base = site.config["baseurl"].to_s
      %(<svg class="#{css}" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><use href="#{base}/assets/icons/app-blocks.svg##{esc(name)}"></use></svg>)
    end

    # Escapes a value and highlights ((placeholders)) like the app's variable fields.
    def value_html(value)
      esc(value).gsub(/\(\(.*?\)\)/) { |m| %(<span class="var-tag">#{m}</span>) }
    end

    def slug(category)
      category.downcase.gsub(/[^a-z0-9]+/, "-").gsub(/^-|-$/, "")
    end

    def scalar(value)
      case value
      when true then "true"
      when false then "false"
      when nil then ""
      else value.to_s
      end
    end

    def blank?(value)
      value.nil? || value == "" || value == [] || value == {}
    end

    # ── fields ──────────────────────────────────────────────────────────

    def field_html(site, field, value, spec:, block_fields: [])
      label = esc(field["label"])
      req = field["required"] ? %(<span class="req" title="required">*</span>) : ""
      hint = field["hint"]
      type = field["type"]
      has_value = !value.nil?
      shown = has_value ? value : field["default"]

      case type
      when "boolean"
        on = shown == true || shown.to_s == "true"
        row = %(<div class="scratch-block-toggle-row"><span>#{label}</span><span class="sim-switch#{on ? " active" : ""}"></span></div>)
        spec && hint ? %(<div class="scratch-block-field">#{row}<span class="scratch-block-hint">#{esc(hint)}</span></div>) : row
      when "multiSelect"
        current = scalar(shown)
        input = %(<div class="scratch-block-input"><span>#{esc(current)}</span>#{icon(site, "expand_more")}</div>)
        extra = +""
        extra << %(<span class="scratch-block-hint">#{esc(hint)}</span>) if spec && hint
        if spec && field["options"]
          extra << %(<span class="scratch-block-options">#{field["options"].map { |o| "<code>#{esc(o)}</code>" }.join}</span>)
        end
        %(<div class="scratch-block-field"><span class="scratch-block-label"><span>#{label}#{req}</span></span>#{input}#{extra}#{when_note(field, block_fields)}</div>)
      when "nestedActions"
        nested_html(site, field, value, spec: spec)
      when "embeds"
        embeds_html(site, field, value, spec: spec)
      when *EDITOR_TYPES
        editor_html(site, field, value, spec: spec)
      else
        text = has_value ? scalar(value) : scalar(field["default"])
        # An empty value shows the app's hint as the placeholder; a non-empty default is shown as the value.
        body = if text.empty?
                 %(<div class="scratch-block-input is-placeholder"><span>#{esc(hint)}</span></div>)
               else
                 %(<div class="scratch-block-input"><span>#{value_html(text)}</span></div>)
               end
        range = []
        range << "min #{field["min"]}" if field["min"]
        range << "max #{field["max"]}" if field["max"]
        note = range.empty? ? "" : %(<span class="scratch-block-hint">#{esc(range.join(", "))}</span>)
        %(<div class="scratch-block-field"><span class="scratch-block-label"><span>#{label}#{req}</span></span>#{body}#{note}#{when_note(field, block_fields)}</div>)
      end
    end

    def when_note(field, block_fields = [])
      cond = field["visibleWhen"]
      return "" unless cond

      labels = block_fields.to_h { |f| [f["key"], f["label"]] }
      text = cond.map { |k, v| "#{labels[k] || k} = #{Array(v).join(" / ")}" }.join(", ")
      %(<span class="scratch-block-hint">Shown when #{esc(text)}</span>)
    end

    # One line per row / component of the app's component editor (ComponentNode.toJson shape).
    def components_summary(value)
      Array(value["items"]).flat_map do |row|
        kids = Array(row["components"]).map do |c|
          parts = [c["type"] == "button" ? "Button" : c["type"].to_s, c["label"], c["style"], c["customId"]].compact.reject { |x| x.to_s.empty? }
          "• #{parts.map { |x| esc(x) }.join(" · ")}"
        end
        ["#{esc(row["type"] == "actionRow" ? "Action row" : row["type"])}"] + kids
      end.join("<br>")
    end

    def editor_html(site, field, value, spec:)
      label = esc(field["label"])
      inner =
        if value.nil? || value == [] || value == {}
          esc(field["hint"] || field["label"])
        elsif field["type"] == "normalComponents" && value.is_a?(Hash) && value["items"]
          components_summary(value)
        elsif value.is_a?(Hash)
          value.map { |k, v| "#{esc(k)}: #{value_html(scalar(v))}" }.join("<br>")
        elsif value.is_a?(Array)
          value.map { |v| value_html(v.is_a?(Hash) ? v.map { |k, x| "#{k}: #{x}" }.join(", ") : scalar(v)) }.join("<br>")
        elsif field["type"] == "bdfdScript"
          %(<code>#{value_html(value)}</code>)
        else
          value_html(scalar(value))
        end
      %(<div class="scratch-block-field"><span class="scratch-block-label"><span>#{label}</span>#{icon(site, "edit")}</span><div class="scratch-block-input is-editor">#{inner}</div></div>)
    end

    def nested_html(site, field, value, spec:)
      title = esc(field["hint"] || field["label"])
      head = %(<span class="scratch-block-label"><span>#{title}</span>#{icon(site, "edit")}</span>)
      list = value.is_a?(Array) ? value : []
      if list.empty?
        count = spec ? "" : "0 actions"
        return %(<div class="scratch-block-field">#{head}<div class="scratch-block-input is-editor">#{count.empty? ? "Sequence of blocks (opens the nested block editor)" : count}</div></div>)
      end

      cards = list.map do |item|
        card(site, block_for(site, item["type"]), values: item["values"], key: item["key"], open: true, nested: true)
      end
      %(<div class="scratch-block-field">#{head}<div class="block-flow-canvas" style="padding:10px;margin:0;gap:8px">#{cards.join}</div></div>)
    end

    def embeds_html(site, field, value, spec:)
      labels = registry(site)["embedLabels"]
      head = %(<span class="scratch-block-label"><span>#{esc(field["label"])}</span>#{icon(site, "edit")}</span>)
      list = value.is_a?(Array) ? value : []
      if list.empty?
        return %(<div class="scratch-block-field">#{head}<div class="scratch-block-input is-editor">#{esc(field["hint"] || "Embed editor")}</div></div>)
      end

      panels = list.map do |embed|
        rows = []
        { "title" => "embed_label_title", "description" => "common_description", "url" => "embed_label_url",
          "color" => "embed_label_color", "footer" => "embed_label_footer_text", "timestamp" => "embed_label_timestamp" }.each do |key, l10n|
          next if blank?(embed[key])

          rows << %(<div class="scratch-block-field"><span class="scratch-block-label"><span>#{esc(labels[l10n])}</span></span><div class="scratch-block-input"><span>#{value_html(embed[key])}</span></div></div>)
        end
        Array(embed["fields"]).each do |f|
          rows << %(<div class="scratch-block-field"><span class="scratch-block-label"><span>#{esc(labels["common_name"])} / #{esc(labels["common_value"])}</span></span><div class="scratch-block-input"><span><b>#{value_html(f["name"])}</b> · #{value_html(f["value"])}</span></div></div>)
        end
        unknown = embed.keys - %w[title description url color footer timestamp fields]
        raise "Blocks docs: embed key(s) #{unknown.join(", ")} are not shown by the app's embed editor" unless unknown.empty?

        %(<div class="scratch-block-input is-editor" style="flex-direction:column;align-items:stretch;gap:8px">#{rows.join}</div>)
      end
      %(<div class="scratch-block-field">#{head}#{panels.join}</div>)
    end

    # ── cards ───────────────────────────────────────────────────────────

    def card(site, block, values: nil, key: nil, open: false, nested: false)
      reg = registry(site)
      fam = reg["families"][block["family"]]
      spec = values.nil?
      fields = block["fields"]

      if values
        known = fields.map { |f| f["key"] }
        unknown = values.keys - known
        raise "Blocks docs: #{block["type"]} has no field #{unknown.join(", ")} in the app (fields: #{known.join(", ")})" unless unknown.empty?
      end

      shown = spec ? fields : fields.select { |f| values.key?(f["key"]) }
      body = shown.map { |f| field_html(site, f, values && values[f["key"]], spec: spec, block_fields: fields) }
      hidden = fields.size - shown.size
      body << %(<span class="scratch-block-more">#{hidden} other field#{hidden == 1 ? " keeps its" : "s keep their"} default value.</span>) if values && hidden.positive?
      body << %(<span class="scratch-block-more">This block has no field.</span>) if shown.empty? && !values

      if key
        key_label = reg["common"]["fields"].find { |f| f["key"] == "key" }["label"]
        body << %(<div class="scratch-block-field"><span class="scratch-block-label"><span>#{esc(key_label)}</span></span><div class="scratch-block-input"><span>#{value_html(key)}</span></div></div>)
      end
      summary = %(<span class="scratch-block-summary">#{esc(block["type"])}</span>)
      native = values ? %( data-native-action="#{esc({ "type" => block["type"], "key" => key, "enabled" => true, "payload" => values_payload(values) }.compact.to_json)}") : ""

      <<~HTML.gsub(/^\s+/, "")
        <details class="scratch-block-card block-cat-#{slug(block["category"])}" style="--fam:#{fam["color"]}"#{open ? " open" : ""}#{native}>
        <summary class="scratch-block-header">
        <span class="scratch-block-tile">#{icon(site, block["icon"])}</span>
        <span class="scratch-block-heading"><span class="scratch-block-overline">#{esc(block["category"])}</span><span class="scratch-block-title">#{esc(block["name"])}</span>#{summary}</span>
        #{icon(site, "expand_more", "scratch-block-chevron")}
        </summary>
        <div class="scratch-block-body">#{body.join}</div>
        </details>
      HTML
    end

    # Payload shape the engine stores (nested block lists keep their own envelope).
    def values_payload(values)
      values.transform_values do |v|
        if v.is_a?(Array) && v.all? { |i| i.is_a?(Hash) && i["type"] }
          v.map { |i| { "type" => i["type"], "key" => i["key"], "payload" => values_payload(i["values"] || {}) }.compact }
        else
          v
        end
      end
    end

    def default_payload(block)
      block["fields"].to_h { |f| [f["key"], f["default"]] }
    end

    # ── entry point ─────────────────────────────────────────────────────

    def entry(site, kind: nil, name: nil, event: nil, custom_id: nil, mode: 0)
      reg = registry(site)
      ep = reg["entryPoint"]
      if event
        raise "Blocks docs: the Custom ID filter only exists for interactionCreate (app: entry_point_block.dart)" if custom_id && event != "interactionCreate"

        ev = reg["events"].find { |e| e["event"] == event } || raise("Blocks docs: unknown event #{event.inspect} (not in the app's event catalog)")
        ed = ep["event"]
        fields = [
          [ed["categoryLabel"], ev["category"]],
          [ed["nameLabel"], "#{ev["label"]}"],
        ]
        fields << [ed["customIdLabel"], custom_id] if custom_id
        body = fields.map { |l, v| %(<div class="scratch-block-field"><span class="scratch-block-label"><span>#{esc(l)}</span></span><div class="scratch-block-input"><span>#{value_html(v)}</span>#{icon(site, "expand_more")}</div></div>) }.join
        return <<~HTML.gsub(/^\s+/, "")
          <details class="scratch-block-card block-cat-entrypoint" open style="--fam:#{ed["color"]}" data-native-trigger="#{esc({ "type" => "event", "event" => event, "customId" => custom_id }.compact.to_json)}">
          <summary class="scratch-block-header">
          <span class="scratch-block-tile">#{icon(site, ed["icon"])}</span>
          <span class="scratch-block-heading"><span class="scratch-block-overline">#{esc(reg["families"]["events"]["label"])}</span><span class="scratch-block-title">#{esc(ed["title"])}</span><span class="scratch-block-summary">#{esc(event)}</span></span>
          <span class="scratch-block-badge">#{esc(ev["category"])}</span>
          #{icon(site, "expand_more", "scratch-block-chevron")}
          </summary>
          <div class="scratch-block-body">#{body}</div>
          </details>
        HTML
      end

      seg = ep["segments"].find { |s| s["kind"] == kind } || raise("Blocks docs: unknown command kind #{kind.inspect}")
      fam = reg["families"][ep["family"]]
      trigger = name ? "#{seg["prefix"]}#{name}" : ""
      segs = ep["segments"].map { |s| %(<span#{s["kind"] == kind ? ' class="on"' : ""}>#{esc(s["label"])}</span>) }.join
      modes = ep["executionModes"].each_with_index.map { |m, i| %(<span#{i == mode ? ' class="on"' : ""}>#{esc(m)}</span>) }.join
      body = %(<div class="scratch-block-field"><span class="scratch-block-label"><span>#{esc(ep["question"])}</span></span><div class="scratch-block-seg">#{segs}</div><span class="scratch-block-hint">#{esc(seg["desc"])}</span></div>) +
             %(<div class="scratch-block-field"><span class="scratch-block-label"><span>#{esc(ep["executionModeLabel"])}</span></span><div class="scratch-block-seg">#{modes}</div></div>)
      <<~HTML.gsub(/^\s+/, "")
        <details class="scratch-block-card block-cat-entrypoint" open style="--fam:#{fam["color"]}" data-native-trigger="#{esc({ "type" => kind == "prefix" ? "prefix" : kind, "name" => name }.compact.to_json)}">
        <summary class="scratch-block-header">
        <span class="scratch-block-tile">#{icon(site, ep["icon"])}</span>
        <span class="scratch-block-heading"><span class="scratch-block-overline">#{esc(fam["label"])}</span><span class="scratch-block-title">#{esc(ep["name"])}</span>#{trigger.empty? ? "" : %(<span class="scratch-block-summary">#{esc(trigger)}</span>)}</span>
        <span class="scratch-block-badge">#{esc(seg["badge"])}</span>
        #{icon(site, "expand_more", "scratch-block-chevron")}
        </summary>
        <div class="scratch-block-body">#{body}</div>
        </details>
      HTML
    end

    # ── tags ────────────────────────────────────────────────────────────

    class Tag < Liquid::Tag
      def initialize(tag_name, markup, tokens)
        super
        @attrs = markup.scan(/(\w+)="([^"]*)"/).to_h
      end

      def attrs
        @attrs
      end
    end

    class AppBlock < Tag
      def render(context)
        site = context.registers[:site]
        if attrs["example"]
          ex = Vitrine::BlockCards.examples(site)[attrs["example"]] || raise("Blocks docs: unknown example #{attrs["example"].inspect} in _data/blocks_examples.json")
          block = Vitrine::BlockCards.block_for(site, ex["type"])
          Vitrine::BlockCards.card(site, block, values: ex["values"] || {}, key: ex["key"], open: attrs["open"] != "false")
        else
          block = Vitrine::BlockCards.block_for(site, attrs["type"])
          Vitrine::BlockCards.card(site, block, open: attrs["open"] == "true")
        end
      end
    end

    class AppEntry < Tag
      def render(context)
        site = context.registers[:site]
        Vitrine::BlockCards.entry(site, kind: attrs["kind"], name: attrs["name"], event: attrs["event"], custom_id: attrs["custom_id"], mode: attrs["mode"].to_i)
      end
    end

    # `{{ "sendMessage" | block_default_json }}` → pretty JSON of the default payload.
    module Filters
      def block_default_json(type)
        site = @context.registers[:site]
        block = Vitrine::BlockCards.block_for(site, type)
        JSON.pretty_generate({ "type" => type, "payload" => Vitrine::BlockCards.default_payload(block) })
      end

      def app_block_html(type)
        site = @context.registers[:site]
        Vitrine::BlockCards.card(site, Vitrine::BlockCards.block_for(site, type))
      end

      def block_family_categories(family)
        site = @context.registers[:site]
        Vitrine::BlockCards.registry(site)["blocks"].select { |b| b["family"] == family }.map { |b| b["category"] }.uniq.join(", ")
      end

      def block_final_names(_ignored = nil)
        site = @context.registers[:site]
        Vitrine::BlockCards.registry(site)["blocks"].select { |b| b["terminal"] }.map { |b| "*#{b["name"]}*" }.join(", ")
      end

      def block_slug(category)
        Vitrine::BlockCards.slug(category)
      end
    end
  end
end

Liquid::Template.register_tag("app_block", Vitrine::BlockCards::AppBlock)
Liquid::Template.register_tag("app_entry", Vitrine::BlockCards::AppEntry)
Liquid::Template.register_filter(Vitrine::BlockCards::Filters)
