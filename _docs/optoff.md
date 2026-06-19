---
layout: doc
title: $optOff
translation_key: docs
category: "Flags & Debug"
function_name: optOff
syntax: $optOff
description: Disables code optimization for the current command. All code is executed linearly without parser optimization.
---

# $optOff

The `$optOff` function **disables code optimization** for the current command. BDFD then executes the code in a strictly linear manner.

## Syntax

```
$optOff
```

## Parameters

None.

## Return Value

None.

## Behavior

- Without `$optOff`, BDFD may reorganize the code to optimize execution.
- With `$optOff`, the execution order is exactly that of the source code.
- Useful when optimization causes execution order bugs.

## Examples

### Force execution order

```bdfd
$optOff
$var[x;1]
$sendMessage[x = $var[x]]
$var[x;2]
$sendMessage[x = $var[x]]
```

### Avoid optimization bugs

```bdfd
$optOff
$let[a;1]
$onlyIf[$let[a]!=;Missing value]
$sendMessage[$let[a]]
```

## Notes

- Impacts performance: only use when necessary.
- Some complex functions may require `$optOff` to work correctly.
- Should be placed at the beginning of the command.
