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
    <div class="eyebrow-row">
      <span class="eyebrow-pill">{{ t.shell.status_badge }}</span>
      <span class="meta-chip">Mobile, desktop, Linux, Docker</span>
    </div>

    <div class="hero-grid">
      <div class="section-stack">
        <h1>Construisez vos bots Discord en local, puis lancez-les sur la machine adaptee a votre workflow.</h1>
        <p class="lede">Bot Creator regroupe un builder visuel de slash commands, des workflows reutilisables, un stockage local, des logs runtime et une sauvegarde Google Drive optionnelle. Commencez sur mobile ou desktop, puis basculez sur Linux ou sur le runner Docker quand vous avez besoin d'une execution toujours accessible.</p>

        <div class="button-row">
          <a class="button button-primary" href="{{ t.paths.download | relative_url }}">{{ t.shell.primary_cta }}</a>
          <a class="button button-secondary" href="{{ t.paths.guides | relative_url }}">{{ t.shell.secondary_cta }}</a>
        </div>

        <div class="metric-grid">
          <div class="metric-card">
            <strong>Builder visuel</strong>
            <span>Creez slash commands, reponses, actions et workflows reutilisables sans brancher de backend.</span>
          </div>
          <div class="metric-card">
            <strong>Runtime local-first</strong>
            <span>Lancez les bots sur votre telephone, votre laptop, une machine Linux ou un runner distant selon le besoin.</span>
          </div>
          <div class="metric-card">
            <strong>Sauvegarde optionnelle</strong>
            <span>Gardez les donnees en local par defaut, puis utilisez Google Drive seulement quand vous voulez sauvegarder ou restaurer.</span>
          </div>
        </div>
      </div>

      <div class="hero-panel">
        <div class="robot-panel">
          <img src="{{ '/assets/icon.png' | relative_url }}" alt="Bot Creator robot icon">
          <ul class="status-list">
            <li>
              <div>
                <strong>Orchestration des commandes</strong>
                <span>Slash commands, reponses avec composants, modals et chaines d'actions conditionnelles.</span>
              </div>
            </li>
            <li>
              <div>
                <strong>Visibilite runtime</strong>
                <span>Consultez logs et signaux ressources depuis la meme interface de controle.</span>
              </div>
            </li>
            <li>
              <div>
                <strong>Runner pret</strong>
                <span>Passez au runner Docker si vous voulez une execution browser-based sur Linux.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="panel-card" data-reveal>
    <p class="section-label">Choisir le runtime</p>
    <div class="card-grid">
      <div class="feature-card">
        <span class="download-meta">App</span>
        <h2>Builder mobile et desktop</h2>
        <p>Utilisez Android, iPhone ou Windows quand vous voulez le builder complet et le controle runtime au plus pres de vous.</p>
        <div class="download-actions">
          <a class="button button-secondary" href="{{ downloads.stores.android_play.url }}" target="_blank" rel="noopener noreferrer">Android</a>
          <a class="button button-secondary" href="{{ downloads.stores.windows_store.url }}" target="_blank" rel="noopener noreferrer">Windows</a>
        </div>
      </div>

      <div class="feature-card">
        <span class="download-meta">Linux</span>
        <h2>Runtime portable sur Linux</h2>
        <p>Telechargez toujours la derniere AppImage pour une execution locale directe sur workstation Linux, machine de test ou serveur leger.</p>
        <div class="download-actions">
          <a class="button button-secondary" href="{{ downloads.stores.linux_appimage.url }}" target="_blank" rel="noopener noreferrer">Latest AppImage</a>
          <a class="button button-secondary" href="{{ downloads.stores.linux_zip.url }}" target="_blank" rel="noopener noreferrer">Portable ZIP</a>
        </div>
      </div>

      <div class="feature-card">
        <span class="download-meta">Runner</span>
        <h2>Surface de controle Docker</h2>
        <p>Utilisez l'image runner pour piloter les bots depuis le navigateur sur serveur Linux, Raspberry Pi ou machine distante.</p>
        <div class="download-actions">
          <a class="button button-secondary" href="{{ t.paths.download | relative_url }}#runner">Setup runner</a>
          <a class="button button-secondary" href="{{ downloads.runner_guide_url }}" target="_blank" rel="noopener noreferrer">Docs runner</a>
        </div>
      </div>
    </div>
  </div>

  <div class="card-grid">
    <div class="panel-card" data-reveal>
      <p class="section-label">Construire sans code</p>
      <h2>Composez commandes, reponses et chaines d'actions dans la meme interface.</h2>
      <p>Bot Creator est structure autour d'une composition visuelle des commandes. Configurez contextes, types de reponse, variables et actions runtime sans sortir de l'outil.</p>
    </div>

    <div class="panel-card" data-reveal>
      <p class="section-label">Operer en local</p>
      <h2>Gardez les tokens, les donnees et le controle runtime sur la machine de confiance.</h2>
      <p>Le produit reste local-first. Vous pouvez executer en local, stocker les donnees localement et n'utiliser Google Drive que si vous le decidez.</p>
    </div>

    <div class="panel-card" data-reveal>
      <p class="section-label">Faire evoluer l'installation</p>
      <h2>Passez d'un flow personnel a une execution distante sans changer de modele produit.</h2>
      <p>Quand le bot doit tourner sur du materiel Linux ou dans un navigateur distant, le runner garde la meme logique operationnelle au lieu d'imposer un service heberge.</p>
    </div>
  </div>

  <div class="split-grid">
    <div class="panel-card" data-reveal>
      <p class="section-label">Workflow local-first</p>
      <ul class="timeline">
        <li>
          <div>
            <strong>Ajouter un bot token</strong>
            <span>Stockez la configuration du bot localement et partez d'un workspace propre.</span>
          </div>
        </li>
        <li>
          <div>
            <strong>Construire les slash commands et workflows</strong>
            <span>Assemblez reponses, logique reutilisable et actions runtime dans le builder visuel.</span>
          </div>
        </li>
        <li>
          <div>
            <strong>Lancer et tester dans Discord</strong>
            <span>Demarrez le runtime, verifiez les interactions et suivez logs ou signaux systeme.</span>
          </div>
        </li>
        <li>
          <div>
            <strong>Passer sur Linux ou le runner</strong>
            <span>Gardez le meme modele de projet tout en deplacant l'execution vers la machine cible.</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="panel-stack">
      <div class="panel-card" data-reveal>
        <p class="section-label">Sauvegarde et monitoring</p>
        <h2>Google Drive sert de sauvegarde, pas de backend obligatoire.</h2>
        <p>Bot Creator peut exporter et restaurer les donnees via Google Drive AppData tout en gardant un fonctionnement local par defaut. Les diagnostics de demarrage et les logs runtime restent consultables.</p>
        <ul class="support-list">
          <li><div>Les diagnostics sont ecrits localement quand un service de demarrage echoue.</div></li>
          <li><div>Les logs du runner persistent dans le volume Docker monte.</div></li>
          <li><div>L'etat OAuth et les sauvegardes restent sous votre controle.</div></li>
        </ul>
      </div>

      <div class="command-card" data-reveal>
        <div class="command-head">
          <h3>Image runner</h3>
          <button class="copy-button" type="button" data-copy="{{ downloads.runner.commands.pull }}" data-copy-label="{{ t.common.copy }}" data-copy-success="{{ t.common.copied }}">{{ t.common.copy }}</button>
        </div>
        <pre class="command-block">{{ downloads.runner.commands.pull }}</pre>
        <p>C'est le chemin rapide si vous voulez l'UI runner dans le navigateur sur une machine Linux.</p>
      </div>
    </div>
  </div>

  <div class="panel-card" data-reveal>
    <p class="section-label">Guides</p>
    <div class="guides-rail">
      <div class="guide-track-list">
        {% assign latest_posts = site.posts | slice: 0, 2 %}
        {% for post in latest_posts %}
        <article class="guide-card">
          <span class="meta-chip">{{ t.common.source_language }}: {% if post.content_language == 'fr' %}{{ t.common.source_language_fr }}{% else %}{{ t.common.source_language_en }}{% endif %}</span>
          <h2>{{ post.title }}</h2>
          <p>{{ post.description | default: post.excerpt | strip_html | truncatewords: 28 }}</p>
          <div class="download-actions">
            <a class="button button-secondary" href="{{ post.url | relative_url }}">{{ t.guides.read_more }}</a>
          </div>
        </article>
        {% endfor %}
      </div>

      <div class="panel-card">
        <p class="section-label">Prochaine etape</p>
        <h2>Choisissez le runtime qui correspond a votre modele operationnel.</h2>
        <p>Commencez avec l'app si vous voulez le builder complet. Passez sur Linux ou sur le runner si vous avez besoin d'une execution portable ou distante.</p>
        <div class="button-row">
          <a class="button button-primary" href="{{ t.paths.download | relative_url }}">Ouvrir les telechargements</a>
          <a class="button button-secondary" href="{{ t.paths.guides | relative_url }}">Parcourir les guides</a>
        </div>
      </div>
    </div>
  </div>
</section>
