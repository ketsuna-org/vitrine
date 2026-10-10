---
layout: doc
title: $optOff
translation_key: docs
category: "Flags & Debug"
function_name: optOff
syntax: $optOff
description: Accepted for compatibility with BDFD scripts; in this engine it does nothing and returns an empty string.
---
# $optOff

The `$optOff` function is accepted so that scripts written for BDFD still run. In this engine its handler does nothing and returns an empty string: it does **not** change how the code is optimised or ordered.

## Syntax

```
$optOff
```

## Parameters

None. Any argument is refused ("Invalid argument count").

## Return value

An empty string.

## Behavior

- Execution order and results are identical with or without this function.
- It never raises an error for a valid call.

## Examples

### Script ported from BDFD

```bdfd
$optOff
$replaceText[a;a;b]
```

The result is `b`, exactly as without the flag.

## Notes

- Related no-op functions: `$alternativeParsing`, `$disableInnerSpaceRemoval`, `$disableSpecialEscaping`.
