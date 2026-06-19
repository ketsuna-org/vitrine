---
layout: doc
title: $guildBanner[]
translation_key: docs
category: "Entity Info"
function_name: guildBanner
syntax: $guildBanner
description: Alias de $serverBanner. Retourne l'URL de la bannière du serveur Discord (nécessite le niveau de boost 2+).
parameters: []
returns:
  type: string
  description: L'URL de la bannière du serveur, ou une chaîne vide si non disponible.
related:
  - $serverBanner
  - $guildIcon
  - $serverIcon
  - $boostLevel
examples:
  - description: Bannière dans un embed
    code: |
      $title[$guildName]
      $image[$guildBanner]
      $color[#5865F2]
      $sendEmbedMessage
  - description: Vérifier si une bannière existe
    code: |
      $if[$guildBanner==]
      $sendMessage[Pas de bannière.]
      $endif
---

# $guildBanner[] — Bannière du Serveur (Alias)

`$guildBanner[]` est un alias de `$serverBanner[]`. Il retourne l'URL de la bannière du serveur Discord.

> **Prérequis** : Niveau de boost 2 ou plus requis.

## Syntaxe

```
$guildBanner
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- L'URL de la bannière, ou une chaîne vide si non disponible.

## Utilisation

### Embed avec bannière

```bdfd
$title[$guildName]
$description[$serverDescription]
$image[$guildBanner]
$thumbnail[$guildIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Fallback icône si pas de bannière

```bdfd
$if[$guildBanner!=]
$var[headerImage;$guildBanner]
$else
$var[headerImage;$guildIcon]
$endif
$title[$guildName]
$image[$var[headerImage]]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- `$guildBanner[]` et `$serverBanner[]` sont interchangeables.
- La bannière est une image horizontale (ratio ~16:9) affichée en haut de la liste des salons.
- Si le serveur n'a pas le niveau requis, la fonction retourne une chaîne vide.
