---
layout: doc
title: $enableDecimals
translation_key: docs
category: "Flags & Debug"
function_name: enableDecimals
syntax: $enableDecimals[enable]
description: Enables or disables decimal results in calculations for the current command. By default, results are rounded to the nearest integer.
---
# $enableDecimals

The `$enableDecimals[]` function **enables or disables decimal display** in calculations for the current command.

## Syntax

```
$enableDecimals[enable]
```

## Parameters

| Parameter | Description |
|---|---|
| `enable` | Required (exactly one argument). `yes`, `true`, `on` or `enable` to enable decimals; `no`, `false`, `off` or `disable` to disable them. Any other value raises "Expected an enable-decimals boolean.". A bare `$enableDecimals` is refused ("Invalid argument count"). |

## Return value

An empty string.

## Behavior

- Without it (default: disabled), the non-integer results of `$calculate[]`, `$sum[]`, `$sub[]`, `$multi[]`, `$divide[]` and `$sqrt[]` are rounded to the nearest integer (halves round up: `2.5` gives `3`, `-2.5` gives `-2`), `$round[value;N]` returns an integer, and `$random` without arguments returns an integer from 0 to 9.
- With `$enableDecimals[yes]`, the results keep their decimals (and `$random` without arguments returns a decimal between 0 and 10).
- `$enableDecimals[no]` turns it off again.
- The effect is limited to the current command.

## Examples

### Calculation with decimals

```bdfd
$enableDecimals[yes]
$sendMessage[10 ÷ 3 = $calculate[10/3]]
; Displays: 10 ÷ 3 = 3.3333333333333335
```

### Without decimals (default)

```bdfd
$sendMessage[10 ÷ 3 = $calculate[10/3]]
; Displays: 10 ÷ 3 = 3
```

### Comparison before/after

```bdfd
$var[without;$calculate[10/3]]
$enableDecimals[yes]
$var[with;$calculate[10/3]]
$sendMessage[Without: $var[without] | With: $var[with]]
```

## Notes

- Place before the calculations concerned.
- To round to N decimals, enable decimals first and then use `$round[$calculate[...];N]`; with decimals disabled `$round` returns an integer.
- The `enable` argument is required: use `$enableDecimals[yes]`.
