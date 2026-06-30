---
layout: doc
translation_key: docs
category: "Misc"
---

# $funcReturn

Returns a value from a user-defined function. The function call resolves to this value instead of the body's text content.

## Syntax

```
$funcReturn[value]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `value` | The value to return (can contain inline functions, variables, etc.) | Yes |

## Description

`$funcReturn` sets the return value of a user-defined function. When a function call is expanded, if `$funcReturn` was used anywhere in the body, its value becomes the result. If `$funcReturn` is not used, the accumulated text content of the body is returned instead.

Only the **last** `$funcReturn` executed matters — if multiple `$funcReturn` calls appear (e.g., inside conditionals), the last one wins.

## Examples

### Simple return

```
$func[greet;name]
$funcReturn[Hello $funcArg[name]!]
$funcEnd
$sendMessage[$funcCall[greet;World]]
```

Output: `Hello World!`

### Without return — uses body text

```
$func[wave;who]
Waving at $funcArg[who]...
$funcEnd
$sendMessage[$funcCall[wave;Alice]]
```

Output: `Waving at Alice...`

### Return with inline functions

```
$func[double;x]
$funcReturn[$calculate[$funcArg[x] * 2]]
$funcEnd
$sendMessage[$funcCall[double;21]]
```

Output: `42`

### Conditional return

```
$func[status;score]
$if[$checkCondition[$funcArg[score] >= 50]]
$funcReturn[Pass]
$else
$funcReturn[Fail]
$endif
$funcEnd
$sendMessage[Result: $funcCall[status;75]]
```

Output: `Result: Pass`

## Notes

- `$funcReturn` is optional — functions work without it
- Only valid inside a `$func` body — outside, it has no effect
- The returned value is resolved in the function's scope, then inserted at the call site
