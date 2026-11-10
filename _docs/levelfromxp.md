---
layout: doc
title: $levelFromXp[]
translation_key: docs
category: "Lists & Helpers"
function_name: levelFromXp
syntax: $levelFromXp[xp;(formula)]
description: "Level reached with a given amount of XP. Reverse of `$xpForLevel` and the same formulas."
---
# $levelFromXp — Level reached with a given amount of XP

## Syntax

```
$levelFromXp[xp;(formula)]
```

## Parameters

- **xp** *(integer, required)* — The XP.
- **formula** *(text, optional)* — `mee6` (default), `quadratic` or `linear[:N]`.

## Return Value

- number.

## Usage

```
$levelFromXp[254] → "1"
$levelFromXp[255] → "2"
```

## Example

```bdfd
$sendMessage[$levelFromXp[254]]
```
