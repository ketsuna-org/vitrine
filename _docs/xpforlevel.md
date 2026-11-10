---
layout: doc
title: $xpForLevel[]
translation_key: docs
category: "Lists & Helpers"
function_name: xpForLevel
syntax: $xpForLevel[level;(formula)]
description: "Total XP needed to reach a level."
---
# $xpForLevel — Total XP needed to reach a level

## Syntax

```
$xpForLevel[level;(formula)]
```

## Parameters

- **level** *(integer, required)* — From 0 to 10000.
- **formula** *(text, optional)* — `mee6` (default, like MEE6), `quadratic` (100 × level²) or `linear[:N]` (N XP per level, default 100).

## Return Value

- number.

## Usage

```
$xpForLevel[1] → "100"
$xpForLevel[2] → "255"
$xpForLevel[3;linear:50] → "150"
```

## Example

```bdfd
$sendMessage[$xpForLevel[1]]
```
