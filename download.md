---
layout: default
title: Download Bot Creator
description: Choose the Bot Creator setup that fits your workflow, from mobile and desktop editing to the advanced Docker runner.
locale: en
translation_key: download
content_language: en
permalink: /download/
---
{% assign downloads = site.data.downloads %}
{% assign t = site.data.locales[page.locale] %}

<section class="site-grid page-section">
  <div class="page-hero compact" data-reveal>
    <div class="section-header">
      <div class="eyebrow-row">
        <span class="eyebrow-pill">Download Bot Creator</span>
        <span class="meta-chip">Choose your workflow</span>
      </div>
      <h1>Pick the setup that matches how you want to build and run your bot.</h1>
      <p class="lede">Most people should start with the app on mobile or desktop. The Docker runner is ready when you need remote Linux uptime, but it is an advanced path rather than the required starting point.</p>
      <div class="hero-points">
        <span class="hero-point">Mobile and desktop first</span>
        <span class="hero-point">Linux when you want local control</span>
        <span class="hero-point">Docker for always-on runtime</span>
      </div>
    </div>
  </div>

  <div class="download-grid">
    <article class="download-card" data-reveal>
      <span class="download-meta">Mobile</span>
      <h2>Android and iPhone</h2>
      <p>Best when you want quick iteration, light edits, and runtime control from the same device you already carry.</p>
      <ul class="download-list">
        <li><div>Visual builder and runtime access on the go.</div></li>
        <li><div>Useful for creators who want to ship and adjust without a laptop nearby.</div></li>
      </ul>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.android_play.url }}" target="_blank" rel="noopener noreferrer">Google Play</a>
        <a class="button button-secondary" href="{{ downloads.stores.ios_appstore.url }}" target="_blank" rel="noopener noreferrer">App Store</a>
        <a class="button button-secondary" href="{{ downloads.stores.android_apk.url }}" target="_blank" rel="noopener noreferrer">Latest APK</a>
      </div>
    </article>

    <article class="download-card" data-reveal>
      <span class="download-meta">Desktop</span>
      <h2>Windows workspace</h2>
      <p>Best when you want a larger screen for editing commands, reviewing action flows, and organizing reusable logic.</p>
      <ul class="download-list">
        <li><div>Comfortable setup for longer builder sessions.</div></li>
        <li><div>Good default choice if you are learning the product from scratch.</div></li>
      </ul>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.windows_store.url }}" target="_blank" rel="noopener noreferrer">Microsoft Store</a>
        <a class="button button-secondary" href="{{ downloads.stores.windows_zip.url }}" target="_blank" rel="noopener noreferrer">Portable ZIP</a>
      </div>
    </article>

    <article class="download-card" data-reveal>
      <span class="download-meta">Linux</span>
      <h2>AppImage and portable ZIP</h2>
      <p>Best when you want direct local control on a Linux machine without moving straight into container management.</p>
      <ul class="download-list">
        <li><div>Run the app locally on your own workstation.</div></li>
        <li><div>Useful for creators who already prefer a Linux desktop workflow.</div></li>
      </ul>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.linux_appimage.url }}" target="_blank" rel="noopener noreferrer">AppImage</a>
        <a class="button button-secondary" href="{{ downloads.stores.linux_zip.url }}" target="_blank" rel="noopener noreferrer">Portable ZIP</a>
      </div>
    </article>

    <article class="download-card" data-reveal>
      <span class="download-meta">Advanced runtime</span>
      <h2>Docker runner</h2>
      <p>Best when you need a browser-based runner on a Linux server, Raspberry Pi, or remote machine that stays online longer.</p>
      <ul class="download-list">
        <li><div>Designed for uptime and remote execution, not as the mandatory first install.</div></li>
        <li><div>Pairs well with an app-based editing workflow once the bot is ready to stay online.</div></li>
      </ul>
      <div class="download-actions">
        <a class="button button-primary" href="#runner">Open runner setup</a>
        <a class="button button-secondary" href="{{ downloads.runner_guide_url }}" target="_blank" rel="noopener noreferrer">Runner docs</a>
      </div>
    </article>
  </div>

  <section class="section-shell" data-reveal>
    <div class="section-header">
      <p class="section-label">Recommended path</p>
      <h2 class="section-heading-xl">Start with the app, then add infrastructure only when it helps.</h2>
      <p class="section-intro">The product is intentionally structured so you do not have to make deployment decisions before you have even built the bot logic.</p>
    </div>
    <div class="steps-grid">
      <article class="step-card">
        <span class="step-index">01</span>
        <h3>Install the app</h3>
        <p>Use mobile, Windows, or Linux to configure commands, replies, options, and action chains visually.</p>
      </article>
      <article class="step-card">
        <span class="step-index">02</span>
        <h3>Keep the workflow local</h3>
        <p>Store data locally by default, then add backup only if portability between devices becomes important.</p>
      </article>
      <article class="step-card">
        <span class="step-index">03</span>
        <h3>Move to runner when needed</h3>
        <p>Adopt the Docker runner once you want a Linux runtime that can stay active on a remote machine.</p>
      </article>
    </div>
  </section>

  <section class="section-shell" id="runner" data-reveal>
    <div class="split-grid">
      <article class="panel-card">
        <p class="section-label">Runner setup</p>
        <h2>Use the runner when you want a browser-based Linux runtime.</h2>
        <p>The runner path is ideal for always-on execution on Linux hardware. It is especially useful once the bot has moved beyond occasional local testing.</p>
        <ul class="check-list">
          <li><div>Good fit for Linux servers, Raspberry Pi, and remote bot hosting setups.</div></li>
          <li><div>Persists runner state and logs inside a mounted Docker volume.</div></li>
          <li><div>Works best once your command logic is already configured in the app workflow.</div></li>
        </ul>
        <div class="support-links">
          <a href="{{ downloads.runner_guide_url }}" target="_blank" rel="noopener noreferrer">Open runner docs</a>
          <a href="{{ downloads.release_notes_page }}" target="_blank" rel="noopener noreferrer">Release notes</a>
        </div>
      </article>

      <div class="panel-stack">
        <div class="command-card">
          <div class="command-head">
            <h3>1. Pull the image</h3>
            <button class="copy-button" type="button" data-copy="{{ downloads.runner.commands.pull }}" data-copy-label="{{ t.common.copy }}" data-copy-success="{{ t.common.copied }}">{{ t.common.copy }}</button>
          </div>
          <pre class="command-block">{{ downloads.runner.commands.pull }}</pre>
        </div>

        <div class="command-card">
          <div class="command-head">
            <h3>2. Create the volume</h3>
            <button class="copy-button" type="button" data-copy="{{ downloads.runner.commands.volume }}" data-copy-label="{{ t.common.copy }}" data-copy-success="{{ t.common.copied }}">{{ t.common.copy }}</button>
          </div>
          <pre class="command-block">{{ downloads.runner.commands.volume }}</pre>
        </div>

        <div class="command-card">
          <div class="command-head">
            <h3>3. Start the runner</h3>
            <button class="copy-button" type="button" data-copy="{{ downloads.runner.commands.run }}" data-copy-label="{{ t.common.copy }}" data-copy-success="{{ t.common.copied }}">{{ t.common.copy }}</button>
          </div>
          <pre class="command-block">{{ downloads.runner.commands.run }}</pre>
        </div>
      </div>
    </div>
  </section>

  <div class="cta-banner" data-reveal>
    <p class="section-label">Next step</p>
    <h2>Need help creating the first bot workflow after installation?</h2>
    <p>Use the guides to move from bot token setup to practical command creation and runner adoption.</p>
    <div class="button-row">
      <a class="button button-primary" href="{{ t.paths.guides | relative_url }}">{{ t.nav.guides }}</a>
      <a class="button button-secondary" href="{{ downloads.release_page }}" target="_blank" rel="noopener noreferrer">Latest release</a>
    </div>
  </div>
</section>
