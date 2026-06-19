---
layout: doc
title: $isNumber
translation_key: docs
category: "Math & Text"
function_name: isNumber
syntax: $isNumber[value]
description: Checks if une value est un number (integer or decimal, positif or négatif).
---

# $isNumber

The function `$isNumber[value]` **vérifie if ae value est un number**, qu'il soit integer, decimal, positif or négatif. Plus permissive que `$isInteger[]`.

## Syntax

```
$isNumber[value]
```

## Parameters

| Parameter | Description |
|---|---|
| `value` | The value à tester. |

## Return Value

- **Type** : Boolean
- `true` si `value` est un number (ex: `42`, `-7`, `3.14`, `0.001`)
- `false` si `value` est du text, un boolean, or vide.

## Behavior

- Accepte les integers and les décimaux.
- Accepte les numbers négatifs.
- N'accepte pas la notation scientifique (`1e5`).
- N'accepte pas les separators de milliers (`1,000`).

## Examples

### Validation d'un prix

```bdfd
$var[prix;$message[1]]
$if[$isNumber[$var[prix]]==true]
  $if[$var[prix]>=0]
    $var[taxe;$math[$var[prix]*0.2]]
    $sendMessage[💰 Prix: $var[prix]€ | TVA: $var[taxe]€ | Total: $math[$var[prix]+$var[taxe]]€]
  $else
    $sendMessage[❌ Le prix must be positif.]
  $endif
$else
  $sendMessage[❌ Veuillez entrer un number valid.]
$endif
```

### Calculatrice simple

```bdfd
$var[a;$message[1]]
$var[b;$message[2]]
$if[$isNumber[$var[a]]==true&&$isNumber[$var[b]]==true]
  $sendMessage[📊 $var[a] + $var[b] = $math[$var[a]+$var[b]]]
  $sendMessage[📊 $var[a] × $var[b] = $math[$var[a]*$var[b]]]
$else
  $sendMessage[❌ Veuillez entrer two numbers valids.]
$endif
```

### Détection de type complete

```bdfd
$var[val;$message[1]]
$if[$isInteger[$var[val]]==true]
  $sendMessage[🔢 Integer]
$elseif[$isNumber[$var[val]]==true]
  $sendMessage[🔣 Decimal number]
$elseif[$isBoolean[$var[val]]==true]
  $sendMessage[📌 Boolean]
$else
  $sendMessage[📝 Text]
$endif
```

## Notes

- `$isNumber[42]` retourne `true`.
- `$isNumber[3.14]` retourne `true`.
- `$isNumber[-5.5]` retourne `true`.
- `$isNumber[true]` retourne `false`.
- Pour n'accepter que les integers, utilisez `$isInteger[]`.
