---
layout: doc
title: $isNumber
translation_key: docs
category: "Math & Text"
function_name: isNumber
syntax: $isNumber[value]
description: Vérifie si une valeur est un nombre (entier ou décimal, positif ou négatif).
parameters:
  - name: value
    description: La valeur à tester.
returns:
  - type: boolean
    description: true si la valeur est un nombre, false sinon.
related:
  - $isBoolean
  - $isInteger
  - $isValidHex
examples:
  - description: Tester un décimal
    code: |
      $if[$isNumber[3.14]==true]
        $sendMessage[C'est un nombre !]
      $endif
  - description: Tester du texte
    code: |
      $if[$isNumber[hello]==false]
        $sendMessage[Ce n'est pas un nombre.]
      $endif
---

# $isNumber

La fonction `$isNumber[value]` **vérifie si une valeur est un nombre**, qu'il soit entier, décimal, positif ou négatif. Plus permissive que `$isInteger[]`.

## Syntaxe

```
$isNumber[value]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `value` | La valeur à tester. |

## Valeur de retour

- **Type** : Booléen
- `true` si `value` est un nombre (ex: `42`, `-7`, `3.14`, `0.001`)
- `false` si `value` est du texte, un booléen, ou vide.

## Comportement

- Accepte les entiers et les décimaux.
- Accepte les nombres négatifs.
- N'accepte pas la notation scientifique (`1e5`).
- N'accepte pas les séparateurs de milliers (`1,000`).

## Exemples

### Validation d'un prix

```bdfd
$var[prix;$message[1]]
$if[$isNumber[$var[prix]]==true]
  $if[$var[prix]>=0]
    $var[taxe;$math[$var[prix]*0.2]]
    $sendMessage[💰 Prix: $var[prix]€ | TVA: $var[taxe]€ | Total: $math[$var[prix]+$var[taxe]]€]
  $else
    $sendMessage[❌ Le prix doit être positif.]
  $endif
$else
  $sendMessage[❌ Veuillez entrer un nombre valide.]
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
  $sendMessage[❌ Veuillez entrer deux nombres valides.]
$endif
```

### Détection de type complet

```bdfd
$var[val;$message[1]]
$if[$isInteger[$var[val]]==true]
  $sendMessage[🔢 Entier]
$elseif[$isNumber[$var[val]]==true]
  $sendMessage[🔣 Nombre décimal]
$elseif[$isBoolean[$var[val]]==true]
  $sendMessage[📌 Booléen]
$else
  $sendMessage[📝 Texte]
$endif
```

## Notes

- `$isNumber[42]` retourne `true`.
- `$isNumber[3.14]` retourne `true`.
- `$isNumber[-5.5]` retourne `true`.
- `$isNumber[true]` retourne `false`.
- Pour n'accepter que les entiers, utilisez `$isInteger[]`.
