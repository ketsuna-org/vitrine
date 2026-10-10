---
layout: doc
title: $isNumber
translation_key: docs
category: "Math & Text"
function_name: isNumber
syntax: $isNumber[value]
description: Checks if a value is a finite number (decimal, scientific notation, or 0x/0b/0o prefixed integer).
---

# $isNumber

The function `$isNumber[value]` **checks if a value is a finite number**, whether integer or decimal, positive or negative. More permissive than `$isInteger[]`.

## Syntax

```
$isNumber[value]
```

## Parameters

| Parameter | Description |
|---|---|
| `value` | The value to test. Required, exactly one argument. |

## Return Value

- **Type** : Boolean
- `true` if `value` is a number (e.g. `42`, `-7`, `3.14`, `0.001`)
- `false` if `value` is text, a boolean, empty, or not finite (`NaN`, `Infinity`, `1e999`).

## Behavior

- Leading and trailing spaces are ignored: `$isNumber[ 5 ]` → `true`.
- Accepts integers and decimals, with an optional `+` or `-` sign: `42`, `-7`, `+5`, `3.14`, `.5`, `5.`.
- Accepts scientific notation: `1e5` → `true` (but `1e` → `false`).
- Accepts integers with a `0x` (hexadecimal), `0b` (binary) or `0o` (octal) prefix: `0x1F` → `true`. A bare `0x` is `false`.
- Does not accept thousands separators (`1,000`) or inner spaces (`5 5`).
- A value that is `NaN`, `Infinity`, or too large to be finite (`1e999`) is `false`.

## Examples

### Price validation

```bdfd
$var[price;$message[1]]
$if[$isNumber[$var[price]]==true]
  $if[$var[price]>=0]
    $var[tax;$calculate[$var[price]*0.2]]
    $sendMessage[💰 Price: $var[price]€ | VAT: $var[tax]€ | Total: $calculate[$var[price]+$var[tax]]€]
  $else
    $sendMessage[❌ The price must be positive.]
  $endif
$else
  $sendMessage[❌ Please enter a valid number.]
$endif
```

### Simple calculator

```bdfd
$var[a;$message[1]]
$var[b;$message[2]]
$if[$isNumber[$var[a]]==true&&$isNumber[$var[b]]==true]
  $sendMessage[📊 $var[a] + $var[b] = $calculate[$var[a]+$var[b]]]
  $sendMessage[📊 $var[a] × $var[b] = $calculate[$var[a]*$var[b]]]
$else
  $sendMessage[❌ Please enter two valid numbers.]
$endif
```

### Complete type detection

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

- `$isNumber[42]` returns `true`.
- `$isNumber[3.14]` returns `true`.
- `$isNumber[-5.5]` returns `true`.
- `$isNumber[true]` returns `false`.
- To accept only integers, use `$isInteger[]`.
