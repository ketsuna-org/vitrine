---
layout: doc
title: $color[]
translation_key: docs
category: "Embed & Message"
function_name: color
syntax: $color[hexColor;(embedIndex)]
description: Sets the couleur de la barre latérale gauche of a Discord embed. The color can be spécifiée en hexadecimal or en integer decimal.
---

# $color[]

The `$color[]` function définit la **couleur** de la barre latérale gauche of a Discord embed. Cette barre colorée allows catégoriser visually vos embeds (success, error, info, etc.).

## Syntax

```
$color[hexColor;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `hexColor` | Code couleur in the format hexadecimal (`FF0000`, `#5865F2`) or integer decimal. |
| `embedIndex` | Optional. Index of the embed to modify (0 by default). |

## Return value

Cette function returns nothing : elle modifie the response in progress de construction.

## Formats acceptés

| Format | Example | Result |
|---|---|---|
| Hexadecimal avec # | `#5865F2` | Bleu Discord |
| Hexadecimal without # | `5865F2` | Bleu Discord |
| Integer decimal | `5793266` | Bleu Discord |

## Couleurs courantes

| Nom | Code hex | Integer |
|---|---|---|
| Bleu Discord | `#5865F2` | 5793266 |
| Rouge | `#ED4245` | 15548997 |
| Vert | `#57F287` | 5763719 |
| Jaune | `#FEE75C` | 16705372 |
| Orange | `#F26522` | 15878690 |
| Blanc | `#FFFFFF` | 16777215 |
| Noir | `#000000` | 0 |

## Examples

### Embed bleu (information)

```bdfd
$title[Information]
$description[Votre profil has been mis à day.]
$color[#5865F2]
$sendMessage[]
```

### Embed rouge (error)

```bdfd
$title[Error]
$description[Vous n'avez pas the permission d'utiliser cette command.]
$color[#ED4245]
$sendMessage[]
```

### Embed vert (success)

```bdfd
$title[Success]
$description[L'opération has been effectuée avec success !]
$color[#57F287]
$sendMessage[]
```

## Notes

- Si `$color[]` is not callé, the embed n'aura no barre de couleur (barre transparente).
- Le préfixe `#` is optional.
- Les lettres hexadecimales are not sensibles à la casse : `#ff0000` équivaut à `#FF0000`.
