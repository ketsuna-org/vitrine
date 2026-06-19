---
layout: doc
title: $isBoolean
translation_key: docs
category: "Math & Text"
function_name: isBoolean
syntax: $isBoolean[value]
description: Checks if une value est strictement un boolean (true or false).
---

# $isBoolean

The function `$isBoolean[value]` **vérifie if ae value est un boolean** (`true` or `false`). Elle retourne `true` si the value est strictement un boolean, `false` dans all autres cas (number, text, etc.).

## Syntax

```
$isBoolean[value]
```

## Parameters

| Parameter | Description |
|---|---|
| `value` | The value à tester. |

## Return Value

- **Type** : Boolean
- `true` si `value` est `true` or `false`
- `false` si `value` est un number, une string de becauseactères, or vide.

## Behavior

- Seuls les littéraux `true` and `false` sont reconnus comme booleans.
- `"true"` (string) n'est **pas** un boolean.
- `0` and `1` ne sont **pas** des booleans (utilisez `$isNumber[]` pour ces cas).

## Examples

### Validation dans une condition

```bdfd
$if[$isBoolean[$message[1]]==true]
  $sendMessage[✅ $message[1] est un boolean valid.]
$else
  $sendMessage[❌ $message[1] is not un boolean. Attendu : true or false.]
$endif
```

### Vérifier une variable

```bdfd
$var[actif;true]
$if[$isBoolean[$var[actif]]==true]
  $sendMessage[The variable est un boolean.]
$endif
```

### Type checking avancé

```bdfd
$var[val;$message[1]]
$if[$isBoolean[$var[val]]==true]
  $sendMessage[📌 Boolean détecté : $var[val]]
$elseif[$isInteger[$var[val]]==true]
  $sendMessage[🔢 Integer détecté : $var[val]]
$elseif[$isNumber[$var[val]]==true]
  $sendMessage[🔣 Number détecté : $var[val]]
$else
  $sendMessage[📝 Text détecté : $var[val]]
$endif
```

## Notes

- `$isBoolean[true]` retourne `true`.
- `$isBoolean[false]` retourne `true`.
- `$isBoolean[0]` retourne `false` (0 est un number).
- `$isBoolean[]` (vide) retourne `false`.
