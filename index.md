---
layout: default
title: Build Discord bots with a visual workspace
description: Bot Creator helps teams build commands, manage workflows, and run Discord bots from one professional app.
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
          <span class="eyebrow-pill">Professional Discord bot builder</span>
          <span class="meta-chip">Visual editor, local control</span>
        </div>
        <h1>Build, run, and manage Discord bots from one professional workspace.</h1>
        <p class="lede">Bot Creator helps creators, moderators, and small teams ship Discord automation without maintaining a custom backend. Design commands visually, keep day-to-day control in the app, and move to Linux or Docker only when uptime becomes a real requirement.</p>
        <div class="button-row">
          <a class="button button-primary" href="{{ t.paths.download | relative_url }}">{{ t.shell.primary_cta }}</a>
          <a class="button button-secondary" href="{{ t.paths.guides | relative_url }}">{{ t.shell.secondary_cta }}</a>
        </div>
        <div class="hero-points">
          <span class="hero-point">Visual command builder</span>
          <span class="hero-point">Runtime control in one app</span>
          <span class="hero-point">Local-first by default</span>
        </div>
        <div class="hero-proof">
          <div class="metric-card">
            <strong>Clear bot setup</strong>
            <p>Configure commands, variables, and response flows in guided screens that stay understandable as your bot grows.</p>
          </div>
          <div class="metric-card">
            <strong>Operational control</strong>
            <p>Start bots, review logs, sync changes, and manage daily actions from the same interface.</p>
          </div>
          <div class="metric-card">
            <strong>Flexible deployment</strong>
            <p>Work on mobile or desktop first, then adopt Linux or the Docker runner when the bot needs more uptime.</p>
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
              <strong>Product-led interface</strong>
              <span>The preview reflects the mobile interface used for day-to-day bot management.</span>
            </div>
            <div class="phone-note">
              <strong>Everyday control</strong>
              <span>Start a bot, inspect logs, sync updates, and invite it to a server without leaving the workflow.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="section-shell" data-reveal>
    <div class="section-header">
      <p class="section-label">Why Bot Creator</p>
      <h2 class="section-heading-xl">A clearer way to ship Discord automation.</h2>
      <p class="section-intro">The product is built for teams that want a reliable workflow from first setup to daily bot operations.</p>
    </div>
    <div class="feature-grid">
      <article class="feature-card">
        <h2>Visual command design</h2>
        <p>Build slash commands, options, and response logic without losing track of permissions, variables, or flows.</p>
      </article>
      <article class="feature-card">
        <h2>Professional day-to-day control</h2>
        <p>Keep startup actions, logs, sync, and runtime checks in the same product your team already uses to build the bot.</p>
      </article>
      <article class="feature-card">
        <h2>Growth without early infrastructure</h2>
        <p>Start locally, validate the workflow, and add Linux or Docker only when hosting becomes an operational need.</p>
      </article>
    </div>
  </section>

  <section class="section-shell" data-reveal>
    <div class="split-grid">
      <article class="panel-card">
        <p class="section-label">Control and ownership</p>
        <h2>Keep your bot workflow understandable.</h2>
        <p>Bot Creator keeps editing, runtime control, and data handling in one product so you do not have to piece together scripts, dashboards, and hosting glue.</p>
        <ul class="check-list">
          <li><div>Local storage is the default for commands, workflows, variables, and logs.</div></li>
          <li><div>Google Drive backup is optional when you want portability across devices.</div></li>
          <li><div>The Docker runner is available once remote Linux uptime becomes necessary.</div></li>
        </ul>
      </article>

      <div class="panel-stack">
        <article class="panel-card">
          <p class="section-label">Mobile, desktop, Linux</p>
          <h2>Use the same product across your devices.</h2>
          <p>Start with the platform that fits your day-to-day work, then continue with the same workflow elsewhere.</p>
          <div class="platform-bar">
            <a href="{{ downloads.stores.android_play.url }}" target="_blank" rel="noopener noreferrer">Android</a>
            <a href="{{ downloads.stores.ios_appstore.url }}" target="_blank" rel="noopener noreferrer">iOS</a>
            <a href="{{ downloads.stores.windows_store.url }}" target="_blank" rel="noopener noreferrer">Windows</a>
            <a href="{{ downloads.stores.linux_appimage.url }}" target="_blank" rel="noopener noreferrer">Linux</a>
          </div>
        </article>
        <article class="panel-card">
          <p class="section-label">Guided onboarding</p>
          <h2>Learn the product fast.</h2>
          <p>Use the guides for token setup, command creation, and runner adoption when your team is ready.</p>
          <div class="button-row">
            <a class="button button-secondary" href="{{ t.paths.guides | relative_url }}">{{ t.shell.secondary_cta }}</a>
          </div>
        </article>
      </div>
    </div>
  </section>

  {% if latest_posts.size > 0 %}
  <section class="section-shell" data-reveal>
    <div class="section-header">
      <p class="section-label">{{ t.guides.title }}</p>
      <h2 class="section-heading-xl">Practical guides for setup, commands, and runtime.</h2>
      <p class="section-intro">Start with token setup, then move into command creation and runner adoption with short, focused walkthroughs.</p>
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
    <p class="section-label">Ready to build</p>
    <h2>Download Bot Creator and create a bot workflow that stays clear as it grows.</h2>
    <p>Start in the app, keep control local, and add runner infrastructure only when it gives your team a real operational benefit.</p>
    <div class="button-row">
      <a class="button button-primary" href="{{ t.paths.download | relative_url }}">{{ t.shell.primary_cta }}</a>
      <a class="button button-secondary" href="{{ t.paths.guides | relative_url }}">{{ t.nav.guides }}</a>
    </div>
  </div>
</section>
