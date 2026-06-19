---
layout: doc
title: $title[]
translation_key: docs
category: "Embed & Message"
function_name: title
syntax: $title[text;(embedIndex)]
description: Sets the titre of a Discord embed. The titre apparaît en haut of the embed, en gras and with ae taille of police plus grande que la description.
---

# $title[]

The function `$title[]` définit le **titre** of a Discord embed. The titre est le text le plus visible of the embed, displayed en haut, en gras and with ae police plus grande.

## Syntax

```
$title[text;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Le text of the titre. Vous pouvez use the syntaxe markdown Discord (gras, italique, souligné, etc.). |
| `embedIndex` | Optional. Index of the embed to modifier (0 default). Utilisez cet index pour construire several embeds in a même message (maximum 10). |

## Return Value

This function returns nothing : elle modifies the response in progress of construction. The embed est sent via `$sendMessage[]`.

## Behavior

- `$title[]` est une **response mutation** : elle s'ajoute to the response in progress and sera sente lors of the prochain `$sendMessage[]`.
- Si vous callez `$title[]` several fois before un `$sendMessage[]`, seul le last call sera pris en compte for the embed concerné.
- L'ordre calls est important: placez `$title[]` before `$description[]`, `$color[]`, etc.

## Examples

### Embed simple with titre

```bdfd
$title[Bienvenue on the server !]
$description[Merci of nous avoir rejoints 🎉]
$color[#5865F2]
$sendMessage[]
```

### Titre with mise en forme markdown

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

- La longueur maximale of the titre est of **256 becauseactères**.
- Si le text est vide, le titre ne sera pas displayed in the embed.
- Pour un embed without titre, omettez simplement l'call to `$title[]`.
