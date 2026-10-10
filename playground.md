---
layout: playground
title: Playground
description: Try Bot Creator blocks and BDFD snippets in your browser and see the Discord message they would draw.
permalink: /playground/
sitemap: false
---

# Playground

Edit and watch the Discord preview change. Everything runs in your browser; nothing is sent anywhere and nothing is executed.

<div class="bp-row mb-4" role="tablist">
  <button class="bp-btn bp-primary" type="button" role="tab" data-pg-tab="blocks" aria-selected="true">Blocks</button>
  <button class="bp-btn" type="button" role="tab" data-pg-tab="bdfd" aria-selected="false">BDFD</button>
</div>

<section data-pg-panel="blocks" markdown="1">

Add blocks, fill their fields and see the message they would send. The blocks, fields, hints and options are the ones of the app ([Dictionary](/docs/blocks-dictionary/)).

<div id="blocks-playground" class="bp-root"><noscript>The playground needs JavaScript.</noscript></div>

**What is simulated.** The preview draws the message of *Respond with Message* and *Send Message* blocks (text, embeds, private reply) with sample values for `((user.username))`, `((guild.name))` and a few others. Every other block is editable and exported, but has no visible effect here. Sub-editors (components, nested blocks…) are shown but not editable. This is an approximation of Discord, not the engine.

</section>

<section data-pg-panel="bdfd" hidden markdown="1">

Type or paste a BDFD / BDScript snippet.

<div id="bdfd-playground" class="bp-root"><noscript>The playground needs JavaScript.</noscript></div>

**What is simulated.** The preview only *reads* the snippet: it draws the message text, the embed (`$title`, `$description`, `$color`, `$addField`, `$footer`, `$author`, `$thumbnail`, `$image`), buttons, select menus, `$ephemeral` and attached files. `$username`, `$guildName` and similar are replaced by sample values. Other functions are **not executed**; the preview only shows a generic confirmation line. It is an approximation of Discord, not the engine.

</section>
