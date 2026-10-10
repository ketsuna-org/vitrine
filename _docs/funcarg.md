---
layout: doc
translation_key: docs
category: "Misc"
---

# $funcArg

Retrieves the value of a parameter passed to a user-defined function. Only meaningful while a function called with `$funcCall` is running.

## Syntax

```bdfd
$funcArg[paramName]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `paramName` | Name of the parameter (as declared in `$func[name;p1;p2;...]`). Case-insensitive, surrounding spaces are ignored. | Yes |

## Description

`$funcArg` gives you access to the arguments passed when a user-defined function is called via `$funcCall`. The value is the text of the argument at the moment of the call: it was already evaluated, so it can come from variables or other functions.

## Examples

### Access by name

```bdfd
$func[welcome;user]
$funcReturn[Welcome, $funcArg[user]!]
$funcEnd
$sendMessage[$funcCall[welcome;$username]]
```

### Multiple parameters

```bdfd
$func[format;label;value]**$funcArg[label]:** $funcArg[value]$funcEnd
$sendMessage[$funcCall[format;Score;100]]
```

Output: `**Score:** 100`

### With calculations

```bdfd
$func[double;x]
$funcReturn[$calculate[$funcArg[x] * 2]]
$funcEnd
$sendMessage[$funcCall[double;21]]
```

Output: `42`

## Notes

- Exactly one argument is required.
- Outside a function call, `$funcArg` returns an empty string.
- A name that is not declared in the `$func` header also returns an empty string (no error).
- A parameter for which `$funcCall` received no value is an empty string.
- Parameter names are case-insensitive.
