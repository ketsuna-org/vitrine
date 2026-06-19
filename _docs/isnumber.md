---
layout: doc
title: $isNumber
translation_key: docs
category: "Math & Text"
function_name: isNumber
syntax: $isNumber[value]
description: Checks if a value is a number (integer or decimal, positive or negative).
---

# $isNumber

The function `$isNumber[value]` **checks if a value is a number**, whether integer, decimal, positive or negative. More permissive than `$isInteger[]`.

## Syntax

```
$isNumber[value]
```

## Parameters

| Parameter | Description |
|---|---|
| `value` | The value to test. |

## Return Value

- **Type** : Boolean
- `true` if `value` is a number (e.g. `42`, `-7`, `3.14`, `0.001`)
- `false` if `value` is text, a boolean, or empty.

## Behavior

- Accepts integers and decimals.
- Accepts negative numbers.
- Does not accept scientific notation (`1e5`).
- Does not accept thousands separators (`1,000`).

## Examples

### Price validation

```bdfd
$var[price;$message[1]]
$if[$isNumber[$var[price]]==true]
  $if[$var[price]>=0]
    $var[tax;$math[$var[price]*0.2]]
    $sendMessage[💰 Price: $var[price]€ | VAT: $var[tax]€ | Total: $math[$var[price]+$var[tax]]€]
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
  $sendMessage[📊 $var[a] + $var[b] = $math[$var[a]+$var[b]]]
  $sendMessage[📊 $var[a] × $var[b] = $math[$var[a]*$var[b]]]
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
