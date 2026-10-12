---
layout: default
title: Télécharger Bot Creator pour Discord
description: Installez Bot Creator depuis Google Play, l'App Store ou Steam, ou faites tourner vos bots en continu avec le runner Docker.
locale: fr
lang: fr
translation_key: download
content_language: fr
permalink: /fr/download/
---
{% assign downloads = site.data.downloads %}
{% assign t = site.data.locales[page.locale] %}

<div class="min-h-screen py-10 lg:py-16 bg-background">
  <div class="mx-auto max-w-7xl px-6">
    <!-- Header -->
    <header class="mb-10" data-reveal>
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <span class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary border border-primary/20">
          <svg class="reicon text-sm" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#download"></use></svg>
          Téléchargements
        </span>
        <span class="inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 border border-outline-variant">
          L'app d'abord, le runner ensuite
        </span>
      </div>
      <h1 class="font-display text-4xl font-semibold leading-tight text-on-surface md:text-5xl lg:text-5xl mb-5">
        Choisissez l'installation de Bot Creator qui convient à votre équipe.
      </h1>
      <p class="max-w-3xl text-lg leading-relaxed text-on-surface-variant max-w-3xl mb-0">
        La plupart des équipes devraient commencer par l'app sur mobile ou ordinateur. Le runner Docker est là quand vous voulez le contrôle d'un poste local ou un environnement distant qui dure plus longtemps.
      </p>
    </header>

    <!-- Download Grid -->
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24">
      <!-- Mobile -->
      <article class="flex flex-col rounded-lg bg-surface-container-low border border-outline-variant p-6 transition-all hover:border-primary/30 hover:" data-reveal>
        <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <svg class="reicon text-3xl" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#smartphone"></use></svg>
        </div>
        <h2 class="mb-3 text-2xl font-bold text-on-surface">Mobile</h2>
        <p class="mb-8 text-on-surface-variant leading-relaxed text-sm">
          Construisez et relisez la logique de votre bot en déplacement. Idéal pour les créateurs et modérateurs qui doivent agir vite.
        </p>
        <div class="mt-auto flex flex-col justify-end gap-3 h-[6.75rem]">
          <a class="button-primary w-full" href="{{ downloads.stores.android_play.url }}" target="_blank" rel="noopener noreferrer">
            <svg class="reicon text-sm mr-2" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#phone_android"></use></svg>
            Google Play
          </a>
          <a class="button-outline w-full" href="{{ downloads.stores.ios_appstore.url }}" target="_blank" rel="noopener noreferrer">
            <svg class="reicon text-sm mr-2" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#phone_iphone"></use></svg>
            App Store
          </a>
        </div>
      </article>

      <!-- Desktop -->
      <article class="flex flex-col rounded-lg bg-surface-container-low border border-outline-variant p-6 transition-all hover:border-primary/30 hover:" data-reveal>
        <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <svg class="reicon text-3xl" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#laptop"></use></svg>
        </div>
        <h2 class="mb-3 text-2xl font-bold text-on-surface">Ordinateur</h2>
        <p class="mb-8 text-on-surface-variant leading-relaxed text-sm">
          Un espace de travail confortable pour concevoir vos commandes et organiser votre logique sur Windows, macOS et Linux.
        </p>
        <div class="mt-auto flex flex-col justify-end gap-3 h-[6.75rem]">
          <a class="button-primary w-full" href="{{ downloads.stores.steam.url }}" target="_blank" rel="noopener noreferrer">
            <svg class="reicon text-sm mr-2" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#sports_esports"></use></svg>
            Steam
          </a>
        </div>
      </article>


      <!-- Docker Runner -->
      <article class="flex flex-col rounded-lg bg-surface-container-low border border-outline-variant p-6 transition-all hover:border-primary/30 hover: border-primary/20" data-reveal>
        <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <svg class="reicon text-3xl" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#deployed_code"></use></svg>
        </div>
        <h2 class="mb-3 text-2xl font-bold text-on-surface">Docker Runner</h2>
        <p class="mb-8 text-on-surface-variant leading-relaxed text-sm">
          Environnement d'exécution accessible depuis un navigateur, pour serveurs Linux, Raspberry Pi ou hôtes distants. Conçu pour rester en ligne.
        </p>
        <div class="mt-auto flex flex-col justify-end gap-3 h-[6.75rem]">
          <a class="button-primary w-full" href="#runner">
            <svg class="reicon text-sm mr-2" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#settings"></use></svg>
            Installer le runner
          </a>
          <a class="button-outline w-full" href="{{ "/guides/runner-docker-api-only/" | relative_url }}" target="_blank" rel="noopener noreferrer">
            <svg class="reicon text-sm mr-2" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#description"></use></svg>
            Guide (en anglais)
          </a>
        </div>
      </article>
    </div>

    <!-- App preview -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24" data-reveal>
      <div class="rounded-lg bg-surface-container-low border border-outline-variant p-6 flex flex-col gap-4">
        <p class="text-xs font-bold text-primary uppercase tracking-widest">App mobile et ordinateur</p>
        <h2 class="font-display text-2xl font-bold text-on-surface">Créez et hébergez depuis un seul espace de travail</h2>
        <p class="text-on-surface-variant text-sm leading-relaxed">Concevez vos commandes, gérez vos variables et surveillez vos bots depuis l'app : le point de départ recommandé pour la plupart des équipes.</p>
        {% include responsive_screenshot.html screen_id="home" alt="Espace de travail Bot Creator sur Android avec un bot Discord en ligne" class="w-full max-w-[280px] mx-auto drop-shadow-xl" %}
      </div>
      <div class="rounded-lg bg-surface-container-low border border-outline-variant p-6 flex flex-col gap-4">
        <p class="text-xs font-bold text-primary uppercase tracking-widest">Déployer et passer à l'échelle</p>
        <h2 class="font-display text-2xl font-bold text-on-surface">Passez de l'hébergement dans l'app aux runners auto-hébergés</h2>
        <p class="text-on-surface-variant text-sm leading-relaxed">Commencez avec l'hébergement depuis l'app, puis passez au runner Docker quand vous avez besoin d'une disponibilité côté serveur.</p>
        {% include responsive_screenshot.html screen_id="hosting" alt="Commandes d'hébergement de Bot Creator sur Android pour un bot Discord en ligne" class="w-full max-w-[280px] mx-auto drop-shadow-xl" %}
      </div>
    </section>

    <!-- Runner Setup -->
    <section id="runner" class="rounded-lg bg-surface-container-low border border-outline-variant p-8 md:p-16 mb-24 scroll-mt-24 shadow-sm" data-reveal>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <p class="text-xs font-bold text-primary uppercase tracking-widest mb-6">Installation avancée</p>
          <h2 class="font-display text-4xl font-semibold text-on-surface mb-6">Le runner Docker pour un bot disponible sur un serveur Linux.</h2>
          <p class="text-on-surface-variant mb-10 leading-relaxed text-lg">
            Le runner s'adresse aux équipes qui gèrent déjà leur bot dans l'app et veulent un environnement d'exécution accessible depuis un navigateur, sur un serveur ou un Raspberry Pi.
          </p>
          <ul class="space-y-6">
            <li class="flex items-start gap-4">
              <svg class="reicon text-primary" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#check_circle"></use></svg>
              <div>
                <p class="text-on-surface font-bold">Accessible depuis un navigateur</p>
                <p class="text-on-surface-variant text-sm">Accédez au panneau de contrôle de votre bot depuis n'importe quel navigateur de votre réseau.</p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <svg class="reicon text-primary" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#check_circle"></use></svg>
              <div>
                <p class="text-on-surface font-bold">État persistant</p>
                <p class="text-on-surface-variant text-sm">Les journaux et l'état sont conservés dans des volumes Docker montés pour des opérations fiables.</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-6">
          <!-- Step 1 -->
          <div class="rounded-lg bg-surface-container p-6 border border-outline-variant flex flex-col justify-between">
            <div>
              <p class="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest mb-3">1. Récupérer l'image</p>
              <div class="bg-surface-container-low rounded-lg p-3 border border-outline-variant overflow-x-auto mb-3">
                <code class="text-primary text-sm font-mono whitespace-nowrap">{{ downloads.runner.commands.pull }}</code>
              </div>
            </div>
            <button data-copy="{{ downloads.runner.commands.pull }}" data-copy-success="Copié !" class="button-outline !h-10 !px-4 text-xs font-bold w-fit flex items-center gap-2 self-end">
              <svg class="reicon text-sm" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#content_copy"></use></svg>
              <span>Copier</span>
            </button>
          </div>

          <!-- Step 2 -->
          <div class="rounded-lg bg-surface-container p-6 border border-outline-variant flex flex-col justify-between">
            <div>
              <p class="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest mb-3">2. Créer le volume</p>
              <div class="bg-surface-container-low rounded-lg p-3 border border-outline-variant overflow-x-auto mb-3">
                <code class="text-primary text-sm font-mono whitespace-nowrap">{{ downloads.runner.commands.volume }}</code>
              </div>
            </div>
            <button data-copy="{{ downloads.runner.commands.volume }}" data-copy-success="Copié !" class="button-outline !h-10 !px-4 text-xs font-bold w-fit flex items-center gap-2 self-end">
              <svg class="reicon text-sm" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#content_copy"></use></svg>
              <span>Copier</span>
            </button>
          </div>

          <!-- Step 3 -->
          <div class="rounded-lg bg-surface-container p-6 border border-outline-variant flex flex-col justify-between">
            <div>
              <p class="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest mb-3">3. Démarrer le runner</p>
              <div class="bg-surface-container-low rounded-lg p-3 border border-outline-variant overflow-x-auto mb-3">
                <code class="text-primary text-sm font-mono whitespace-nowrap">{{ downloads.runner.commands.run }}</code>
              </div>
            </div>
            <button data-copy="{{ downloads.runner.commands.run }}" data-copy-success="Copié !" class="button-outline !h-10 !px-4 text-xs font-bold w-fit flex items-center gap-2 self-end">
              <svg class="reicon text-sm" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#content_copy"></use></svg>
              <span>Copier</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
