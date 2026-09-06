---
description: Ends a function block started with $func.
layout: doc
translation_key: docs
category: "Misc"
---

# $funcEnd

Marks the end of a user-defined function block started with `$func[...]`.

## Syntax

```
$funcEnd
```

## Parameters

None.

## Description

`$funcEnd` closes a function definition. Every `$func[name;params...]` must be paired with a matching `$funcEnd`. The parser treats everything between `$func[...]` and `$funcEnd` as the function body.

Nested `$func` definitions are supported — each inner `$func` must have its own `$funcEnd`.

## Examples

### Basic definition

```
$func[greet;name]
$funcReturn[Hello $funcArg[name]!]
$funcEnd
```

### Multiple functions

```
$func[one]
One
$funcEnd

$func[two]
Two
$funcEnd

$sendMessage[$funcCall[one] $funcCall[two]]
```

Output: `One Two`

### Nested functions

```
$func[outer]
$func[inner;x]
$funcReturn[<$funcArg[x]>]
$funcEnd
$funcCall[inner;nested]
$funcEnd
$sendMessage[$funcCall[outer]]
```

Output: `<nested>`

## Notes

- Forgetting `$funcEnd` causes a parse error
- `$funcEnd` outside a function block triggers a diagnostic warning
- Functions defined without a closing `$funcEnd` are still registered, but may produce unexpected results
