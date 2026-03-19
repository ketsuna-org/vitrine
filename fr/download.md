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
  <div class="page-hero" data-reveal>
    <div class="eyebrow-row">
      <span class="eyebrow-pill">Parcours d'installation</span>
      <span class="meta-chip">Release-driven et runner-ready</span>
    </div>
    <div class="hero-grid">
      <div class="section-stack">
        <h1>Choisissez le runtime Bot Creator adapte a la machine que vous voulez piloter.</h1>
        <p class="lede">Le produit a deux chemins distincts : l'application elle-meme pour construire et piloter le runtime en local, et le runner Docker pour une execution browser-based sur materiel Linux. Les builds Linux pointent toujours vers la derniere AppImage, et les redirects GitHub restent a jour sans logique client-side.</p>
        <div class="button-row">
          <a class="button button-primary" href="{{ downloads.release_page }}" target="_blank" rel="noopener noreferrer">Derniere release</a>
          <a class="button button-secondary" href="#runner">Setup runner</a>
        </div>
      </div>

      <div class="panel-card">
        <p class="section-label">Source des builds</p>
        <h2>Les redirects latest-release gardent la page statique mais actuelle.</h2>
        <p>Les telechargements directs de l'app et de Linux utilisent des URLs GitHub latest-release. Le site reste statique tout en pointant vers les derniers artefacts et leurs hashes.</p>
        <div class="support-links">
          <a href="{{ downloads.release_notes_page }}" target="_blank" rel="noopener noreferrer">Notes de version</a>
          <a href="{{ downloads.release_page }}" target="_blank" rel="noopener noreferrer">Artefacts et hashes</a>
        </div>
      </div>
    </div>
  </div>

  <div class="download-grid">
    <article class="download-card" data-reveal>
      <span class="download-meta">Apps mobiles</span>
      <h2>Android et iPhone</h2>
      <p>Choisissez l'app mobile si vous voulez le builder visuel et le controle runtime directement sur votre appareil.</p>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.android_play.url }}" target="_blank" rel="noopener noreferrer">Google Play</a>
        <a class="button button-secondary" href="{{ downloads.stores.android_apk.url }}" target="_blank" rel="noopener noreferrer">Latest APK</a>
        <a class="button button-secondary" href="{{ downloads.stores.ios_appstore.url }}" target="_blank" rel="noopener noreferrer">App Store</a>
      </div>
    </article>

    <article class="download-card" data-reveal>
      <span class="download-meta">App desktop</span>
      <h2>Flux Windows desktop</h2>
      <p>Utilisez l'application Windows si vous voulez le builder complet en local avec un espace de travail plus large.</p>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.windows_store.url }}" target="_blank" rel="noopener noreferrer">Microsoft Store</a>
        <a class="button button-secondary" href="{{ downloads.stores.windows_zip.url }}" target="_blank" rel="noopener noreferrer">Portable ZIP</a>
      </div>
    </article>

    <article class="download-card" data-reveal>
      <span class="download-meta">Builds Linux</span>
      <h2>Release portable Linux</h2>
      <p>Utilisez l'AppImage sur workstation Linux, machine de labo ou serveur leger quand vous voulez une execution locale directe.</p>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.linux_appimage.url }}" target="_blank" rel="noopener noreferrer">Latest AppImage</a>
        <a class="button button-secondary" href="{{ downloads.stores.linux_zip.url }}" target="_blank" rel="noopener noreferrer">Portable ZIP</a>
      </div>
    </article>

    <article class="download-card" id="runner" data-reveal>
      <span class="download-meta">Runner Docker</span>
      <h2>Runner browser-based sur materiel Linux</h2>
      <p>Le runner expose une web UI pour selectionner, demarrer et stopper des bots. Les tokens Google Drive et les logs restent dans le volume monte, ce qui en fait le bon chemin pour serveur Linux, Raspberry Pi et hebergement distant.</p>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.runner_guide_url }}" target="_blank" rel="noopener noreferrer">Docs runner</a>
        <a class="button button-secondary" href="{{ downloads.release_page }}" target="_blank" rel="noopener noreferrer">Derniere release</a>
      </div>
    </article>
  </div>

  <div class="split-grid">
    <div class="panel-stack">
      <div class="command-card" data-reveal>
        <div class="command-head">
          <h3>1. Recuperer l'image runner</h3>
          <button class="copy-button" type="button" data-copy="{{ downloads.runner.commands.pull }}" data-copy-label="{{ t.common.copy }}" data-copy-success="{{ t.common.copied }}">{{ t.common.copy }}</button>
        </div>
        <pre class="command-block">{{ downloads.runner.commands.pull }}</pre>
      </div>

      <div class="command-card" data-reveal>
        <div class="command-head">
          <h3>2. Creer le volume persistant</h3>
          <button class="copy-button" type="button" data-copy="{{ downloads.runner.commands.volume }}" data-copy-label="{{ t.common.copy }}" data-copy-success="{{ t.common.copied }}">{{ t.common.copy }}</button>
        </div>
        <pre class="command-block">{{ downloads.runner.commands.volume }}</pre>
      </div>

      <div class="command-card" data-reveal>
        <div class="command-head">
          <h3>3. Lancer le runner</h3>
          <button class="copy-button" type="button" data-copy="{{ downloads.runner.commands.run }}" data-copy-label="{{ t.common.copy }}" data-copy-success="{{ t.common.copied }}">{{ t.common.copy }}</button>
        </div>
        <pre class="command-block">{{ downloads.runner.commands.run }}</pre>
      </div>
    </div>

    <div class="panel-card" data-reveal>
      <p class="section-label">Onboarding runner</p>
      <ul class="timeline">
        <li>
          <div>
            <strong>Recuperer l'image</strong>
            <span>Telechargez le runner courant depuis GitHub Container Registry.</span>
          </div>
        </li>
        <li>
          <div>
            <strong>Demarrer le conteneur</strong>
            <span>Exposez le port 8080 et montez le volume persistant sur <code>/data</code>.</span>
          </div>
        </li>
        <li>
          <div>
            <strong>Ouvrir la web UI</strong>
            <span>Accedez a <code>{{ downloads.runner.web_url }}</code> ou tunnelisez le port depuis un hote distant.</span>
          </div>
        </li>
        <li>
          <div>
            <strong>Connecter Google Drive puis lancer un bot</strong>
            <span>Autorisez une fois, gardez le token cache dans le volume, puis selectionnez le bot a executer.</span>
          </div>
        </li>
      </ul>

      <ul class="support-list">
        {% for note in downloads.runner.notes %}
        <li><div>{{ note }}</div></li>
        {% endfor %}
      </ul>
    </div>
  </div>
</section>
