---
layout: doc
title: $disableSpecialEscaping
translation_key: docs
category: "Flags & Debug"
function_name: disableSpecialEscaping
syntax: $disableSpecialEscaping
description: Disables the automatic escaping of special characters (brackets, semicolons, etc.) in parameters. The characters are interpreted literally.
---
# $disableSpecialEscaping

The `$disableSpecialEscaping` function **disables the automatic escaping** of special characters in the command. This allows using `[`, `]`, `;`, etc. without them being interpreted as BDFD syntax delimiters.

## Syntax

```
$disableSpecialEscaping
```

## Parameters

None.

## Return value

None.

## Behavior

- Without this function, `[` and `]` trigger BDFD function syntax.
- With it, these characters are treated as raw text.
- **Warning**: actual BDFD functions are no longer interpreted after `$disableSpecialEscaping`.

## Examples

### Displaying literal brackets

```bdfd
$disableSpecialEscaping
$sendMessage[The format is [optional] in the doc]
; Displays: The format is [optional] in the doc
```

### Message with code syntax

```bdfd
$disableSpecialEscaping
$sendMessage[Use $if[condition] for conditions.]
```

### Combination with other flags

```bdfd
$disableSpecialEscaping
$disableInnerSpaceRemoval
$sendMessage[Raw format: [value]; parameter = true]
```

## Notes

- Irreversible in the command: all functions after `$disableSpecialEscaping` are disabled.
- Place this function at the **end of the code**, after all other BDFD functions.
- Alternative: use `$unEscape[]` for specific portions of text.
