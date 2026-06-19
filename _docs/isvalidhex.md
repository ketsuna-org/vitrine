---
layout: doc
title: $isValidHex
translation_key: docs
category: "Math & Text"
function_name: isValidHex
syntax: $isValidHex[value]
description: Checks if une string est un code couleur hexadecimal valid.
---

# $isValidHex

The function `$isValidHex[value]` **vérifie if ae string est un code couleur hexadecimal valid** au format `#RRGGBB` (or `RRGGBB` without the dièse).

## Syntax

```
$isValidHex[value]
```

## Parameters

| Parameter | Description |
|---|---|
| `value` | La string à tester, avec or without the préfixe `#`. |

## Return Value

- **Type** : Boolean
- `true` if the string est un hexadecimal 6-becauseactères valid (0-9, A-F).
- `false` if the string contains des becauseactères invalids, est trop courte/longue, or vide.

## Behavior

- Accepte `#RRGGBB` and `RRGGBB` (6 becauseactères hexadécimaux).
- Les lettres sont insensibles à la casse (A-F or a-f).
- Ne valid pas les formats courts (`#FFF`).
- Ne valid pas les formats avec alpha (`#RRGGBBAA`).

## Examples

### Validation before utilisation

```bdfd
$var[couleur;$message[1]]
$if[$isValidHex[$var[couleur]]==true]
  $embedAddField[Couleur;$var[couleur];yes]
  $color[$var[couleur]]
  $sendMessage[✅ Embed with the couleur $var[couleur].]
$else
  $sendMessage[❌ Couleur invalid. Format attendu : #RRGGBB]
$endif
```

### Command de role coloré

```bdfd
$var[couleur;$message[1]]
$if[$isValidHex[$var[couleur]]==true]
  $modifyRole[$roleID[Couleur];color;$var[couleur]]
  $sendMessage[🎨 The color of the role was changée en $var[couleur] !]
$else
  $sendMessage[❌ Format invalid. Example: !couleur #FF5733]
$endif
```

### Palette interactive

```bdfd
$var[hex;$message[1]]
$if[$isValidHex[$var[hex]]==true]
  $title[🎨 Aperçu couleur]
  $description[**Hex :** $var[hex]]
  $color[$var[hex]]
  $addTimestamp[]
  $sendMessage[]
$else
  $sendMessage[❌ Format hex invalid. Usage : !couleur #5865F2]
$endif
```

## Notes

- `$isValidHex[#FF0000]` retourne `true`.
- `$isValidHex[ff0000]` retourne `true`.
- `$isValidHex[#FFF]` retourne `false` (format court non supporté).
- `$isValidHex[#GG0000]` retourne `false` (G is not hex).
- `$isValidHex[]` (vide) retourne `false`.
