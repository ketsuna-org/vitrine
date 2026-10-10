---
layout: doc
title: $disableInnerSpaceRemoval
translation_key: docs
category: "Flags & Debug"
function_name: disableInnerSpaceRemoval
syntax: $disableInnerSpaceRemoval
description: Accepted for compatibility with BDFD scripts; in this engine it does nothing and returns an empty string.
---
# $disableInnerSpaceRemoval

The `$disableInnerSpaceRemoval` function is accepted so that scripts written for BDFD still run. In this engine its handler does nothing and returns an empty string: it does **not** change how spaces in arguments are handled.

## Syntax

```
$disableInnerSpaceRemoval
```

## Parameters

None. Any argument is refused ("Invalid argument count").

## Return value

An empty string.

## Behavior

- Spaces in arguments are handled identically with or without this function. For example `$replaceText[  Hello  World  ;x;y]` returns `  Hello  World  ` (leading, inner and trailing spaces kept) both with and without `$disableInnerSpaceRemoval`.
- It never raises an error for a valid call.

## Examples

### Script ported from BDFD

```bdfd
$disableInnerSpaceRemoval
$replaceText[  Hello  World  ;x;y]
```

The result is `  Hello  World  `, exactly as without the flag.

## Notes

- Do not rely on it to preserve or remove spaces.
- Related no-op functions: `$alternativeParsing`, `$optOff`, `$disableSpecialEscaping`.
