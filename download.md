---
layout: default
title: Download Bot Creator
description: Choose the Bot Creator setup that fits your workflow, from mobile and desktop editing to the Docker runner.
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
        <span class="meta-chip">App first, runner ready</span>
      </div>
      <h1>Choose the Bot Creator setup that fits your team.</h1>
      <p class="lede">Most teams should start with the app on mobile or desktop. Linux and the Docker runner are available when you want local workstation control or a longer-lived runtime.</p>
      <div class="hero-points">
        <span class="hero-point">Mobile and desktop editing</span>
        <span class="hero-point">Linux workstation support</span>
        <span class="hero-point">Docker runner for remote uptime</span>
      </div>
    </div>
  </div>

  <div class="download-grid">
    <article class="download-card" data-reveal>
      <span class="download-meta">Mobile</span>
      <h2>Android and iPhone</h2>
      <p>Use Bot Creator on the device you already carry for quick edits, bot checks, and basic runtime control.</p>
      <ul class="download-list">
        <li><div>Build and review bot logic on the go.</div></li>
        <li><div>Good fit for creators and moderators who need fast access.</div></li>
      </ul>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.android_play.url }}" target="_blank" rel="noopener noreferrer">Google Play</a>
        <a class="button button-secondary" href="{{ downloads.stores.ios_appstore.url }}" target="_blank" rel="noopener noreferrer">App Store</a>
      </div>
    </article>

    <article class="download-card" data-reveal>
      <span class="download-meta">Desktop</span>
      <h2>Windows workspace</h2>
      <p>Use a larger workspace to design commands, review flows, and manage reusable bot logic more comfortably.</p>
      <ul class="download-list">
        <li><div>Best default setup for longer editing sessions.</div></li>
        <li><div>Strong choice for teams learning the product seriously.</div></li>
      </ul>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.windows_store.url }}" target="_blank" rel="noopener noreferrer">Microsoft Store</a>
        <a class="button button-secondary" href="{{ downloads.stores.steam.url }}" target="_blank" rel="noopener noreferrer">Steam</a>
      </div>
    </article>

    <article class="download-card" data-reveal>
      <span class="download-meta">Linux</span>
      <h2>Steam</h2>
      <p>Run the product locally on Linux when you want direct control without moving straight into containers.</p>
      <ul class="download-list">
        <li><div>Keep the same visual workflow on your Linux workstation.</div></li>
        <li><div>Useful when your team already works in a Linux environment.</div></li>
      </ul>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.steam.url }}" target="_blank" rel="noopener noreferrer">Steam</a>
      </div>
    </article>

    <article class="download-card" data-reveal>
      <span class="download-meta">Advanced runtime</span>
      <h2>Docker runner</h2>
      <p>Use the runner when you need a browser-based runtime on a Linux server, Raspberry Pi, or remote host.</p>
      <ul class="download-list">
        <li><div>Designed for uptime and remote execution, not as the first required install.</div></li>
        <li><div>Pairs well with app-based editing once the bot is ready to stay online.</div></li>
      </ul>
      <div class="download-actions">
        <a class="button button-primary" href="#runner">Open runner setup</a>
        <a class="button button-secondary" href="{{ downloads.runner_guide_url }}" target="_blank" rel="noopener noreferrer">Runner docs</a>
      </div>
    </article>
  </div>

  <section class="section-shell" id="runner" data-reveal>
    <div class="split-grid">
      <article class="panel-card">
        <p class="section-label">Runner setup</p>
        <h2>Use the Docker runner when you need remote Linux uptime.</h2>
        <p>The runner is designed for teams that already manage the bot in the app and want a browser-based runtime on a server, Raspberry Pi, or Linux host.</p>
        <ul class="check-list">
          <li><div>Browser-based runtime for Linux machines and remote hosts.</div></li>
          <li><div>Logs and runner state persist in the mounted Docker volume.</div></li>
          <li><div>Best used after the bot workflow is already configured in the app.</div></li>
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
    <p class="section-label">Need guidance</p>
    <h2>Install the product, then follow the guide that matches your next step.</h2>
    <p>Start with the app for editing and control. Add the runner only when uptime becomes an operational requirement.</p>
    <div class="button-row">
      <a class="button button-primary" href="{{ t.paths.guides | relative_url }}">{{ t.nav.guides }}</a>
      <a class="button button-secondary" href="{{ downloads.release_page }}" target="_blank" rel="noopener noreferrer">Latest release</a>
    </div>
  </div>
</section>
