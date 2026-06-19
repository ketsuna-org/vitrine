---
layout: doc
title: $embeddedURL
translation_key: docs
category: "Embeds"
function_name: embeddedURL
syntax: $embeddedURL[url;(embedIndex)]
description: Sets the URL cliquable of the title of an embed. Quand the user clicks on the titre of the embed, it is redirigé vers cette URL.
---
# $embeddedURL

The `$embeddedURL[]` function définit l'**URL cliquable of the title** of an embed. The titre devient a link hypertext.

## Syntax

```
$embeddedURL[url;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `url` | The URL cible (doit commencer par `http://` or `https://`). |
| `embedIndex` | *(Optional)* Index of the embed (1, 2, 3...). Default: 1. |

## Return value

None.

## Behavior

- Le titre of the embed (`$title[]`) devient cliquable.
- Functionne only if a `$title[]` est défini.
- The URL must be valid and accessible.

## Examples

### Embed avec titre cliquable

```bdfd
$title[Rejoignez notre server !]
$embeddedURL[https://discord.gg/example]
$description[Cliquez on the titre pour nous rejoindre.]
$color[#5865F2]
$sendMessage[]
```

### Embed informatif avec link

```bdfd
$title[Voir la documentation]
$embeddedURL[https://docs.example.com]
$description[
Command : **!help**
Catégorie : utilitaires
]
$footer[Documentation officielle]
$color[#57F287]
$sendMessage[]
```

### Multi-embeds avec URLs differentes

```bdfd
$title[Site Web]
$embeddedURL[https://example.com]
$description[Notre site officiel.]
$addEmbed
$title[Discord]
$embeddedURL[https://discord.gg/example;2]
$description[Notre server Discord.]
```

## Notes

- Without `$embeddedURL[]`, le titre of the embed is not cliquable.
- À placer after `$title[]` pour que the URL soit associée.
- Works with all styles d'embed.
