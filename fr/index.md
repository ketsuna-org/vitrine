---
layout: default
title: Creez et lancez des bots Discord sans code
description: Bot Creator est un constructeur de bots Discord local-first avec des parcours mobile, desktop, Linux et runner Docker.
locale: fr
translation_key: home
content_language: fr
permalink: /fr/
---
{% assign t = site.data.locales[page.locale] %}
{% assign downloads = site.data.downloads %}

<section class="site-grid page-section">
  <div class="page-hero" data-reveal>
    <h1>Cr&eacute;ez des bots Discord sans &eacute;crire de code.</h1>
    <p class="lede">Builder visuel, runtime local, sauvegarde cloud optionnelle. Commencez sur mobile ou desktop, puis passez sur Linux ou Docker au besoin.</p>
    <div class="button-row">
      <a class="button button-primary" href="{{ t.paths.download | relative_url }}">{{ t.shell.primary_cta }}</a>
      <a class="button button-ghost" href="{{ t.paths.guides | relative_url }}">{{ t.shell.secondary_cta }} &rarr;</a>
    </div>
  </div>

  <div class="feature-strip" data-reveal>
    <div class="feature-strip-item">
      <h3>Builder visuel</h3>
      <p>Cr&eacute;ez slash commands, r&eacute;ponses et cha&icirc;nes d'actions sans code.</p>
    </div>
    <div class="feature-strip-item">
      <h3>Runtime local-first</h3>
      <p>Lancez les bots sur votre t&eacute;l&eacute;phone, laptop ou machine Linux. Vos donn&eacute;es restent chez vous.</p>
    </div>
    <div class="feature-strip-item">
      <h3>Sauvegarde optionnelle</h3>
      <p>Gardez les donn&eacute;es en local par d&eacute;faut. Google Drive seulement quand n&eacute;cessaire.</p>
    </div>
  </div>

  <div class="panel-card" data-reveal>
    <p class="section-label">Disponible sur</p>
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
