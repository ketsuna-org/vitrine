---
layout: doc
title: $isBoolean
translation_key: docs
category: "Math & Text"
function_name: isBoolean
syntax: $isBoolean[value]
description: Checks if a value is one of the boolean words true, false, yes, no, on, off, enable or disable (lowercase).
---

# $isBoolean

The function `$isBoolean[value]` **checks if a value is a boolean word**. It returns `true` if the value is exactly one of `true`, `false`, `yes`, `no`, `on`, `off`, `enable` or `disable`, and `false` in all other cases (number, text, etc.).

## Syntax

```
$isBoolean[value]
```

## Parameters

| Parameter | Description |
|---|---|
| `value` | The value to test. Required, exactly one argument. |

## Return Value

- **Type**: Boolean
- `true` if `value` is one of `true`, `false`, `yes`, `no`, `on`, `off`, `enable`, `disable`.
- `false` otherwise (number, any other text, or empty).

## Behavior

- The comparison is exact and case-sensitive: `TRUE`, `No` and ` true` (with a space) return `false`.
- The eight words above are all accepted, including `yes`/`no` and `on`/`off`.
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
- `$isBoolean[yes]` returns `true`.
- `$isBoolean[TRUE]` returns `false` (case-sensitive).
- `$isBoolean[0]` returns `false` (0 is a number).
- `$isBoolean[]` (empty) returns `false`.
