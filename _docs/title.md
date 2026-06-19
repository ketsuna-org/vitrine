---
layout: doc
title: $title[]
translation_key: docs
category: "Embed & Message"
function_name: title
syntax: $title[text;(embedIndex)]
description: Sets the titre of an embed Discord. The titre apparaît en haut of the embed, en gras and with ae taille de police plus grande que la description.
---

# $title[]

The function `$title[]` définit le **titre** of an embed Discord. The titre est le text le plus visible of the embed, displayed en haut, en gras and with ae police plus grande.

## Syntax

```
$title[text;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Le text du titre. Vous pouvez utiliser la syntaxe markdown Discord (gras, italique, souligné, etc.). |
| `embedIndex` | Optional. Index of the embed à modifier (0 default). Utilisez cet index pour construire several embeds dans un même message (maximum 10). |

## Return Value

This function returns nothing : elle modifies the response in progress de construction. The embed est sent via `$sendMessage[]`.

## Behavior

- `$title[]` est une **response mutation** : elle s'ajoute à the response in progress and sera sente lors du prochain `$sendMessage[]`.
- Si vous callez `$title[]` several fois before un `$sendMessage[]`, seul le last call sera pris en compte for the embed concerné.
- L'ordre des calls est important: placez `$title[]` before `$description[]`, `$color[]`, etc.

## Examples

### Embed simple avec titre

```bdfd
$title[Bienvenue on the server !]
$description[Merci de nous avoir rejoints 🎉]
$color[#5865F2]
$sendMessage[]
```

### Titre avec mise en forme markdown

```bdfd
$title[**Annonce importante** — *À lire absolument* 📢]
$description[Voici les lasts news of the server.]
$color[#FF0000]
$sendMessage[]
```

### Multi-embed : titres differents for each embed

```bdfd
$title[Premier embed;0]
$description[Content of the first embed;0]
$color[#5865F2;0]

$title[Deuxième embed;1]
$description[Content of the twoième embed;1]
$color[#57F287;1]

$sendMessage[]
```

## Notes

- La longueur maximale du titre est de **256 becauseactères**.
- Si le text est vide, le titre ne sera pas displayed in the embed.
- Pour un embed without titre, omettez simplement l'call à `$title[]`.
