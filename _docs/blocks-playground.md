---
layout: doc
title: Blocks Playground
category: "Blocks"
api_type: blocks
description: Build a sequence with the real blocks of the app, edit their fields and watch the Discord preview change. Runs in your browser; nothing is sent anywhere.
permalink: /docs/blocks-playground/
---

# Blocks Playground

Add blocks, fill their fields and see the message they would send. The blocks, fields, hints and options are the ones of the app ([Dictionary](/docs/blocks-dictionary/)). The sequence stays in your browser.

<div id="blocks-playground" class="bp-root">
  <noscript>The playground needs JavaScript.</noscript>
</div>

**What is simulated.** The preview draws the message of *Respond with Message* and *Send Message* blocks (text, embeds, private reply) with sample values for `((user.username))`, `((guild.name))` and a few others. Every other block is editable and exported, but has no visible effect here. Sub-editors (components, nested blocks…) are shown but not editable in the playground. This is an approximation of Discord, not the engine.

<script src="{{ '/assets/js/blocks-playground.js' | relative_url }}" defer></script>
