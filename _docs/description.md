---
layout: doc
title: $description[]
translation_key: docs
category: "Embed & Message"
function_name: description
syntax: $description[text;(embedIndex)]
description: Sets the corps principal (description) of a Discord embed. This is la zone de text main, située sous le titre.
---

# $description[]

The `$description[]` function définit le **corps principal** (description) of a Discord embed. This is la zone de text main of the embed, displayede sous le titre.

## Syntax

```
$description[text;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Le text de la description. Supporte le markdown Discord, les sauts de ligne, les emojis and the interpolation de functions/variables BDFD. |
| `embedIndex` | Optional. Index of the embed to modify (0 by default). |

## Return value

Cette function returns nothing : elle modifie the response in progress de construction. The embed is sent via `$sendMessage[]`.

## Behavior

- `$description[]` est une **response mutation**.
- La description est le cœur of the content of the embed : this is ici que vous placez l'essentiel de votre text.
- Longueur maximale : **4096 becauseactères**.
- If the text est vide, la description ne will be pas displayede.

## Examples

### Description simple

```bdfd
$title[Informations]
$description[Voici les informations demandées. Use les buttons ci-dessous pour naviguer.]
$color[#5865F2]
$sendMessage[]
```

### Description multi-lignes avec markdown

```bdfd
$title[Règles of the server]
$description[
**Règles of the server :**
1. Respectez les autres members
2. Pas de spam
3. Pas de contenu NSFW

*Merci de votre compréhension !*
]
$color[#ED4245]
$sendMessage[]
```

### Description avec variables dynamics

```bdfd
$title[Profil]
$description[
**Nom :** $username
**ID :** $authorID
**Date d'inscription :** $creationDate[$authorID]
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- La description supporte le markdown complete de Discord : `**gras**`, `*italique*`, `__souligné__`, `~~barré~~`, lists, blocs de code, etc.
- Pour structurer des informations complexs, combinez `$description[]` avec `$addField[]`.
