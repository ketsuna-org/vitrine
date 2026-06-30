---
layout: doc
translation_key: docs
category: "Misc"
---

# $funcArg

Retrieves the value of a parameter passed to a user-defined function. Only valid inside a `$func[...]...$funcEnd` block.

## Syntax

```
$funcArg[paramName]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `paramName` | Name of the parameter (as declared in `$func[name;p1;p2;...]`) | Yes |

## Description

`$funcArg` gives you access to the arguments passed when a user-defined function is called via `$funcCall`. Each parameter name must match one of the names declared in the function's `$func[...]` header.

The value is resolved from the caller's scope, so it can contain BDFD variables, inline functions, or runtime placeholders.

## Examples

### Access by name

```
$func[welcome;user]
$funcReturn[Welcome, $funcArg[user]!]
$funcEnd
$sendMessage[$funcCall[welcome;$username]]
```

### Multiple parameters

```
$func[format;label;value]
**$funcArg[label]:** $funcArg[value]
$funcEnd
$sendMessage[$funcCall[format;Score;100]]
```

Output: `**Score:** 100`

### With calculations

```
$func[double;x]
$funcReturn[$calculate[$funcArg[x] * 2]]
$funcEnd
$sendMessage[$funcCall[double;21]]
```

Output: `42`

## Notes

- Only valid inside a `$func` body called via `$funcCall`
- Outside a function context, `$funcArg` returns an empty string
- Parameter names are case-insensitive
