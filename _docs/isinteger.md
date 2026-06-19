---
layout: doc
title: $isInteger
translation_key: docs
category: "Math & Text"
function_name: isInteger
syntax: $isInteger[value]
description: Checks if a value is an integer (positive, negative or zero).
---

# $isInteger

The function `$isInteger[value]` **checks if a value is an integer** (without decimals). It accepts positive integers, negative integers and zero.

## Syntax

```
$isInteger[value]
```

## Parameters

| Parameter | Description |
|---|---|
| `value` | The value to test. |

## Return Value

- **Type**: Boolean
- `true` if `value` is an integer (e.g. `42`, `-7`, `0`)
- `false` if `value` is a decimal, text, or empty.

## Behavior

- Decimal numbers (`3.14`, `2.0`) return `false`.
- Integers in scientific notation are not recognized.
- `0` is a valid integer.
- Spaces around the number can invalidate the test.

## Examples

### Parameter Validation

```bdfd
$if[$isInteger[$message[1]]==true]
  $sendMessage[✅ $message[1] is a valid integer.]
$else
  $sendMessage[❌ Please provide an integer.]
$endif
```

### Pagination (Validation)

```bdfd
$var[page;$message[1]]
$if[$isInteger[$var[page]]==true]
  $if[$var[page]>=1]
    $sendMessage[📄 Displaying page $var[page]...]
  $else
    $sendMessage[❌ Page must be >= 1.]
  $endif
$else
  $sendMessage[❌ Invalid parameter. Usage: !page <number>]
$endif
```

### Custom Counter

```bdfd
$var[number;$message[1]]
$if[$isInteger[$var[number]]==true]
  $for[i;1;$var[number];1]
    Counter: $for[i]
  $endfor
$else
  $sendMessage[Please enter an integer.]
$endif
```

## Notes

- `$isInteger[42]` returns `true`.
- `$isInteger[-10]` returns `true`.
- `$isInteger[3.14]` returns `false`.
- `$isInteger[abc]` returns `false`.
- To also accept decimals, use `$isNumber[]`.
