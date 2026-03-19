---
layout: default
title: Telecharger Bot Creator
description: Choisissez le setup Bot Creator qui correspond a votre workflow, du mobile et desktop jusqu'au runner Docker plus avance.
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
        <span class="meta-chip">Choisissez votre workflow</span>
      </div>
      <h1>Choisissez le setup qui correspond a votre facon de creer et lancer votre bot.</h1>
      <p class="lede">La plupart des utilisateurs devraient commencer par l'application sur mobile ou desktop. Le runner Docker est pret quand un runtime Linux distant devient utile, mais il s'agit d'une voie avancee, pas du point de depart obligatoire.</p>
      <div class="hero-points">
        <span class="hero-point">Mobile et desktop d'abord</span>
        <span class="hero-point">Linux pour plus de controle local</span>
        <span class="hero-point">Docker pour un runtime permanent</span>
      </div>
    </div>
  </div>

  <div class="download-grid">
    <article class="download-card" data-reveal>
      <span class="download-meta">Mobile</span>
      <h2>Android et iPhone</h2>
      <p>Ideal si vous voulez iterer vite, faire des ajustements legers et garder le controle runtime depuis l'appareil que vous avez deja en main.</p>
      <ul class="download-list">
        <li><div>Builder visuel et acces au runtime en deplacement.</div></li>
        <li><div>Pratique pour les createurs qui veulent avancer sans ouvrir un ordinateur.</div></li>
      </ul>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.android_play.url }}" target="_blank" rel="noopener noreferrer">Google Play</a>
        <a class="button button-secondary" href="{{ downloads.stores.ios_appstore.url }}" target="_blank" rel="noopener noreferrer">App Store</a>
        <a class="button button-secondary" href="{{ downloads.stores.android_apk.url }}" target="_blank" rel="noopener noreferrer">Dernier APK</a>
      </div>
    </article>

    <article class="download-card" data-reveal>
      <span class="download-meta">Desktop</span>
      <h2>Espace de travail Windows</h2>
      <p>Ideal si vous voulez plus d'espace pour editer des commandes, revoir les workflows d'actions et organiser une logique reutilisable.</p>
      <ul class="download-list">
        <li><div>Confortable pour les longues sessions dans le builder.</div></li>
        <li><div>Bon choix par defaut pour prendre le produit en main sereinement.</div></li>
      </ul>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.windows_store.url }}" target="_blank" rel="noopener noreferrer">Microsoft Store</a>
        <a class="button button-secondary" href="{{ downloads.stores.windows_zip.url }}" target="_blank" rel="noopener noreferrer">Portable ZIP</a>
      </div>
    </article>

    <article class="download-card" data-reveal>
      <span class="download-meta">Linux</span>
      <h2>AppImage et ZIP portable</h2>
      <p>Ideal si vous voulez un controle local direct sur une machine Linux sans basculer tout de suite vers une gestion en conteneur.</p>
      <ul class="download-list">
        <li><div>Lancez l'application localement sur votre propre poste.</div></li>
        <li><div>Utile si votre workflow quotidien est deja centre sur Linux.</div></li>
      </ul>
      <div class="download-actions">
        <a class="button button-primary" href="{{ downloads.stores.linux_appimage.url }}" target="_blank" rel="noopener noreferrer">AppImage</a>
        <a class="button button-secondary" href="{{ downloads.stores.linux_zip.url }}" target="_blank" rel="noopener noreferrer">Portable ZIP</a>
      </div>
    </article>

    <article class="download-card" data-reveal>
      <span class="download-meta">Runtime avance</span>
      <h2>Runner Docker</h2>
      <p>Ideal si vous avez besoin d'un runner navigateur sur un serveur Linux, un Raspberry Pi ou une machine distante qui reste en ligne plus longtemps.</p>
      <ul class="download-list">
        <li><div>Pense pour l'uptime et l'execution distante, pas comme premiere installation obligatoire.</div></li>
        <li><div>Complete tres bien un workflow d'edition dans l'application une fois le bot pret a tourner durablement.</div></li>
      </ul>
      <div class="download-actions">
        <a class="button button-primary" href="#runner">Ouvrir le setup runner</a>
        <a class="button button-secondary" href="{{ downloads.runner_guide_url }}" target="_blank" rel="noopener noreferrer">Docs runner</a>
      </div>
    </article>
  </div>

  <section class="section-shell" data-reveal>
    <div class="section-header">
      <p class="section-label">Chemin recommande</p>
      <h2 class="section-heading-xl">Commencez par l'application, puis ajoutez de l'infrastructure seulement si elle vous sert.</h2>
      <p class="section-intro">Le produit est structure pour que vous n'ayez pas a faire des choix de deploiement avant meme d'avoir construit la logique du bot.</p>
    </div>
    <div class="steps-grid">
      <article class="step-card">
        <span class="step-index">01</span>
        <h3>Installez l'application</h3>
        <p>Utilisez mobile, Windows ou Linux pour configurer visuellement commandes, reponses, options et chaines d'actions.</p>
      </article>
      <article class="step-card">
        <span class="step-index">02</span>
        <h3>Gardez le workflow en local</h3>
        <p>Stockez vos donnees localement par defaut, puis ajoutez une sauvegarde seulement si le passage entre appareils devient important.</p>
      </article>
      <article class="step-card">
        <span class="step-index">03</span>
        <h3>Passez au runner si necessaire</h3>
        <p>Adoptez le runner Docker seulement quand vous voulez un runtime Linux qui reste actif sur une machine distante.</p>
      </article>
    </div>
  </section>

  <section class="section-shell" id="runner" data-reveal>
    <div class="split-grid">
      <article class="panel-card">
        <p class="section-label">Setup runner</p>
        <h2>Utilisez le runner quand vous voulez un runtime Linux accessible depuis le navigateur.</h2>
        <p>Le chemin runner est ideal pour une execution plus permanente sur du materiel Linux. Il devient surtout utile quand le bot depasse le simple test local.</p>
        <ul class="check-list">
          <li><div>Bon fit pour serveurs Linux, Raspberry Pi et hebergement distant de bots.</div></li>
          <li><div>Conserve l'etat du runner et les logs dans un volume Docker monte.</div></li>
          <li><div>Fonctionne mieux une fois la logique des commandes deja configuree dans l'application.</div></li>
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
    <p class="section-label">Et ensuite</p>
    <h2>Besoin d'aide pour creer votre premier workflow apres l'installation ?</h2>
    <p>Utilisez les guides pour passer de la creation du bot token a la premiere commande concrete, puis au runner si votre projet le demande.</p>
    <div class="button-row">
      <a class="button button-primary" href="{{ t.paths.guides | relative_url }}">{{ t.nav.guides }}</a>
      <a class="button button-secondary" href="{{ downloads.release_page }}" target="_blank" rel="noopener noreferrer">Derniere version</a>
    </div>
  </div>
</section>
