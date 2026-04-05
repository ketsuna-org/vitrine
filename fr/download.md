---
layout: default
title: Telecharger Bot Creator
description: Choisissez le setup Bot Creator qui correspond a votre workflow, du mobile et desktop jusqu'au runner Docker.
locale: fr
translation_key: download
content_language: fr
permalink: /fr/download/
---
{% assign downloads = site.data.downloads %}
{% assign t = site.data.locales[page.locale] %}

<section class="site-grid page-section">
  <div class="page-hero compact" data-reveal>
    <div class="section-header">
      <div class="eyebrow-row">
        <span class="eyebrow-pill">Telecharger Bot Creator</span>
        <span class="meta-chip">Application d'abord, runner ensuite</span>
      </div>
      <h1>Choisissez le setup Bot Creator qui correspond a votre equipe.</h1>
      <p class="lede">La plupart des equipes devraient commencer par l'application sur mobile ou desktop. Linux et le runner Docker sont disponibles quand vous voulez plus de controle local ou un runtime plus durable.</p>
      <div class="hero-points">
        <span class="hero-point">Edition sur mobile et desktop</span>
        <span class="hero-point">Support du poste Linux</span>
        <span class="hero-point">Runner Docker pour l'uptime distant</span>
      </div>
    </div>
  </div>

  <div class="download-grid">
    <article class="download-card" data-reveal>
      <span class="download-meta">Mobile</span>
      <h2>Android et iPhone</h2>
      <p>Utilisez Bot Creator sur l'appareil que vous avez deja en main pour des retouches rapides, des verifications et un premier controle runtime.</p>
      <ul class="download-list">
        <li><div>Construisez et revoyez la logique du bot en deplacement.</div></li>
        <li><div>Bon choix pour les createurs et moderateurs qui veulent agir vite.</div></li>
      </ul>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.android_play.url }}" target="_blank" rel="noopener noreferrer">Google Play</a>
        <a class="button button-secondary" href="{{ downloads.stores.ios_appstore.url }}" target="_blank" rel="noopener noreferrer">App Store</a>
      </div>
    </article>

    <article class="download-card" data-reveal>
      <span class="download-meta">Desktop</span>
      <h2>Espace de travail Windows</h2>
      <p>Profitez d'un espace de travail plus large pour concevoir les commandes, revoir les workflows et organiser une logique reutilisable.</p>
      <ul class="download-list">
        <li><div>Le meilleur choix par defaut pour les longues sessions d'edition.</div></li>
        <li><div>Une base solide pour les equipes qui veulent prendre le produit en main serieusement.</div></li>
      </ul>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.windows_store.url }}" target="_blank" rel="noopener noreferrer">Microsoft Store</a>
        <a class="button button-secondary" href="{{ downloads.stores.steam.url }}" target="_blank" rel="noopener noreferrer">Steam</a>
      </div>
    </article>

    <article class="download-card" data-reveal>
      <span class="download-meta">Linux</span>
      <h2>Steam</h2>
      <p>Lancez le produit localement sur Linux quand vous voulez un controle direct sans passer tout de suite aux conteneurs.</p>
      <ul class="download-list">
        <li><div>Gardez le meme workflow visuel sur votre poste Linux.</div></li>
        <li><div>Utile si votre equipe travaille deja dans un environnement Linux.</div></li>
      </ul>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.steam.url }}" target="_blank" rel="noopener noreferrer">Steam</a>
      </div>
    </article>

    <article class="download-card" data-reveal>
      <span class="download-meta">Runtime avance</span>
      <h2>Runner Docker</h2>
      <p>Utilisez le runner quand vous avez besoin d'un runtime accessible depuis le navigateur sur un serveur Linux, un Raspberry Pi ou un hote distant.</p>
      <ul class="download-list">
        <li><div>Pense pour l'uptime et l'execution distante, pas comme premiere installation obligatoire.</div></li>
        <li><div>Complete tres bien un workflow d'edition dans l'application une fois le bot pret a rester en ligne.</div></li>
      </ul>
      <div class="download-actions">
        <a class="button button-primary" href="#runner">Ouvrir le setup runner</a>
        <a class="button button-secondary" href="{{ downloads.runner_guide_url }}" target="_blank" rel="noopener noreferrer">Docs runner</a>
      </div>
    </article>
  </div>

  <section class="section-shell" id="runner" data-reveal>
    <div class="split-grid">
      <article class="panel-card">
        <p class="section-label">Setup runner</p>
        <h2>Utilisez le runner Docker quand vous avez besoin d'un uptime Linux distant.</h2>
        <p>Le runner est concu pour les equipes qui gerent deja le bot dans l'application et veulent un runtime navigateur sur un serveur, un Raspberry Pi ou un hote Linux.</p>
        <ul class="check-list">
          <li><div>Runtime navigateur pour machines Linux et hotes distants.</div></li>
          <li><div>Les logs et l'etat du runner persistent dans le volume Docker monte.</div></li>
          <li><div>Le meilleur usage commence une fois le workflow du bot deja configure dans l'application.</div></li>
        </ul>
        <div class="support-links">
          <a href="{{ downloads.runner_guide_url }}" target="_blank" rel="noopener noreferrer">Ouvrir la doc runner</a>
          <a href="{{ downloads.release_notes_page }}" target="_blank" rel="noopener noreferrer">Notes de version</a>
        </div>
      </article>

      <div class="panel-stack">
        <div class="command-card">
          <div class="command-head">
            <h3>1. Recuperer l'image</h3>
            <button class="copy-button" type="button" data-copy="{{ downloads.runner.commands.pull }}" data-copy-label="{{ t.common.copy }}" data-copy-success="{{ t.common.copied }}">{{ t.common.copy }}</button>
          </div>
          <pre class="command-block">{{ downloads.runner.commands.pull }}</pre>
        </div>

        <div class="command-card">
          <div class="command-head">
            <h3>2. Creer le volume</h3>
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

  <div class="cta-banner" data-reveal>
    <p class="section-label">Besoin d'un guide</p>
    <h2>Installez le produit, puis ouvrez le guide qui correspond a votre prochaine etape.</h2>
    <p>Commencez par l'application pour creer et piloter le bot. Ajoutez le runner seulement quand l'uptime devient un besoin operationnel.</p>
    <div class="button-row">
      <a class="button button-primary" href="{{ t.paths.guides | relative_url }}">{{ t.nav.guides }}</a>
      <a class="button button-secondary" href="{{ downloads.release_page }}" target="_blank" rel="noopener noreferrer">Derniere version</a>
    </div>
  </div>
</section>
