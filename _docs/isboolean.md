---
layout: doc
title: $isBoolean
translation_key: docs
category: "Math & Text"
function_name: isBoolean
syntax: $isBoolean[value]
description: Checks if a value is strictly a boolean (true or false).
---

# $isBoolean

The function `$isBoolean[value]` **checks if a value is a boolean** (`true` or `false`). It returns `true` if the value is strictly a boolean, and `false` in all other cases (number, text, etc.).

## Syntax

```
$isBoolean[value]
```

## Parameters

| Parameter | Description |
|---|---|
| `value` | The value to test. |

## Return Value

- **Type**: Boolean
- `true` if `value` is `true` or `false`.
- `false` if `value` is a number, a character string, or empty.

## Behavior

- Only the literals `true` and `false` are recognized as booleans.
- `"true"` (string) is **not** a boolean.
- `0` and `1` are **not** booleans (use `$isNumber[]` for those cases).

## Examples

### Validation in a condition

```bdfd
$if[$isBoolean[$message[1]]==true]
  $sendMessage[✅ $message[1] is a valid boolean.]
$else
  $sendMessage[❌ $message[1] is not a boolean. Expected: true or false.]
$endif
```

### Checking a variable

```bdfd
$var[actif;true]
$if[$isBoolean[$var[actif]]==true]
  $sendMessage[The variable is a boolean.]
$endif
```

### Advanced type checking

```bdfd
$var[val;$message[1]]
$if[$isBoolean[$var[val]]==true]
  $sendMessage[📌 Boolean detected: $var[val]]
$elseif[$isInteger[$var[val]]==true]
  $sendMessage[🔢 Integer detected: $var[val]]
$elseif[$isNumber[$var[val]]==true]
  $sendMessage[🔣 Number detected: $var[val]]
$else
  $sendMessage[📝 Text detected: $var[val]]
$endif
```

## Notes

- `$isBoolean[true]` returns `true`.
- `$isBoolean[false]` returns `true`.
- `$isBoolean[0]` returns `false` (0 is a number).
- `$isBoolean[]` (empty) returns `false`.
