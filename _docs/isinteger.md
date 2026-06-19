---
layout: doc
title: $isInteger
translation_key: docs
category: "Math & Text"
function_name: isInteger
syntax: $isInteger[value]
description: Checks if une value est un integer (positif, négatif or zéro).
---

# $isInteger

The function `$isInteger[value]` **vérifie if ae value est un integer** (without decimale). Elle accepte les integers positifs, négatifs and zéro.

## Syntax

```
$isInteger[value]
```

## Parameters

| Parameter | Description |
|---|---|
| `value` | The value à tester. |

## Return Value

- **Type** : Boolean
- `true` si `value` est un integer (ex: `42`, `-7`, `0`)
- `false` si `value` est un decimal, du text, or vide.

## Behavior

- Les numbers à virgule (`3.14`, `2.0`) retournent `false`.
- Les integers en notation scientifique are not reconnus.
- `0` est un integer valid.
- Les espaces autour du number peuvent invalidr le test.

## Examples

### Validation d'un parameter

```bdfd
$if[$isInteger[$message[1]]==true]
  $sendMessage[✅ $message[1] est un integer valid.]
$else
  $sendMessage[❌ Veuillez fournir un integer.]
$endif
```

### Pagination (validation)

```bdfd
$var[page;$message[1]]
$if[$isInteger[$var[page]]==true]
  $if[$var[page]>=1]
    $sendMessage[📄 Affichage de la page $var[page]...]
  $else
    $sendMessage[❌ La page must be >= 1.]
  $endif
$else
  $sendMessage[❌ Parameter invalid. Usage: !page <number>]
$endif
```

### Compteur custom

```bdfd
$var[number;$message[1]]
$if[$isInteger[$var[number]]==true]
  $for[i;1;$var[number];1]
    Compteur : $for[i]
  $endfor
$else
  $sendMessage[Veuillez entrer un integer.]
$endif
```

## Notes

- `$isInteger[42]` retourne `true`.
- `$isInteger[-10]` retourne `true`.
- `$isInteger[3.14]` retourne `false`.
- `$isInteger[abc]` retourne `false`.
- Pour accepter also les décimaux, utilisez `$isNumber[]`.
