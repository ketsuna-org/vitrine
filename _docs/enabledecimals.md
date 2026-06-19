---
layout: doc
title: $enableDecimals
translation_key: docs
category: "Flags & Debug"
function_name: enableDecimals
syntax: $enableDecimals
description: Enables decimal display in calculation results. By default, BDFD rounds numerical results.
---
# $enableDecimals

The `$enableDecimals` function **enables decimal display** in calculations for the current command.

## Syntax

```
$enableDecimals
```

## Parameters

None.

## Return value

None.

## Behavior

- Without `$enableDecimals`, BDFD rounds the results of `$calculate[]`.
- With `$enableDecimals`, the results include decimals.
- The effect is limited to the current command.

## Examples

### Calculation with decimals

```bdfd
$enableDecimals
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
$let[without;$calculate[10/3]]
$enableDecimals
$let[with;$calculate[10/3]]
$sendMessage[Without: $without | With: $with]
```

## Notes

- Place before the calculations concerned.
- To round to N decimals, use `$round[$calculate[...];N]`.
- Also affects divisions in `$if[]` conditions.
