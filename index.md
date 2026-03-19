---
layout: default
title: Create and run Discord bots without code
description: Bot Creator is a local-first Discord bot builder with mobile, desktop, Linux, and Docker runner paths.
locale: en
translation_key: home
content_language: en
---
{% assign t = site.data.locales[page.locale] %}
{% assign downloads = site.data.downloads %}

<section class="site-grid page-section">
  <div class="page-hero" data-reveal>
    <div class="eyebrow-row">
      <span class="eyebrow-pill">{{ t.shell.status_badge }}</span>
      <span class="meta-chip">Mobile, desktop, Linux, Docker</span>
    </div>

    <div class="hero-grid">
      <div class="section-stack">
        <h1>Build Discord bots locally, then run them wherever your workflow needs them.</h1>
        <p class="lede">Bot Creator combines a visual slash-command builder, reusable workflows, local persistence, runtime logs, and optional Google Drive backup. Start on mobile or desktop, then shift to Linux or the Docker runner when you need always-on control.</p>

        <div class="button-row">
          <a class="button button-primary" href="{{ t.paths.download | relative_url }}">{{ t.shell.primary_cta }}</a>
          <a class="button button-secondary" href="{{ t.paths.guides | relative_url }}">{{ t.shell.secondary_cta }}</a>
        </div>

        <div class="metric-grid">
          <div class="metric-card">
            <strong>Visual builder</strong>
            <span>Create slash commands, responses, actions, and reusable workflows without wiring a backend.</span>
          </div>
          <div class="metric-card">
            <strong>Local-first runtime</strong>
            <span>Run bots on your phone, laptop, Linux workstation, or remote runner depending on the job.</span>
          </div>
          <div class="metric-card">
            <strong>Backup when needed</strong>
            <span>Keep data local by default, then use Google Drive backup and restore when you need portability.</span>
          </div>
        </div>
      </div>

      <div class="hero-panel">
        <div class="robot-panel">
          <img src="{{ '/assets/icon.png' | relative_url }}" alt="Bot Creator robot icon">
          <ul class="status-list">
            <li>
              <div>
                <strong>Command orchestration</strong>
                <span>Slash commands, component responses, modals, and conditional action chains.</span>
              </div>
            </li>
            <li>
              <div>
                <strong>Runtime visibility</strong>
                <span>Inspect logs and resource stats without leaving the product control room.</span>
              </div>
            </li>
            <li>
              <div>
                <strong>Runner-ready</strong>
                <span>Switch to the Docker runner when you want a browser-based runtime on Linux hardware.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="panel-card" data-reveal>
    <p class="section-label">Choose your runtime</p>
    <div class="card-grid">
      <div class="feature-card">
        <span class="download-meta">App</span>
        <h2>Mobile and desktop builder</h2>
        <p>Use Android, iPhone, or Windows when you want the full product UI close to where you build commands and workflows.</p>
        <div class="download-actions">
          <a class="button button-secondary" href="{{ downloads.stores.android_play.url }}" target="_blank" rel="noopener noreferrer">Android</a>
          <a class="button button-secondary" href="{{ downloads.stores.windows_store.url }}" target="_blank" rel="noopener noreferrer">Windows</a>
        </div>
      </div>

      <div class="feature-card">
        <span class="download-meta">Linux</span>
        <h2>Portable runtime on Linux</h2>
        <p>Download the latest AppImage for direct local execution on Linux workstations, lab machines, or lightweight self-hosted boxes.</p>
        <div class="download-actions">
          <a class="button button-secondary" href="{{ downloads.stores.linux_appimage.url }}" target="_blank" rel="noopener noreferrer">Latest AppImage</a>
          <a class="button button-secondary" href="{{ downloads.stores.linux_zip.url }}" target="_blank" rel="noopener noreferrer">Portable ZIP</a>
        </div>
      </div>

      <div class="feature-card">
        <span class="download-meta">Runner</span>
        <h2>Docker control surface</h2>
        <p>Use the runner image for browser-based bot control on Linux servers, Raspberry Pi, or remote machines you access from elsewhere.</p>
        <div class="download-actions">
          <a class="button button-secondary" href="{{ t.paths.download | relative_url }}#runner">Runner setup</a>
          <a class="button button-secondary" href="{{ downloads.runner_guide_url }}" target="_blank" rel="noopener noreferrer">Runner docs</a>
        </div>
      </div>
    </div>
  </div>

  <div class="card-grid">
    <div class="panel-card" data-reveal>
      <p class="section-label">Build without code</p>
      <h2>Design commands, responses, and action chains in one place.</h2>
      <p>Bot Creator is built around visual command composition. Configure install contexts, response types, variables, and runtime actions with the same interface instead of juggling multiple tools.</p>
    </div>

    <div class="panel-card" data-reveal>
      <p class="section-label">Operate locally</p>
      <h2>Keep tokens, app data, and runtime control close to the machine you trust.</h2>
      <p>The product stays local-first. You can run on-device, store bot data locally, and use Google Drive only when you explicitly want backup or restore.</p>
    </div>

    <div class="panel-card" data-reveal>
      <p class="section-label">Scale the setup</p>
      <h2>Shift from personal build flow to always-on execution without changing the product model.</h2>
      <p>When your bot needs Linux hardware or a remote browser-accessible runtime, the runner preserves the same operational model rather than forcing a hosted rewrite.</p>
    </div>
  </div>

  <div class="split-grid">
    <div class="panel-card" data-reveal>
      <p class="section-label">Local-first workflow</p>
      <ul class="timeline">
        <li>
          <div>
            <strong>Add a bot token</strong>
            <span>Store the bot metadata locally and start from a clean workspace.</span>
          </div>
        </li>
        <li>
          <div>
            <strong>Build slash commands and workflows</strong>
            <span>Create responses, reusable logic, and action pipelines in the visual builder.</span>
          </div>
        </li>
        <li>
          <div>
            <strong>Run and test in Discord</strong>
            <span>Launch the runtime, verify interactions, and watch logs or resource signals.</span>
          </div>
        </li>
        <li>
          <div>
            <strong>Move to Linux or runner when needed</strong>
            <span>Keep the same project model while moving execution closer to your target machine.</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="panel-stack">
      <div class="panel-card" data-reveal>
        <p class="section-label">Backup and monitoring</p>
        <h2>Use Google Drive as backup, not as a mandatory backend.</h2>
        <p>Bot Creator can export and restore app data through Google Drive AppData while keeping the default workflow local. Startup diagnostics and runtime logs stay visible from the interface.</p>
        <ul class="support-list">
          <li><div>Diagnostics are written locally when startup services fail.</div></li>
          <li><div>Runner logs persist in the mounted Docker volume.</div></li>
          <li><div>OAuth state and bot backup data stay under your control.</div></li>
        </ul>
      </div>

      <div class="command-card" data-reveal>
        <div class="command-head">
          <h3>Runner image</h3>
          <button class="copy-button" type="button" data-copy="{{ downloads.runner.commands.pull }}" data-copy-label="{{ t.common.copy }}" data-copy-success="{{ t.common.copied }}">{{ t.common.copy }}</button>
        </div>
        <pre class="command-block">{{ downloads.runner.commands.pull }}</pre>
        <p>This is the fast path when you want the browser-based runner UI on Linux hardware.</p>
      </div>
    </div>
  </div>

  <div class="panel-card" data-reveal>
    <p class="section-label">Guides</p>
    <div class="guides-rail">
      <div class="guide-track-list">
        {% assign latest_posts = site.posts | slice: 0, 2 %}
        {% for post in latest_posts %}
        <article class="guide-card">
          <span class="meta-chip">{{ t.common.source_language }}: {% if post.content_language == 'fr' %}{{ t.common.source_language_fr }}{% else %}{{ t.common.source_language_en }}{% endif %}</span>
          <h2>{{ post.title }}</h2>
          <p>{{ post.description | default: post.excerpt | strip_html | truncatewords: 28 }}</p>
          <div class="download-actions">
            <a class="button button-secondary" href="{{ post.url | relative_url }}">{{ t.guides.read_more }}</a>
          </div>
        </article>
        {% endfor %}
      </div>

      <div class="panel-card">
        <p class="section-label">Next step</p>
        <h2>Pick the runtime that matches your operational model.</h2>
        <p>Start with the app if you want the full builder close to you. Move to Linux or the runner when you want a portable or remote execution surface.</p>
        <div class="button-row">
          <a class="button button-primary" href="{{ t.paths.download | relative_url }}">Open downloads</a>
          <a class="button button-secondary" href="{{ t.paths.guides | relative_url }}">Browse guides</a>
        </div>
      </div>
    </div>
  </div>
</section>
