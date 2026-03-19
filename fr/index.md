---
layout: default
title: Creez des bots Discord sans code
description: Bot Creator aide les createurs a construire, lancer et superviser des bots Discord visuellement depuis mobile, desktop, Linux ou un runner Docker.
locale: fr
translation_key: home
content_language: fr
permalink: /fr/
---
{% assign t = site.data.locales[page.locale] %}
{% assign downloads = site.data.downloads %}
{% assign latest_posts = site.posts | where: "locale", "en" | slice: 0, 3 %}

<section class="site-grid page-section">
  <div class="page-hero" data-reveal>
    <div class="hero-layout">
      <div class="hero-copy">
        <div class="eyebrow-row">
          <span class="eyebrow-pill">Builder no-code pour bots Discord</span>
          <span class="meta-chip">Local-first par defaut</span>
        </div>
        <h1>Creez, lancez et faites evoluer des bots Discord sans ecrire de code.</h1>
        <p class="lede">Bot Creator vous donne un centre de controle mobile-first pour vos bots Discord. Construisez les workflows visuellement, demarrez et inspectez les bots depuis une interface claire, gardez le controle en local, puis passez a Linux ou Docker seulement quand un runtime permanent devient utile.</p>
        <div class="button-row">
          <a class="button button-primary" href="{{ t.paths.download | relative_url }}">{{ t.shell.primary_cta }}</a>
          <a class="button button-secondary" href="{{ t.paths.guides | relative_url }}">{{ t.shell.secondary_cta }}</a>
        </div>
        <div class="hero-points">
          <span class="hero-point">Controle bot mobile-first</span>
          <span class="hero-point">Mobile, desktop et Linux</span>
          <span class="hero-point">Sauvegarde Google Drive optionnelle</span>
        </div>
        <div class="hero-proof">
          <div class="metric-card">
            <strong>Controle direct du bot</strong>
            <p>Demarrez, invitez, synchronisez, consultez les logs et pilotez le runtime depuis une interface proche de l'app mobile reelle.</p>
          </div>
          <div class="metric-card">
            <strong>Construction visuelle</strong>
            <p>Configurez commandes, variables et logique de reponse dans des ecrans guides plutot que dans un backend.</p>
          </div>
          <div class="metric-card">
            <strong>Evoluez plus tard</strong>
            <p>Passez vers Linux ou le runner Docker seulement quand le bot demande plus de disponibilite.</p>
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
                <div class="phone-action phone-action-muted">Voir les logs du bot</div>
                <div class="phone-action phone-action-muted">Voir les stats du bot</div>
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
              <strong>Un mockup plus fidele</strong>
              <span>La vitrine reprend maintenant l'esthetique sombre et violette de l'application mobile au lieu d'un dashboard generique.</span>
            </div>
            <div class="phone-note">
              <strong>Actions quotidiennes rapides</strong>
              <span>Demarrage du bot, logs, synchronisation, invitation et pilotage runtime restent accessibles depuis un ecran clair.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="section-shell" data-reveal>
    <div class="section-header">
      <p class="section-label">Comment ca marche</p>
      <h2 class="section-heading-xl">Un chemin plus simple entre l'idee et le bot qui tourne.</h2>
      <p class="section-intro">Bot Creator vise les personnes qui savent ce que leur serveur Discord doit automatiser, sans vouloir maintenir un projet code, du glue code et des choix d'hebergement des le premier jour.</p>
    </div>
    <div class="steps-grid">
      <article class="step-card">
        <span class="step-index">01</span>
        <h3>Connectez votre bot</h3>
        <p>Generez le token Discord une fois, stockez-le proprement, puis gardez le reste de la configuration dans le builder visuel.</p>
      </article>
      <article class="step-card">
        <span class="step-index">02</span>
        <h3>Concevez le comportement</h3>
        <p>Assemblez slash commands, reponses et chaines d'actions dans des formulaires clairs plutot que dans du code boilerplate.</p>
      </article>
      <article class="step-card">
        <span class="step-index">03</span>
        <h3>Lancez ou cela vous convient</h3>
        <p>Restez sur mobile ou desktop au quotidien, puis basculez vers Linux ou Docker quand les besoins d'uptime grandissent vraiment.</p>
      </article>
    </div>
  </section>

  <section class="section-shell" data-reveal>
    <div class="section-header">
      <p class="section-label">Cas d'usage</p>
      <h2 class="section-heading-xl">Pense pour des usages Discord concrets, pas pour une simple demo.</h2>
      <p class="section-intro">Le produit se concentre sur les taches que createurs, moderateurs et petites equipes cherchent reellement a automatiser.</p>
    </div>
    <div class="use-case-grid">
      <article class="feature-card">
        <span class="meta-chip">Onboarding de communaute</span>
        <h2>Accueillez les membres avec une premiere interaction propre.</h2>
        <p>Guide d'arrivee, attribution de role, reponses structurees : les premiers echanges paraissent plus serieux des le debut.</p>
      </article>
      <article class="feature-card">
        <span class="meta-chip">Support et moderation</span>
        <h2>Standardisez les actions repetitives sans ouvrir un IDE.</h2>
        <p>Creez des workflows de moderation, support ou logging qui restent lisibles pour les personnes qui pilotent le serveur.</p>
      </article>
      <article class="feature-card">
        <span class="meta-chip">Createurs solo</span>
        <h2>Avancez plus vite quand vous travaillez seul.</h2>
        <p>Restez concentre sur les besoins de votre bot au lieu de perdre du temps sur la stack technique et l'infrastructure.</p>
      </article>
    </div>
  </section>

  <section class="section-shell" data-reveal>
    <div class="section-header">
      <p class="section-label">Capacites</p>
      <h2 class="section-heading-xl">De la configuration d'une commande jusqu'au controle runtime.</h2>
      <p class="section-intro">L'experience est structuree pour rassurer les utilisateurs non techniques tout en laissant une porte claire vers des setups plus avances ensuite.</p>
    </div>
    <div class="feature-grid">
      <article class="feature-card">
        <h2>Builder de slash commands</h2>
        <p>Nom, description, contexte, permissions et type de reponse restent regroupes dans un meme flux simple.</p>
      </article>
      <article class="feature-card">
        <h2>Logique de reponse</h2>
        <p>Composez reponses normales, chemins conditionnels, defer automatique et schemas reutilisables.</p>
      </article>
      <article class="feature-card">
        <h2>Chaines d'actions</h2>
        <p>Declenchez des actions runtime apres une commande pour faire plus qu'un simple message texte.</p>
      </article>
      <article class="feature-card">
        <h2>Workflows reutilisables</h2>
        <p>Enregistrez une logique une fois et reemployez-la partout ou votre bot doit rester coherent.</p>
      </article>
      <article class="feature-card">
        <h2>Workflow multi-plateforme</h2>
        <p>Retrouvez le meme produit sur mobile, Windows, Linux et la voie runner Docker.</p>
      </article>
      <article class="feature-card">
        <h2>Sauvegarde optionnelle</h2>
        <p>Gardez le local comme base et ne connectez Google Drive que lorsque la portabilite devient utile.</p>
      </article>
    </div>
  </section>

  <section class="section-shell" data-reveal>
    <div class="split-grid">
      <article class="panel-card">
        <p class="section-label">Confiance et controle</p>
        <h2>Un produit qui reste simple au debut et transparent ensuite.</h2>
        <p>Bot Creator est pense pour vous laisser demarrer en local, comprendre ou vivent vos donnees, puis ajouter de l'infrastructure seulement quand cela apporte une valeur concrete.</p>
        <ul class="check-list">
          <li><div>Le stockage local est la base pour les donnees bots, workflows, variables et logs.</div></li>
          <li><div>Google Drive sert a la sauvegarde quand vous le decidez, pas comme backend impose.</div></li>
          <li><div>Le runner Docker reste disponible pour Linux ou l'hebergement distant quand vous etes pret.</div></li>
        </ul>
      </article>

      <div class="panel-stack">
        <article class="panel-card">
          <p class="section-label">Mobile et desktop</p>
          <h2>Travaillez depuis l'appareil que vous utilisez deja.</h2>
          <p>Commencez sur votre telephone pour des ajustements rapides, puis passez sur Windows ou Linux pour un espace de travail plus large.</p>
          <div class="platform-bar">
            <a href="{{ downloads.stores.android_play.url }}" target="_blank" rel="noopener noreferrer">Android</a>
            <a href="{{ downloads.stores.ios_appstore.url }}" target="_blank" rel="noopener noreferrer">iOS</a>
            <a href="{{ downloads.stores.windows_store.url }}" target="_blank" rel="noopener noreferrer">Windows</a>
            <a href="{{ downloads.stores.linux_appimage.url }}" target="_blank" rel="noopener noreferrer">Linux</a>
          </div>
        </article>
        <article class="panel-card">
          <p class="section-label">Runtime avance</p>
          <h2>Gardez Docker comme prochaine etape, pas comme contrainte initiale.</h2>
          <p>Quand un runtime Linux permanent devient necessaire, le chemin runner est deja documente et pret a etre adopte sans casser votre flux principal.</p>
          <div class="button-row">
            <a class="button button-secondary" href="{{ t.paths.download | relative_url }}#runner">Voir le setup runner</a>
          </div>
        </article>
      </div>
    </div>
  </section>

  {% if latest_posts.size > 0 %}
  <section class="section-shell" data-reveal>
    <div class="section-header">
      <p class="section-label">{{ t.guides.title }}</p>
      <h2 class="section-heading-xl">Apprenez le produit avec des guides tres concrets.</h2>
      <p class="section-intro">Commencez par la creation du token, puis avancez vers les commandes, workflows et setups runtime avec des tutoriels courts.</p>
    </div>
    <div class="story-grid">
      {% for post in latest_posts %}
      <article class="guide-card">
        <div class="guide-meta">
          <span class="meta-chip">{{ post.date | date: "%Y-%m-%d" }}</span>
          <span class="meta-chip language-chip-soft">{{ t.common.source_language_en }}</span>
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
    <p class="section-label">Pret a commencer</p>
    <h2>Telechargez Bot Creator et construisez votre premier workflow Discord visuellement.</h2>
    <p>Commencez sur l'appareil que vous avez deja, gardez un setup comprehensible, puis ajoutez le runner seulement quand cela devient utile.</p>
    <div class="button-row">
      <a class="button button-primary" href="{{ t.paths.download | relative_url }}">{{ t.shell.primary_cta }}</a>
      <a class="button button-secondary" href="{{ t.paths.guides | relative_url }}">{{ t.nav.guides }}</a>
    </div>
  </div>
</section>
