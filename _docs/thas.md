---
layout: doc
title: $tHas
translation_key: docs
category: "Translations"
function_name: tHas
syntax: $tHas[key]
description: Tells whether a translation key exists in the bot. Not in BDFD.
---

# $tHas

`$tHas` answers `true` or `false`. A key exists when at least one language has a non-empty text for it.

## Syntax

```
$tHas[key]
```

## Parameters

| Parameter | Description |
|---|---|
| `key` | Translation key. |

## Return value

- `true` or `false`.

## Examples

```bdfd
$if[$tHas[promo.banner]==true]
  $t[promo.banner]
$endif
```
