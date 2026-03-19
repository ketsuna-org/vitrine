---
layout: default
title: Create Discord bots without code
description: Bot Creator helps creators build, run, and monitor Discord bots visually from mobile, desktop, Linux, or a Docker runner.
locale: en
translation_key: home
content_language: en
---
{% assign t = site.data.locales[page.locale] %}
{% assign downloads = site.data.downloads %}
{% assign latest_posts = site.posts | where: "locale", "en" | slice: 0, 3 %}

<section class="site-grid page-section">
  <div class="page-hero" data-reveal>
    <div class="hero-layout">
      <div class="hero-copy">
        <div class="eyebrow-row">
          <span class="eyebrow-pill">No-code Discord bot builder</span>
          <span class="meta-chip">Local-first by default</span>
        </div>
        <h1>Build, launch, and refine Discord bots without writing code.</h1>
        <p class="lede">Bot Creator gives you a mobile-first control room for Discord bots. Build workflows visually, start and inspect bots from a clear app interface, keep control locally, then move to Linux or Docker only when you need an always-on runtime.</p>
        <div class="button-row">
          <a class="button button-primary" href="{{ t.paths.download | relative_url }}">{{ t.shell.primary_cta }}</a>
          <a class="button button-secondary" href="{{ t.paths.guides | relative_url }}">{{ t.shell.secondary_cta }}</a>
        </div>
        <div class="hero-points">
          <span class="hero-point">Mobile-first bot control</span>
          <span class="hero-point">Runs on mobile, desktop, Linux</span>
          <span class="hero-point">Google Drive backup is optional</span>
        </div>
        <div class="hero-proof">
          <div class="metric-card">
            <strong>Control the bot directly</strong>
            <p>Start, invite, sync, inspect logs, and manage runtime actions from a UI that feels like the actual mobile app.</p>
          </div>
          <div class="metric-card">
            <strong>Build visually</strong>
            <p>Create commands, variables, and response logic from guided screens instead of a backend codebase.</p>
          </div>
          <div class="metric-card">
            <strong>Scale later</strong>
            <p>Move to a Linux box or Docker runner once the bot needs more uptime, not on day one.</p>
          </div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="product-mockup" aria-hidden="true">
          <div class="phone-frame">
            <div class="phone-statusbar">
              <span>09:41</span>
              <span>Bot Creator</span>
              <span class="phone-battery">73%</span>
            </div>
            <div class="phone-topbar">
              <span class="phone-back">&#8592;</span>
              <span class="phone-app-title">Swipcord</span>
              <span></span>
            </div>
            <div class="phone-content">
              <div class="phone-avatar">
                <div class="phone-avatar-core">BC</div>
              </div>
              <strong class="phone-bot-name">Swipcord</strong>
              <div class="phone-action-list">
                <div class="phone-action phone-action-start">Start Bot</div>
                <div class="phone-divider"></div>
                <div class="phone-action phone-action-muted">View bot logs</div>
                <div class="phone-action phone-action-muted">View bot stats</div>
                <div class="phone-action phone-action-muted">Sync App</div>
                <div class="phone-action phone-action-invite">Invite Bot</div>
                <div class="phone-action phone-action-delete">Delete App</div>
              </div>
              <div class="phone-nav">
                <div class="phone-nav-item is-active"><span class="phone-nav-icon"></span><span>Home</span></div>
                <div class="phone-nav-item"><span class="phone-nav-icon"></span><span>Create</span></div>
                <div class="phone-nav-item"><span class="phone-nav-icon"></span><span>Keys</span></div>
                <div class="phone-nav-item"><span class="phone-nav-icon"></span><span>Flow</span></div>
                <div class="phone-nav-item"><span class="phone-nav-icon"></span><span>Settings</span></div>
              </div>
            </div>
          </div>
          <div class="phone-side-notes">
            <div class="phone-note">
              <strong>Looks like the product</strong>
              <span>The mockup now reflects the app's real dark and violet mobile interface instead of a generic dashboard.</span>
            </div>
            <div class="phone-note">
              <strong>Fast daily actions</strong>
              <span>Start a bot, inspect logs, sync data, invite it to a server, and keep runtime control close at hand.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="section-shell" data-reveal>
    <div class="section-header">
      <p class="section-label">How it works</p>
      <h2 class="section-heading-xl">A simpler path from idea to running bot.</h2>
      <p class="section-intro">Bot Creator is built for people who know what their Discord server needs, but do not want to maintain code, hosting glue, and deployment steps just to automate it.</p>
    </div>
    <div class="steps-grid">
      <article class="step-card">
        <span class="step-index">01</span>
        <h3>Connect your bot</h3>
        <p>Generate the Discord token once, store it safely, and keep the rest of the setup inside the visual builder.</p>
      </article>
      <article class="step-card">
        <span class="step-index">02</span>
        <h3>Design the behavior</h3>
        <p>Build slash commands, replies, and action chains with clear forms and reusable flows instead of boilerplate code.</p>
      </article>
      <article class="step-card">
        <span class="step-index">03</span>
        <h3>Run where it fits</h3>
        <p>Stay on mobile or desktop for day-to-day work, then switch to Linux or Docker when your uptime needs grow.</p>
      </article>
    </div>
  </section>

  <section class="section-shell" data-reveal>
    <div class="section-header">
      <p class="section-label">Use cases</p>
      <h2 class="section-heading-xl">Designed for concrete Discord workflows, not demos.</h2>
      <p class="section-intro">The product focuses on the jobs creators, moderators, and small teams actually need to automate.</p>
    </div>
    <div class="use-case-grid">
      <article class="feature-card">
        <span class="meta-chip">Community onboarding</span>
        <h2>Welcome members with a polished first interaction.</h2>
        <p>Guide new users with slash commands, role assignment, and structured replies that feel intentional from day one.</p>
      </article>
      <article class="feature-card">
        <span class="meta-chip">Support and ops</span>
        <h2>Standardize repetitive actions without opening an IDE.</h2>
        <p>Create moderation, support, or logging flows that stay readable for the people who run the server every day.</p>
      </article>
      <article class="feature-card">
        <span class="meta-chip">Solo creators</span>
        <h2>Ship a bot faster when you are working alone.</h2>
        <p>Keep momentum on product ideas instead of losing time on framework setup, hosting choices, and glue code.</p>
      </article>
    </div>
  </section>

  <section class="section-shell" data-reveal>
    <div class="section-header">
      <p class="section-label">Capabilities</p>
      <h2 class="section-heading-xl">Everything you need to move from command setup to runtime control.</h2>
      <p class="section-intro">The experience is structured so non-technical users can move confidently, while still leaving room for more advanced runtime setups later.</p>
    </div>
    <div class="feature-grid">
      <article class="feature-card">
        <h2>Slash command builder</h2>
        <p>Define names, descriptions, contexts, permissions, and response types from one clear workflow.</p>
      </article>
      <article class="feature-card">
        <h2>Response logic</h2>
        <p>Compose normal replies, conditional paths, auto-defer behavior, and reusable response patterns.</p>
      </article>
      <article class="feature-card">
        <h2>Action chains</h2>
        <p>Sequence runtime actions after a command so the bot does more than just answer with text.</p>
      </article>
      <article class="feature-card">
        <h2>Reusable workflows</h2>
        <p>Save logic once and apply it again where your bot needs consistent behavior.</p>
      </article>
      <article class="feature-card">
        <h2>Cross-platform workflow</h2>
        <p>Use the same product across mobile, Windows, Linux, and the Docker runner path.</p>
      </article>
      <article class="feature-card">
        <h2>Optional backup</h2>
        <p>Keep local storage as the default and connect Google Drive only if portability matters for your setup.</p>
      </article>
    </div>
  </section>

  <section class="section-shell" data-reveal>
    <div class="split-grid">
      <article class="panel-card">
        <p class="section-label">Trust and control</p>
        <h2>A product that starts simple and stays transparent.</h2>
        <p>Bot Creator is designed so you can begin with a local workflow, understand where your data lives, and add infrastructure only when it gives you a clear benefit.</p>
        <ul class="check-list">
          <li><div>Local storage is the default for bot data, workflows, variables, and logs.</div></li>
          <li><div>Google Drive backup is optional rather than a forced hosted backend.</div></li>
          <li><div>The Docker runner is available for Linux servers and remote uptime when you are ready.</div></li>
        </ul>
      </article>

      <div class="panel-stack">
        <article class="panel-card">
          <p class="section-label">Mobile and desktop</p>
          <h2>Build where you already work.</h2>
          <p>Start on your phone for quick edits, or move to Windows and Linux when you want a larger workspace.</p>
          <div class="platform-bar">
            <a href="{{ downloads.stores.android_play.url }}" target="_blank" rel="noopener noreferrer">Android</a>
            <a href="{{ downloads.stores.ios_appstore.url }}" target="_blank" rel="noopener noreferrer">iOS</a>
            <a href="{{ downloads.stores.windows_store.url }}" target="_blank" rel="noopener noreferrer">Windows</a>
            <a href="{{ downloads.stores.linux_appimage.url }}" target="_blank" rel="noopener noreferrer">Linux</a>
          </div>
        </article>
        <article class="panel-card">
          <p class="section-label">Advanced runtime</p>
          <h2>Keep Docker as the next step, not the first step.</h2>
          <p>When you need an always-on Linux runtime, the runner path is already documented and ready to adopt without changing your core editing workflow.</p>
          <div class="button-row">
            <a class="button button-secondary" href="{{ t.paths.download | relative_url }}#runner">Explore runner setup</a>
          </div>
        </article>
      </div>
    </div>
  </section>

  {% if latest_posts.size > 0 %}
  <section class="section-shell" data-reveal>
    <div class="section-header">
      <p class="section-label">{{ t.guides.title }}</p>
      <h2 class="section-heading-xl">Learn the product with practical walkthroughs.</h2>
      <p class="section-intro">Start with token creation, then move into commands, workflows, and runtime setup using short, task-focused guides.</p>
    </div>
    <div class="story-grid">
      {% for post in latest_posts %}
      <article class="guide-card">
        <div class="guide-meta">
          <span class="meta-chip">{{ post.date | date: "%Y-%m-%d" }}</span>
          {% if post.categories and post.categories.size > 0 %}
          <span class="meta-chip">{{ post.categories | first }}</span>
          {% endif %}
        </div>
        <h2>{{ post.title }}</h2>
        <p>{{ post.description | default: post.excerpt | strip_html | truncatewords: 30 }}</p>
        <div class="download-actions">
          <a class="button button-secondary" href="{{ post.url | relative_url }}">{{ t.guides.read_more }}</a>
        </div>
      </article>
      {% endfor %}
    </div>
  </section>
  {% endif %}

  <div class="cta-banner" data-reveal>
    <p class="section-label">Ready to start</p>
    <h2>Download Bot Creator and build your first Discord workflow visually.</h2>
    <p>Start with the device you already use, keep the setup understandable, and add runner infrastructure only when you need it.</p>
    <div class="button-row">
      <a class="button button-primary" href="{{ t.paths.download | relative_url }}">{{ t.shell.primary_cta }}</a>
      <a class="button button-secondary" href="{{ t.paths.guides | relative_url }}">{{ t.nav.guides }}</a>
    </div>
  </div>
</section>
