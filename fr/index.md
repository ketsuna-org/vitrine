---
layout: default
title: Creez des bots Discord depuis un espace de travail visuel
description: Bot Creator aide les equipes a creer des commandes, gerer des workflows et piloter des bots Discord depuis une application professionnelle.
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
          <span class="eyebrow-pill">Constructeur professionnel de bots Discord</span>
          <span class="meta-chip">Editeur visuel, controle local</span>
        </div>
        <h1>Creez, lancez et gerez vos bots Discord depuis un espace de travail professionnel.</h1>
        <p class="lede">Bot Creator aide les createurs, moderateurs et petites equipes a deployer une automatisation Discord sans maintenir un backend sur mesure. Concevez les commandes visuellement, gardez le controle quotidien dans l'application, puis passez a Linux ou Docker seulement quand l'uptime devient un vrai sujet.</p>
        <div class="button-row">
          <a class="button button-primary" href="{{ t.paths.download | relative_url }}">{{ t.shell.primary_cta }}</a>
          <a class="button button-secondary" href="{{ t.paths.guides | relative_url }}">{{ t.shell.secondary_cta }}</a>
        </div>
        <div class="hero-points">
          <span class="hero-point">Builder visuel de commandes</span>
          <span class="hero-point">Controle runtime dans une seule app</span>
          <span class="hero-point">Local-first par defaut</span>
        </div>
        <div class="hero-proof">
          <div class="metric-card">
            <strong>Configuration claire du bot</strong>
            <p>Configurez commandes, variables et reponses dans des ecrans guides qui restent lisibles a mesure que le bot evolue.</p>
          </div>
          <div class="metric-card">
            <strong>Controle operationnel</strong>
            <p>Demarrez les bots, consultez les logs, synchronisez les changements et pilotez les actions quotidiennes depuis la meme interface.</p>
          </div>
          <div class="metric-card">
            <strong>Deploiement flexible</strong>
            <p>Travaillez d'abord sur mobile ou desktop, puis adoptez Linux ou le runner Docker quand le bot demande plus de disponibilite.</p>
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
              <strong>Interface produit fidele</strong>
              <span>L'aperu reprend l'interface mobile utilisee pour piloter le bot au quotidien.</span>
            </div>
            <div class="phone-note">
              <strong>Actions quotidiennes</strong>
              <span>Demarrage du bot, logs, synchronisation et invitation restent accessibles sans quitter le workflow.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="section-shell" data-reveal>
    <div class="section-header">
      <p class="section-label">Pourquoi Bot Creator</p>
      <h2 class="section-heading-xl">Une facon plus claire de livrer une automatisation Discord.</h2>
      <p class="section-intro">Le produit est pense pour les equipes qui veulent un workflow fiable, du premier setup jusqu'aux operations quotidiennes.</p>
    </div>
    <div class="feature-grid">
      <article class="feature-card">
        <h2>Conception visuelle des commandes</h2>
        <p>Construisez slash commands, options et logique de reponse sans perdre de vue permissions, variables et enchainements.</p>
      </article>
      <article class="feature-card">
        <h2>Controle professionnel au quotidien</h2>
        <p>Gardez demarrage, logs, synchronisation et controles runtime dans le meme produit que celui utilise pour construire le bot.</p>
      </article>
      <article class="feature-card">
        <h2>Croissance sans infrastructure prematuree</h2>
        <p>Commencez en local, validez le workflow, puis ajoutez Linux ou Docker seulement quand l'hebergement devient un besoin operationnel.</p>
      </article>
    </div>
  </section>

  <section class="section-shell" data-reveal>
    <div class="split-grid">
      <article class="panel-card">
        <p class="section-label">Controle et propriete</p>
        <h2>Gardez un workflow bot comprehensible.</h2>
        <p>Bot Creator rassemble edition, controle runtime et gestion des donnees dans un meme produit pour eviter les scripts disperses, dashboards annexes et glue technique.</p>
        <ul class="check-list">
          <li><div>Le stockage local est la base pour les commandes, workflows, variables et logs.</div></li>
          <li><div>La sauvegarde Google Drive reste optionnelle quand vous voulez plus de portabilite.</div></li>
          <li><div>Le runner Docker reste disponible quand un uptime Linux distant devient necessaire.</div></li>
        </ul>
      </article>

      <div class="panel-stack">
        <article class="panel-card">
          <p class="section-label">Mobile, desktop, Linux</p>
          <h2>Utilisez le meme produit sur tous vos appareils.</h2>
          <p>Commencez sur la plateforme qui correspond a votre travail quotidien, puis poursuivez le meme workflow ailleurs.</p>
          <div class="platform-bar">
            <a href="{{ downloads.stores.android_play.url }}" target="_blank" rel="noopener noreferrer">Android</a>
            <a href="{{ downloads.stores.ios_appstore.url }}" target="_blank" rel="noopener noreferrer">iOS</a>
            <a href="{{ downloads.stores.windows_store.url }}" target="_blank" rel="noopener noreferrer">Windows</a>
            <a href="{{ downloads.stores.linux_appimage.url }}" target="_blank" rel="noopener noreferrer">Linux</a>
          </div>
        </article>
        <article class="panel-card">
          <p class="section-label">Prise en main guidee</p>
          <h2>Apprenez le produit rapidement.</h2>
          <p>Utilisez les guides pour le token, la creation de commandes et l'adoption du runner quand votre equipe est prete.</p>
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
      <h2 class="section-heading-xl">Des guides pratiques pour le setup, les commandes et le runtime.</h2>
      <p class="section-intro">Commencez par le token, puis avancez vers la creation de commandes et le runner avec des tutoriels courts et utiles.</p>
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
    <p class="section-label">Pret a construire</p>
    <h2>Telechargez Bot Creator et creez un workflow bot qui reste clair a mesure qu'il grandit.</h2>
    <p>Commencez dans l'application, gardez le controle en local et ajoutez le runner seulement quand cela apporte un vrai benefice operationnel.</p>
    <div class="button-row">
      <a class="button button-primary" href="{{ t.paths.download | relative_url }}">{{ t.shell.primary_cta }}</a>
      <a class="button button-secondary" href="{{ t.paths.guides | relative_url }}">{{ t.nav.guides }}</a>
    </div>
  </div>
</section>
