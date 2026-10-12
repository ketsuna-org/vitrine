---
layout: playground
title: Playground bot Discord, essayez les blocs et BDFD dans votre navigateur
description: Modifiez des blocs Bot Creator ou collez un extrait BDFD et voyez le message Discord qu'il afficherait. Tout se passe dans votre navigateur, rien n'est envoyé et rien n'est exécuté.
locale: fr
lang: fr
translation_key: playground
content_language: fr
permalink: /fr/playground/
---

# Playground

Modifiez, et l'aperçu Discord change aussitôt. Tout se passe dans votre navigateur : rien n'est envoyé et rien n'est exécuté.

<div class="bp-row mb-4" role="tablist">
  <button class="bp-btn bp-primary" type="button" role="tab" data-pg-tab="blocks" aria-selected="true">Blocs</button>
  <button class="bp-btn" type="button" role="tab" data-pg-tab="bdfd" aria-selected="false">BDFD</button>
</div>

<section data-pg-panel="blocks" markdown="1">

Ajoutez des blocs, remplissez leurs champs et voyez le message qu'ils enverraient. Les blocs et leurs champs sont ceux de l'application, avec leurs noms français ([Dictionnaire des blocs](/docs/blocks-dictionary/), en anglais). Les aides détaillées des champs restent en anglais, comme dans l'application.

<div id="blocks-playground" class="bp-root"><noscript>Le playground a besoin de JavaScript.</noscript></div>

**Ce qui est simulé.** L'aperçu dessine le message des blocs *Répondre avec un message* et *Envoyer un message* (texte, embeds, réponse privée) avec des valeurs d'exemple pour `((user.username))`, `((guild.name))` et quelques autres. Tous les autres blocs sont modifiables et exportés, mais n'ont aucun effet visible ici. Les sous-éditeurs (composants, blocs imbriqués…) sont affichés mais pas modifiables. C'est une approximation de Discord, pas le moteur.

</section>

<section data-pg-panel="bdfd" hidden markdown="1">

Tapez ou collez un extrait BDFD / BDScript.

<div id="bdfd-playground" class="bp-root"><noscript>Le playground a besoin de JavaScript.</noscript></div>

**Ce qui est simulé.** L'aperçu se contente de *lire* l'extrait : il dessine le texte du message, l'embed (`$title`, `$description`, `$color`, `$addField`, `$footer`, `$author`, `$thumbnail`, `$image`), les boutons, les menus de sélection, `$ephemeral` et les fichiers joints. `$username`, `$guildName` et les fonctions semblables sont remplacés par des valeurs d'exemple. Les autres fonctions ne sont **pas exécutées** ; l'aperçu affiche seulement une ligne de confirmation générique. C'est une approximation de Discord, pas le moteur.

</section>
