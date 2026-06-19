---
layout: doc
title: $description[]
translation_key: docs
category: "Embed & Message"
function_name: description
syntax: $description[text;(embedIndex)]
description: Sets the corps principal (description) of a Discord embed. This is la zone of text main, située sous le titre.
---

# $description[]

The `$description[]` function définit le **corps principal** (description) of a Discord embed. This is la zone of text main of the embed, displayede sous le titre.

## Syntax

```
$description[text;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Le text of la description. Supports the markdown Discord, les sauts of ligne, les emojis and the interpolation of functions/variables BDFD. |
| `embedIndex` | Optional. Index of the embed to modify (0 by default). |

## Return value

Cette function returns nothing : elle modifie the response in progress of construction. The embed is sent via `$sendMessage[]`.

## Behavior

- `$description[]` est une **response mutation**.
- La description est le cœur of the content of the embed : this is ici que vous placez l'essentiel of votre text.
- Longueur maximale : **4096 becauseactères**.
- If the text est vide, la description ne will be pas displayede.

## Examples

### Description simple

```bdfd
$title[Informations]
$description[Voici les information demandées. Use les buttons ci-dessous pour naviguer.]
$color[#5865F2]
$sendMessage[]
```

### Description multi-lignes with markdown

```bdfd
$title[Règles of the server]
$description[
**Règles of the server :**
1. Respectez les autres members
2. Pas of spam
3. Pas of contenu NSFW

*Merci of votre compréhension !*
]
$color[#ED4245]
$sendMessage[]
```

### Description with variables dynamics

```bdfd
$title[Profil]
$description[
**Nom :** $username
**ID :** $authorID
**Date of inscription :** $creationDate[$authorID]
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- La description supporte le markdown complete of Discord : `**gras**`, `*italique*`, `__souligné__`, `~~barré~~`, lists, blocs of code, etc.
- Pour structure information complexs, combinez `$description[]` with `$addField[]`.
