---
layout: doc
title: Blocks Dictionary — Complete Catalog
category: "Blocks"
api_type: blocks
description: Every block of the Bot Creator app as it appears in the editor, with its real name, category, fields, hints, options and defaults. Generated from the app's own block registry.
permalink: /docs/blocks-dictionary/
---

# Blocks Dictionary — Complete Catalog

This page lists the **{{ site.data.blocks_registry.blocks | size }} blocks** of the Bot Creator app, grouped by the {{ site.data.blocks_registry.blocks | map: "category" | uniq | size }} categories of the palette. Each block is drawn the way the editor draws it: icon tile, category, name, then its fields with their hints, drop-down options and default values. Open a block to see its fields.

The page is generated from the app's own registry (`_data/blocks_registry.json`), so a block, field or option that does not exist in the app does not appear here. Some blocks are not offered everywhere: the chips under a block say when it is a **final** block, only available in **workflows**, only for **interactions**, or no longer offered in the palette.

How to read a card: a red `*` marks a required field; a bordered tile with a pencil is a sub-editor (embeds, components, nested blocks…); a field shown only for some values of another field says so ("Shown when …"). The fields listed are the ones the editor shows. A block can accept more payload keys when it is created through the API or the MCP, and the engine reads them. Under every block the editor adds the same **Advanced settings** (Action Key, Enabled, On Error), described in the [Blocks guide](/docs/blocks/#1-block-anatomy).

<p><input type="search" class="block-filter" id="block-filter" placeholder="Filter blocks by name…" aria-label="Filter blocks by name"></p>

{% assign categories = "Messages|Reactions|Channels|Moderation|Guild & Members|Components|Webhooks|HTTP & Variables|Workflows|Logic & Flow|Interactions|Music" | split: "|" %}
<p>{% for cat in categories %}<a href="#cat-{{ cat | block_slug }}">{{ cat }}</a>{% unless forloop.last %} · {% endunless %}{% endfor %}</p>

{% for cat in categories %}
<h2 id="cat-{{ cat | block_slug }}">{{ cat }}</h2>
{% for b in site.data.blocks_registry.blocks %}{% if b.category == cat %}
<div class="block-entry" id="{{ b.type }}" data-search="{{ b.name | downcase }} {{ b.type | downcase }}">
{{ b.type | app_block_html }}
<div class="block-entry-meta"><span>{{ b.description }}.</span>{% if b.terminal %}<span class="block-chip">Final block</span>{% endif %}{% if b.workflowOnly %}<span class="block-chip">Workflows only</span>{% endif %}{% if b.interactionOnly %}<span class="block-chip">Interactions only</span>{% endif %}{% if b.deprecated %}<span class="block-chip">Deprecated</span>{% endif %}{% unless b.inPalette %}<span class="block-chip">Not offered in the palette</span>{% endunless %}</div>
<details class="block-json-ref"><summary>Reference: default payload (JSON)</summary><pre><code class="language-json">{{ b.type | block_default_json | escape }}</code></pre></details>
</div>
{% endif %}{% endfor %}
{% endfor %}

<script>
(function () {
  var input = document.getElementById('block-filter');
  if (!input) return;
  input.addEventListener('input', function () {
    var q = input.value.trim().toLowerCase();
    document.querySelectorAll('.block-entry').forEach(function (el) {
      el.hidden = q !== '' && el.getAttribute('data-search').indexOf(q) === -1;
    });
    document.querySelectorAll('h2[id^="cat-"]').forEach(function (h) {
      var n = h.nextElementSibling, any = false;
      while (n && n.tagName !== 'H2') { if (n.classList.contains('block-entry') && !n.hidden) any = true; n = n.nextElementSibling; }
      h.hidden = !any;
    });
  });
})();
</script>
