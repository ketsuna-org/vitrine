---
layout: default
title: Telecharger Bot Creator
description: Installez Bot Creator sur mobile, desktop, Linux ou via le runner Docker.
locale: fr
translation_key: download
content_language: fr
permalink: /fr/download/
---
{% assign downloads = site.data.downloads %}
{% assign t = site.data.locales[page.locale] %}

<section class="site-grid page-section">
  <div class="page-hero compact" data-reveal>
    <h1>T&eacute;l&eacute;charger Bot Creator</h1>
    <p class="lede">Installez l'app sur votre appareil ou configurez le runner Docker pour une ex&eacute;cution Linux permanente.</p>
  </div>

  <div class="download-grid">
    <article class="download-card" data-reveal>
      <span class="download-meta">Mobile</span>
      <h2>Android &amp; iOS</h2>
      <p>Builder visuel et contr&ocirc;le runtime sur votre t&eacute;l&eacute;phone.</p>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.android_play.url }}" target="_blank" rel="noopener noreferrer">Google Play</a>
        <a class="button button-secondary" href="{{ downloads.stores.ios_appstore.url }}" target="_blank" rel="noopener noreferrer">App Store</a>
      </div>
    </article>

    <article class="download-card" data-reveal>
      <span class="download-meta">Desktop</span>
      <h2>Windows</h2>
      <p>Builder complet en local avec un espace de travail large.</p>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.windows_store.url }}" target="_blank" rel="noopener noreferrer">Microsoft Store</a>
        <a class="button button-secondary" href="{{ downloads.stores.windows_zip.url }}" target="_blank" rel="noopener noreferrer">Portable ZIP</a>
      </div>
    </article>

    <article class="download-card" data-reveal>
      <span class="download-meta">Linux</span>
      <h2>AppImage &amp; ZIP</h2>
      <p>Ex&eacute;cution locale directe sur n'importe quelle machine Linux.</p>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.linux_appimage.url }}" target="_blank" rel="noopener noreferrer">AppImage</a>
        <a class="button button-secondary" href="{{ downloads.stores.linux_zip.url }}" target="_blank" rel="noopener noreferrer">Portable ZIP</a>
      </div>
    </article>

    <article class="download-card" id="runner" data-reveal>
      <span class="download-meta">Runner</span>
      <h2>Docker</h2>
      <p>Runner navigateur pour serveurs Linux ou Raspberry Pi.</p>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.runner_guide_url }}" target="_blank" rel="noopener noreferrer">Docs runner</a>
      </div>
    </article>
  </div>

  <div class="panel-card" data-reveal>
    <p class="section-label">Setup runner</p>
    <div class="panel-stack">
      <div class="command-card">
        <div class="command-head">
          <h3>1. R&eacute;cup&eacute;rer l'image</h3>
          <button class="copy-button" type="button" data-copy="{{ downloads.runner.commands.pull }}" data-copy-label="{{ t.common.copy }}" data-copy-success="{{ t.common.copied }}">{{ t.common.copy }}</button>
        </div>
        <pre class="command-block">{{ downloads.runner.commands.pull }}</pre>
      </div>

      <div class="command-card">
        <div class="command-head">
          <h3>2. Cr&eacute;er le volume</h3>
          <button class="copy-button" type="button" data-copy="{{ downloads.runner.commands.volume }}" data-copy-label="{{ t.common.copy }}" data-copy-success="{{ t.common.copied }}">{{ t.common.copy }}</button>
        </div>
        <pre class="command-block">{{ downloads.runner.commands.volume }}</pre>
      </div>

      <div class="command-card">
        <div class="command-head">
          <h3>3. Lancer le runner</h3>
          <button class="copy-button" type="button" data-copy="{{ downloads.runner.commands.run }}" data-copy-label="{{ t.common.copy }}" data-copy-success="{{ t.common.copied }}">{{ t.common.copy }}</button>
        </div>
        <pre class="command-block">{{ downloads.runner.commands.run }}</pre>
      </div>
    </div>
  </div>
</section>
