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

<main class="min-h-screen py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-6">
    <!-- Header -->
    <header class="mb-16" data-reveal>
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <span class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary border border-primary/20">
          <span class="material-symbols-outlined text-sm">download</span>
          Téléchargements
        </span>
        <span class="inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 border border-outline-variant">
          Application d'abord, runner ensuite
        </span>
      </div>
      <h1 class="font-display text-4xl font-black leading-tight text-on-surface md:text-5xl lg:text-7xl mb-8">
        Choisissez le setup Bot Creator qui correspond à votre équipe.
      </h1>
      <p class="max-w-3xl text-xl leading-relaxed text-on-surface-variant italic border-l-4 border-primary pl-6 py-2 mb-12">
        La plupart des équipes devraient commencer par l'application sur mobile ou desktop. Linux et le runner Docker sont disponibles quand vous voulez plus de contrôle local ou un runtime distant plus durable.
      </p>
    </header>

    <!-- Download Grid -->
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-24">
      <!-- Mobile -->
      <article class="flex flex-col rounded-[2.5rem] bg-surface-container border border-outline-variant p-8 transition-all hover:border-primary/40 hover:neon-glow" data-reveal>
        <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <span class="material-symbols-outlined text-3xl">smartphone</span>
        </div>
        <h2 class="mb-3 text-2xl font-bold text-on-surface">Mobile</h2>
        <p class="mb-8 text-on-surface-variant leading-relaxed text-sm">
          Construisez et revoyez la logique du bot en déplacement. Idéal pour les créateurs et modérateurs réactifs.
        </p>
        <div class="mt-auto space-y-3">
          <a class="button-primary w-full" href="{{ downloads.stores.android_play.url }}" target="_blank">
            <span class="material-symbols-outlined text-sm mr-2">phone_android</span>
            Google Play
          </a>
          <a class="button-outline w-full" href="{{ downloads.stores.ios_appstore.url }}" target="_blank">
            <span class="material-symbols-outlined text-sm mr-2">phone_iphone</span>
            App Store
          </a>
        </div>
      </article>

      <!-- Desktop -->
      <article class="flex flex-col rounded-[2.5rem] bg-surface-container border border-outline-variant p-8 transition-all hover:border-primary/40 hover:neon-glow" data-reveal>
        <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <span class="material-symbols-outlined text-3xl">laptop</span>
        </div>
        <h2 class="mb-3 text-2xl font-bold text-on-surface">Desktop</h2>
        <p class="mb-8 text-on-surface-variant leading-relaxed text-sm">
          Un espace de travail large pour concevoir les commandes et organiser votre logique sur Windows et MacOS.
        </p>
        <div class="mt-auto space-y-3">
          <a class="button-primary w-full !text-xs !h-11" href="{{ downloads.stores.windows_store.url }}" target="_blank">
            <span class="material-symbols-outlined text-sm mr-2">grid_view</span>
            Microsoft Store
          </a>
          <a class="button-outline w-full !text-xs !h-11" href="{{ downloads.stores.steam.url }}" target="_blank">
            <span class="material-symbols-outlined text-sm mr-2">sports_esports</span>
            Steam
          </a>
        </div>
      </article>

      <!-- Linux -->
      <article class="flex flex-col rounded-[2.5rem] bg-surface-container border border-outline-variant p-8 transition-all hover:border-primary/40 hover:neon-glow" data-reveal>
        <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <span class="material-symbols-outlined text-3xl">terminal</span>
        </div>
        <h2 class="mb-3 text-2xl font-bold text-on-surface">Linux</h2>
        <p class="mb-8 text-on-surface-variant leading-relaxed text-sm">
          Lancez le produit localement sur Linux pour un contrôle direct sans passer tout de suite aux conteneurs.
        </p>
        <div class="mt-auto space-y-3">
          <a class="button-primary w-full" href="{{ downloads.stores.steam.url }}" target="_blank">
            <span class="material-symbols-outlined text-sm mr-2">sports_esports</span>
            Steam
          </a>
        </div>
      </article>

      <!-- Docker Runner -->
      <article class="flex flex-col rounded-[2.5rem] bg-surface-container border border-outline-variant p-8 transition-all hover:border-primary/40 hover:neon-glow border-primary/20" data-reveal>
        <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <span class="material-symbols-outlined text-3xl">deployed_code</span>
        </div>
        <h2 class="mb-3 text-2xl font-bold text-on-surface">Runner Docker</h2>
        <p class="mb-8 text-on-surface-variant leading-relaxed text-sm">
          Runtime navigateur pour serveurs Linux, Raspberry Pi ou hôtes distants. Conçu pour l'uptime.
        </p>
        <div class="mt-auto space-y-3">
          <a class="button-primary w-full" href="#runner">
            <span class="material-symbols-outlined text-sm mr-2">settings</span>
            Setup Runner
          </a>
          <a class="button-outline w-full" href="{{ "/fr/guides/runner-docker-api-only/" | relative_url }}" target="_blank">
            <span class="material-symbols-outlined text-sm mr-2">description</span>
            Doc
          </a>
        </div>
      </article>
    </div>

    <!-- Runner Setup -->
    <section id="runner" class="rounded-[3rem] bg-surface-container-high border border-outline-variant p-8 md:p-16 mb-24 scroll-mt-24" data-reveal>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <p class="text-xs font-bold text-primary uppercase tracking-widest mb-6">Configuration Avancée</p>
          <h2 class="font-display text-4xl font-black text-on-surface mb-6">Runner Docker pour l'uptime Linux distant.</h2>
          <p class="text-on-surface-variant mb-10 leading-relaxed text-lg">
            Le runner est conçu pour les équipes qui gèrent déjà le bot dans l'application et veulent un runtime navigateur sur un serveur ou un Raspberry Pi.
          </p>
          <ul class="space-y-6">
            <li class="flex items-start gap-4">
              <span class="material-symbols-outlined text-primary">check_circle</span>
              <div>
                <p class="text-on-surface font-bold">Interface Navigateur</p>
                <p class="text-on-surface-variant text-sm">Accédez au panneau de contrôle de votre bot depuis n'importe quel navigateur de votre réseau.</p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <span class="material-symbols-outlined text-primary">check_circle</span>
              <div>
                <p class="text-on-surface font-bold">État Persistant</p>
                <p class="text-on-surface-variant text-sm">Les logs et l'état persistent dans les volumes Docker montés pour des opérations fiables.</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-6">
          <div class="rounded-3xl bg-surface-container-lowest p-6 border border-outline-variant group">
            <p class="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest mb-4">1. Récupérer l'image</p>
            <div class="flex items-center justify-between gap-4">
              <code class="text-primary text-sm font-mono truncate">{{ downloads.runner.commands.pull }}</code>
            </div>
          </div>
          <div class="rounded-3xl bg-surface-container-lowest p-6 border border-outline-variant group">
            <p class="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest mb-4">2. Créer le volume</p>
            <div class="flex items-center justify-between gap-4">
              <code class="text-primary text-sm font-mono truncate">{{ downloads.runner.commands.volume }}</code>
            </div>
          </div>
          <div class="rounded-3xl bg-surface-container-lowest p-6 border border-outline-variant group">
            <p class="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest mb-4">3. Lancer le runner</p>
            <div class="flex items-center justify-between gap-4">
              <code class="text-primary text-sm font-mono break-all">{{ downloads.runner.commands.run }}</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>
