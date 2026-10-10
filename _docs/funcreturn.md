---
layout: doc
translation_key: docs
category: "Misc"
---

# $funcReturn

Sets the value returned by a user-defined function. The function call resolves to this value instead of the body's text.

## Syntax

```bdfd
$funcReturn[value]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `value` | The value to return (can contain inline functions, variables, etc.). Exactly one argument; an empty value is allowed. | Yes |

## Description

`$funcReturn` stores the return value of the function call that is currently running. When the body ends, if `$funcReturn` was executed at least once, the stored value is the result of `$funcCall`. If it was never executed, the text produced by the body is returned instead.

`$funcReturn` does **not** stop the function: the rest of the body still runs. Only the **last** `$funcReturn` executed matters — if several appear (for example inside conditionals), the last one executed wins.

## Examples

### Simple return

```bdfd
$func[greet;name]
$funcReturn[Hello $funcArg[name]!]
$funcEnd
$sendMessage[$funcCall[greet;World]]
```

Output: `Hello World!`

### Without return — uses body text

```bdfd
$func[wave;who]Waving at $funcArg[who]...$funcEnd
$sendMessage[$funcCall[wave;Alice]]
```

Output: `Waving at Alice...`

### Return with inline functions

```bdfd
$func[double;x]
$funcReturn[$calculate[$funcArg[x] * 2]]
$funcEnd
$sendMessage[$funcCall[double;21]]
```

Output: `42`

### Conditional return

```bdfd
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

- `$funcReturn` is optional — functions work without it.
- `$funcReturn` itself outputs nothing.
- An empty `$funcReturn[]` makes the call return an empty text, even if the body produced text.
- Outside a function call it has no effect.
- The value is evaluated when `$funcReturn` runs, inside the function call.
