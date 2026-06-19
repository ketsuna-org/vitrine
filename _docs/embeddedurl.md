---
layout: doc
title: $embeddedURL
translation_key: docs
category: "Embeds"
function_name: embeddedURL
syntax: $embeddedURL[url;(embedIndex)]
description: Définit l'URL cliquable du titre d'un embed. Quand l'utilisateur clique sur le titre de l'embed, il est redirigé vers cette URL.
---
# $embeddedURL

La fonction `$embeddedURL[]` définit l'**URL cliquable du titre** d'un embed. Le titre devient un lien hypertexte.

## Syntaxe

```
$embeddedURL[url;(embedIndex)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `url` | L'URL cible (doit commencer par `http://` ou `https://`). |
| `embedIndex` | *(Optionnel)* Index de l'embed (1, 2, 3...). Défaut : 1. |

## Valeur de retour

Aucune.

## Comportement

- Le titre de l'embed (`$title[]`) devient cliquable.
- Fonctionne uniquement si un `$title[]` est défini.
- L'URL doit être valide et accessible.

## Exemples

### Embed avec titre cliquable

```bdfd
$title[Rejoignez notre serveur !]
$embeddedURL[https://discord.gg/exemple]
$description[Cliquez sur le titre pour nous rejoindre.]
$color[#5865F2]
$sendMessage[]
```

### Embed informatif avec lien

```bdfd
$title[Voir la documentation]
$embeddedURL[https://docs.exemple.com]
$description[
Commande : **!help**
Catégorie : utilitaires
]
$footer[Documentation officielle]
$color[#57F287]
$sendMessage[]
```

### Multi-embeds avec URLs différentes

```bdfd
$title[Site Web]
$embeddedURL[https://exemple.com]
$description[Notre site officiel.]
$addEmbed
$title[Discord]
$embeddedURL[https://discord.gg/exemple;2]
$description[Notre serveur Discord.]
```

## Notes

- Sans `$embeddedURL[]`, le titre de l'embed n'est pas cliquable.
- À placer après `$title[]` pour que l'URL soit associée.
- Fonctionne avec tous les styles d'embed.
