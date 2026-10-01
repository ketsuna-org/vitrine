---
layout: default
title: Download Bot Creator
description: Choose the Bot Creator setup that fits your workflow, from mobile and desktop editing to the Docker runner.
locale: en
translation_key: download
content_language: en
permalink: /download/
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
          Downloads
        </span>
        <span class="inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 border border-outline-variant">
          App first, runner second
        </span>
      </div>
      <h1 class="font-display text-4xl font-black leading-tight text-on-surface md:text-5xl lg:text-6xl mb-5">
        Choose the Bot Creator setup that fits your team.
      </h1>
      <p class="max-w-3xl text-lg leading-relaxed text-on-surface-variant max-w-3xl mb-0">
        Most teams should start with the app on mobile or desktop. The Docker runner is available when you want local workstation control or a longer-lived remote runtime.
      </p>
    </header>

    <!-- Download Grid -->
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24">
      <!-- Mobile -->
      <article class="flex flex-col rounded-xl bg-surface-container-low border border-outline-variant p-6 transition-all hover:border-primary/30 hover:shadow-md" data-reveal>
        <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <svg class="reicon text-3xl" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#smartphone"></use></svg>
        </div>
        <h2 class="mb-3 text-2xl font-bold text-on-surface">Mobile</h2>
        <p class="mb-8 text-on-surface-variant leading-relaxed text-sm">
          Build and review bot logic on the go. Best for creators and moderators who need to act fast.
        </p>
        <div class="mt-auto flex flex-col justify-end gap-3 h-[6.75rem]">
          <a class="button-primary w-full" href="{{ downloads.stores.android_play.url }}" target="_blank">
            <svg class="reicon text-sm mr-2" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#phone_android"></use></svg>
            Google Play
          </a>
          <a class="button-outline w-full" href="{{ downloads.stores.ios_appstore.url }}" target="_blank">
            <svg class="reicon text-sm mr-2" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#phone_iphone"></use></svg>
            App Store
          </a>
        </div>
      </article>

      <!-- Desktop -->
      <article class="flex flex-col rounded-xl bg-surface-container-low border border-outline-variant p-6 transition-all hover:border-primary/30 hover:shadow-md" data-reveal>
        <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <svg class="reicon text-3xl" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#laptop"></use></svg>
        </div>
        <h2 class="mb-3 text-2xl font-bold text-on-surface">Desktop</h2>
        <p class="mb-8 text-on-surface-variant leading-relaxed text-sm">
          A spacious workspace for designing commands and organizing logic on Windows, MacOS, and Linux.
        </p>
        <div class="mt-auto flex flex-col justify-end gap-3 h-[6.75rem]">
          <a class="button-primary w-full" href="{{ downloads.stores.steam.url }}" target="_blank">
            <svg class="reicon text-sm mr-2" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#sports_esports"></use></svg>
            Steam
          </a>
        </div>
      </article>


      <!-- Docker Runner -->
      <article class="flex flex-col rounded-xl bg-surface-container-low border border-outline-variant p-6 transition-all hover:border-primary/30 hover:shadow-md border-primary/20" data-reveal>
        <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <svg class="reicon text-3xl" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#deployed_code"></use></svg>
        </div>
        <h2 class="mb-3 text-2xl font-bold text-on-surface">Docker Runner</h2>
        <p class="mb-8 text-on-surface-variant leading-relaxed text-sm">
          Browser-based runtime for Linux servers, Raspberry Pi, or remote hosts. Designed for uptime.
        </p>
        <div class="mt-auto flex flex-col justify-end gap-3 h-[6.75rem]">
          <a class="button-primary w-full" href="#runner">
            <svg class="reicon text-sm mr-2" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#settings"></use></svg>
            Runner Setup
          </a>
          <a class="button-outline w-full" href="{{ "/guides/runner-docker-api-only/" | relative_url }}" target="_blank">
            <svg class="reicon text-sm mr-2" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#description"></use></svg>
            Docs
          </a>
        </div>
      </article>
    </div>

    <!-- App preview -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24" data-reveal>
      <div class="rounded-xl bg-surface-container-low border border-outline-variant p-6 flex flex-col gap-4">
        <p class="text-xs font-bold text-primary uppercase tracking-widest">Mobile & desktop app</p>
        <h2 class="font-display text-2xl font-bold text-on-surface">Create and host from one workspace</h2>
        <p class="text-on-surface-variant text-sm leading-relaxed">Design commands, manage variables, and monitor bots from the app — the recommended starting point for most teams.</p>
        {% include responsive_screenshot.html screen_id="home" alt="Bot Creator Android workspace with an online Discord bot" class="w-full max-w-[280px] mx-auto drop-shadow-xl" %}
      </div>
      <div class="rounded-xl bg-surface-container-low border border-outline-variant p-6 flex flex-col gap-4">
        <p class="text-xs font-bold text-primary uppercase tracking-widest">Deploy & scale</p>
        <h2 class="font-display text-2xl font-bold text-on-surface">Grow from app hosting to self-hosted runners</h2>
        <p class="text-on-surface-variant text-sm leading-relaxed">Start with managed app hosting, then move to the Docker runner when you need server-side uptime.</p>
        {% include responsive_screenshot.html screen_id="hosting" alt="Bot Creator Android hosting controls for an online Discord bot" class="w-full max-w-[280px] mx-auto drop-shadow-xl" %}
      </div>
    </section>

    <!-- Runner Setup -->
    <section id="runner" class="rounded-xl bg-surface-container-low border border-outline-variant p-8 md:p-16 mb-24 scroll-mt-24 shadow-sm" data-reveal>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <p class="text-xs font-bold text-primary uppercase tracking-widest mb-6">Advanced Setup</p>
          <h2 class="font-display text-4xl font-black text-on-surface mb-6">Docker runner for remote Linux uptime.</h2>
          <p class="text-on-surface-variant mb-10 leading-relaxed text-lg">
            The runner is designed for teams that already manage the bot in the app and want a browser-based runtime on a server or Raspberry Pi.
          </p>
          <ul class="space-y-6">
            <li class="flex items-start gap-4">
              <svg class="reicon text-primary" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#check_circle"></use></svg>
              <div>
                <p class="text-on-surface font-bold">Browser-based runtime</p>
                <p class="text-on-surface-variant text-sm">Access your bot control panel from any browser on your network.</p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <svg class="reicon text-primary" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#check_circle"></use></svg>
              <div>
                <p class="text-on-surface font-bold">Persistent state</p>
                <p class="text-on-surface-variant text-sm">Logs and state persist in mounted Docker volumes for reliable operations.</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-6">
          <!-- Step 1 -->
          <div class="rounded-xl bg-surface-container p-6 border border-outline-variant flex flex-col justify-between">
            <div>
              <p class="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest mb-3">1. Pull the image</p>
              <div class="bg-surface-container-low rounded-lg p-3 border border-outline-variant overflow-x-auto mb-3">
                <code class="text-primary text-sm font-mono whitespace-nowrap">{{ downloads.runner.commands.pull }}</code>
              </div>
            </div>
            <button data-copy="{{ downloads.runner.commands.pull }}" data-copy-success="Copied!" class="button-outline !h-10 !px-4 text-xs font-bold w-fit flex items-center gap-2 self-end">
              <svg class="reicon text-sm" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#content_copy"></use></svg>
              <span>Copy</span>
            </button>
          </div>

          <!-- Step 2 -->
          <div class="rounded-xl bg-surface-container p-6 border border-outline-variant flex flex-col justify-between">
            <div>
              <p class="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest mb-3">2. Create the volume</p>
              <div class="bg-surface-container-low rounded-lg p-3 border border-outline-variant overflow-x-auto mb-3">
                <code class="text-primary text-sm font-mono whitespace-nowrap">{{ downloads.runner.commands.volume }}</code>
              </div>
            </div>
            <button data-copy="{{ downloads.runner.commands.volume }}" data-copy-success="Copied!" class="button-outline !h-10 !px-4 text-xs font-bold w-fit flex items-center gap-2 self-end">
              <svg class="reicon text-sm" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#content_copy"></use></svg>
              <span>Copy</span>
            </button>
          </div>

          <!-- Step 3 -->
          <div class="rounded-xl bg-surface-container p-6 border border-outline-variant flex flex-col justify-between">
            <div>
              <p class="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest mb-3">3. Start the runner</p>
              <div class="bg-surface-container-low rounded-lg p-3 border border-outline-variant overflow-x-auto mb-3">
                <code class="text-primary text-sm font-mono whitespace-nowrap">{{ downloads.runner.commands.run }}</code>
              </div>
            </div>
            <button data-copy="{{ downloads.runner.commands.run }}" data-copy-success="Copied!" class="button-outline !h-10 !px-4 text-xs font-bold w-fit flex items-center gap-2 self-end">
              <svg class="reicon text-sm" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#content_copy"></use></svg>
              <span>Copy</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
