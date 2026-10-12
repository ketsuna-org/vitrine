---
layout: with-sidebar
title: Documentation Bot Creator en français
description: Les pages de la documentation Bot Creator disponibles en français, avec accès à la documentation complète en anglais.
locale: fr
lang: fr
content_language: fr
translation_key: docs-hub-fr
sidebar_context: docs_fr
permalink: /fr/docs/
---
{% assign nav = site.data.docs_nav_fr %}
<div class="mx-auto max-w-[800px]">
  <h1 class="m-0 mb-3 text-4xl font-semibold leading-tight tracking-tight">Documentation en français</h1>
  <p class="mb-8 text-lg leading-relaxed text-on-surface-variant">Une sélection de pages de la documentation, traduites. La documentation complète (plus de 500 fonctions, les blocs, l'API JavaScript) reste pour l'instant en anglais : <a class="text-primary underline underline-offset-2" href="/docs/">ouvrir la documentation complète</a>.</p>

  <h2 class="mb-3 text-2xl font-semibold">Pour commencer</h2>
  <ul class="mb-8 list-disc pl-6 leading-relaxed">
    <li><a class="text-primary underline underline-offset-2" href="/fr/docs/getting-started/">{{ nav.getting_started }}</a></li>
    <li><a class="text-primary underline underline-offset-2" href="/fr/docs/events-and-placeholders/">{{ nav.events }}</a></li>
    <li><a class="text-primary underline underline-offset-2" href="{{ site.data.locales.fr.paths.use_cases }}">{{ site.data.locales.fr.nav.use_cases }}</a></li>
    <li><a class="text-primary underline underline-offset-2" href="{{ site.data.locales.fr.paths.playground }}">Playground</a></li>
  </ul>

  {% for group in nav.groups %}
  <h2 class="mb-3 text-2xl font-semibold">{{ group.title }}</h2>
  <ul class="mb-8 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
    {% for fn in group.pages %}<li><a class="font-mono text-primary underline underline-offset-2" href="/fr/docs/{{ fn.slug }}/">${{ fn.name }}</a></li>{% endfor %}
  </ul>
  {% endfor %}
</div>
