---
layout: doc
title: $isInteger
translation_key: docs
category: "Math & Text"
function_name: isInteger
syntax: $isInteger[value]
description: Checks if a value is an integer (positive, negative or zero) that fits in a 64-bit signed integer.
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
| `value` | The value to test. Required, exactly one argument. |

## Return Value

- **Type**: Boolean
- `true` if `value` is an integer (e.g. `42`, `-7`, `0`)
- `false` if `value` is a decimal, text, or empty.

## Behavior

- Decimal numbers (`3.14`, `2.0`) return `false`.
- Scientific notation (`1e3`) returns `false`.
- `0` is a valid integer; a `+` or `-` sign is accepted (`+5`, `-10`).
- Spaces around the number are ignored: `$isInteger[ 5 ]` → `true`.
- A hexadecimal integer with the `0x` prefix is also accepted: `$isInteger[0xFF]` → `true` (`0b11` is `false`).
- Integers beyond the 64-bit signed range (`99999999999999999999`) return `false`.
- Unlike `$isNumber[]`, it does not check finiteness or decimal formats.

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
  $for[i=1;i<=$var[number];i++]
    Counter: $i
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
