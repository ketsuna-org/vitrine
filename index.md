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
    <h1>Create Discord bots without writing code.</h1>
    <p class="lede">Visual builder, local runtime, optional cloud backup. Start on your phone or desktop, then scale to Linux or Docker when needed.</p>
    <div class="button-row">
      <a class="button button-primary" href="{{ t.paths.download | relative_url }}">{{ t.shell.primary_cta }}</a>
      <a class="button button-ghost" href="{{ t.paths.guides | relative_url }}">{{ t.shell.secondary_cta }} &rarr;</a>
    </div>
  </div>

  <div class="feature-strip" data-reveal>
    <div class="feature-strip-item">
      <h3>Visual command builder</h3>
      <p>Create slash commands, responses, and action chains without boilerplate code.</p>
    </div>
    <div class="feature-strip-item">
      <h3>Local-first runtime</h3>
      <p>Run bots on your phone, laptop, or Linux workstation. Your data stays on your machine.</p>
    </div>
    <div class="feature-strip-item">
      <h3>Optional backup</h3>
      <p>Keep data local by default. Use Google Drive only when you need portability.</p>
    </div>
  </div>

  <div class="panel-card" data-reveal>
    <p class="section-label">Available on</p>
    <div class="platform-bar">
      <a href="{{ downloads.stores.android_play.url }}" target="_blank" rel="noopener noreferrer">Android</a>
      <a href="{{ downloads.stores.ios_appstore.url }}" target="_blank" rel="noopener noreferrer">iOS</a>
      <a href="{{ downloads.stores.windows_store.url }}" target="_blank" rel="noopener noreferrer">Windows</a>
      <a href="{{ downloads.stores.linux_appimage.url }}" target="_blank" rel="noopener noreferrer">Linux</a>
      <a href="{{ t.paths.download | relative_url }}#runner">Docker Runner</a>
    </div>
  </div>

  {% assign latest_posts = site.posts | slice: 0, 3 %}
  {% if latest_posts.size > 0 %}
  <div class="panel-card" data-reveal>
    <p class="section-label">{{ t.guides.title }}</p>
    <div class="simple-list">
      {% for post in latest_posts %}
      <a class="simple-list-link" href="{{ post.url | relative_url }}">
        <span>{{ post.title }}</span>
        <span class="simple-list-meta">{{ post.date | date: "%Y-%m-%d" }}</span>
      </a>
      {% endfor %}
    </div>
  </div>
  {% endif %}
</section>
