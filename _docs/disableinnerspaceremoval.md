---
layout: doc
title: $disableInnerSpaceRemoval
translation_key: docs
category: "Flags & Debug"
function_name: disableInnerSpaceRemoval
syntax: $disableInnerSpaceRemoval
description: Disables the automatic removal of spaces inside BDFD function parameters. By default, BDFD trims leading and trailing spaces.
---
# $disableInnerSpaceRemoval

The `$disableInnerSpaceRemoval` function **disables the automatic removal of spaces** in parameters. By default, BDFD trims spaces at the beginning and end of parameters.

## Syntax

```
$disableInnerSpaceRemoval
```

## Parameters

None.

## Return value

None.

## Behavior

- Without this function: `$sendMessage[  Hello  ]` becomes `Hello`
- With this function: leading, trailing, and internal spaces are preserved.
- Useful for text formatting (ASCII art, indentation, etc.).

## Examples

### Preserving indentation

```bdfd
$disableInnerSpaceRemoval
$sendMessage[
╔══════════════╗
║   Welcome    ║
╚══════════════╝
]
```

### Preserving spaces in text

```bdfd
$disableInnerSpaceRemoval
$let[codeBlock;    function hello() {        return "world";    }]
$sendMessage[```js
$codeBlock
```]
```

### Comparison

```bdfd
; Without $disableInnerSpaceRemoval
$sendMessage[  Hello  World  ]
; Result: Hello World

$disableInnerSpaceRemoval
$sendMessage[  Hello  World  ]
; Result:   Hello  World  
```

## Notes

- Effect is limited to the current command.
- Place at the beginning if the entire command requires space preservation.
- Does not disable the processing of special characters (see `$disableSpecialEscaping`).
