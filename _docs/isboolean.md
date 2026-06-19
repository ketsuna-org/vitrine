---
layout: doc
title: $isBoolean
translation_key: docs
category: "Math & Text"
function_name: isBoolean
syntax: $isBoolean[value]
description: Vérifie si une valeur est strictement un booléen (true ou false).
parameters:
  - name: value
    description: La valeur à tester.
returns:
  - type: boolean
    description: true si la valeur est true ou false (booléen BDFD), false sinon.
related:
  - $isInteger
  - $isNumber
  - $isValidHex
examples:
  - description: Tester un booléen
    code: |
      $if[$isBoolean[true]==true]
        $sendMessage[C'est un booléen !]
      $endif
  - description: Tester une chaîne
    code: |
      $if[$isBoolean[hello]==false]
        $sendMessage[Ce n'est pas un booléen.]
      $endif
---

# $isBoolean

La fonction `$isBoolean[value]` **vérifie si une valeur est un booléen** (`true` ou `false`). Elle retourne `true` si la valeur est strictement un booléen, `false` dans tous les autres cas (nombre, texte, etc.).

## Syntaxe

```
$isBoolean[value]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `value` | La valeur à tester. |

## Valeur de retour

- **Type** : Booléen
- `true` si `value` est `true` ou `false`
- `false` si `value` est un nombre, une chaîne de caractères, ou vide.

## Comportement

- Seuls les littéraux `true` et `false` sont reconnus comme booléens.
- `"true"` (chaîne) n'est **pas** un booléen.
- `0` et `1` ne sont **pas** des booléens (utilisez `$isNumber[]` pour ces cas).

## Exemples

### Validation dans une condition

```bdfd
$if[$isBoolean[$message[1]]==true]
  $sendMessage[✅ $message[1] est un booléen valide.]
$else
  $sendMessage[❌ $message[1] n'est pas un booléen. Attendu : true ou false.]
$endif
```

### Vérifier une variable

```bdfd
$var[actif;true]
$if[$isBoolean[$var[actif]]==true]
  $sendMessage[La variable est un booléen.]
$endif
```

### Type checking avancé

```bdfd
$var[val;$message[1]]
$if[$isBoolean[$var[val]]==true]
  $sendMessage[📌 Booléen détecté : $var[val]]
$elseif[$isInteger[$var[val]]==true]
  $sendMessage[🔢 Entier détecté : $var[val]]
$elseif[$isNumber[$var[val]]==true]
  $sendMessage[🔣 Nombre détecté : $var[val]]
$else
  $sendMessage[📝 Texte détecté : $var[val]]
$endif
```

## Notes

- `$isBoolean[true]` retourne `true`.
- `$isBoolean[false]` retourne `true`.
- `$isBoolean[0]` retourne `false` (0 est un nombre).
- `$isBoolean[]` (vide) retourne `false`.
