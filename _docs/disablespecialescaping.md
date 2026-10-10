---
layout: doc
title: $disableSpecialEscaping
translation_key: docs
category: "Flags & Debug"
function_name: disableSpecialEscaping
syntax: $disableSpecialEscaping
description: Accepted for compatibility with BDFD scripts; in this engine it does nothing and returns an empty string.
---
# $disableSpecialEscaping

The `$disableSpecialEscaping` function is accepted so that scripts written for BDFD still run. In this engine its handler does nothing and returns an empty string: it does **not** change how brackets, semicolons or functions are interpreted.

## Syntax

```
$disableSpecialEscaping
```

## Parameters

None. Any argument is refused ("Invalid argument count").

## Return value

An empty string.

## Behavior

- Parsing is identical with or without this function: functions placed after it are still executed, and nested balanced brackets keep working. For example `$replaceText[a [b] c;b;z]` returns `a [z] c` both with and without it.
- It never raises an error for a valid call.

## Examples

### Script ported from BDFD

```bdfd
$disableSpecialEscaping
$replaceText[a [b] c;b;z]
```

The result is `a [z] c`, exactly as without the flag.

## Notes

- Do not rely on it to print raw `[`, `]` or `;`; put a backslash before the character instead (e.g. `\[`).
- Related no-op functions: `$alternativeParsing`, `$optOff`, `$disableInnerSpaceRemoval`.
