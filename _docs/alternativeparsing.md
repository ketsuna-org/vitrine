---
layout: doc
title: $alternativeParsing
translation_key: docs
category: "Flags & Debug"
function_name: alternativeParsing
syntax: $alternativeParsing[(value)]
description: Accepted for compatibility with BDFD scripts; in this engine it does nothing and returns an empty string.
---
# $alternativeParsing

The `$alternativeParsing` function is accepted so that scripts written for BDFD still run. In this engine its handler ignores any argument and returns an empty string: it does **not** change how the code is parsed.

## Syntax

```
$alternativeParsing[(value)]
```

## Parameters

The engine accepts zero or one argument and ignores it.

## Return value

An empty string.

## Behavior

- No parsing mode is switched: the code is parsed and executed in the same way with or without this function.
- It never raises an error for a valid call.

## Examples

### Script ported from BDFD

```bdfd
$alternativeParsing
$sendMessage[Hello]
```

## Notes

- Do not add it expecting a different handling of brackets or special characters.
- Related no-op functions: `$optOff`, `$disableInnerSpaceRemoval`, `$disableSpecialEscaping`.
