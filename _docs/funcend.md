---
description: Ends a function block started with $func.
layout: doc
translation_key: docs
category: "Misc"
---

# $funcEnd

Marks the end of a user-defined function block started with `$func[...]`.

## Syntax

```text
$funcEnd
```

## Parameters

None. An argument (`$funcEnd[...]`) is an error ("$funcend does not accept arguments.").

## Description

`$funcEnd` closes a function definition. Every `$func[name;params...]` must be paired with a matching `$funcEnd`. The parser treats everything between `$func[...]` and `$funcEnd` as the function body.

Nested `$func` definitions are supported — each inner `$func` must have its own `$funcEnd`.

## Examples

### Basic definition

```bdfd
$func[greet;name]
$funcReturn[Hello $funcArg[name]!]
$funcEnd
```

### Multiple functions

```bdfd
$func[one]One$funcEnd
$func[two]Two$funcEnd
$sendMessage[$funcCall[one] $funcCall[two]]
```

Output: `One Two`

### Nested functions

```bdfd
$func[outer]
$func[inner;x]
$funcReturn[<$funcArg[x]>]
$funcEnd
$funcCall[inner;nested]
$funcEnd
$sendMessage[$funcCall[outer]]
```

Output: `<nested>`, surrounded by the line breaks of the `outer` body (the inner function exists only while `outer` is running).

## Notes

- Forgetting `$funcEnd` is a parse error ("Missing $funcend.").
- A `$funcEnd` without an open `$func` is an error ("Unexpected $funcEnd.").
- A function without its closing `$funcEnd` is not registered: the script does not run at all.
