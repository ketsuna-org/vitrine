---
description: Defines a reusable user function (name and parameters) that is called later with $funcCall.
layout: doc
translation_key: docs
category: "Misc"
---

# $func

Defines a reusable user-defined function that can be called later with `$funcCall`. Functions must be closed with `$funcEnd`.

## Syntax

```bdfd
$func[name;param1;param2;...]
  ...body...
$funcEnd
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `name` | Name of the function. Written literally (no `$` function or variable inside), not empty. Case-insensitive. | Yes |
| `param1`, `param2`, ... | Parameter names accessible via `$funcArg[name]` inside the body. Literal, not empty, case-insensitive, no duplicates, at most 100. | No |

A name or parameter that contains a function, is empty, or a repeated parameter name is a parse error ("Function names and parameters must be literal.", "Function names and parameters cannot be empty.", "Duplicate function parameter."). A missing `$funcEnd` is a parse error ("Missing $funcend.").

## Description

The `$func` system lets you define **reusable blocks of code** — similar to functions in programming. Define a function once with `$func[name;params...]...$funcEnd`, then call it anywhere after that in your command with `$funcCall[name;args...]`.

Inside the function body:
- Access parameters with `$funcArg[paramName]`
- Set the returned value with `$funcReturn[value]`
- If no `$funcReturn` is executed, the text produced by the body is returned
- The body runs **each time** the function is called (at runtime, not at definition time). While it runs, its text is collected into the return value instead of being output directly.
- Calls can nest up to 10 deep; a call beyond that depth returns an empty string.

## Examples

### Simple function with $funcReturn

```bdfd
$func[greet;name]
$funcReturn[Hello $funcArg[name]!]
$funcEnd
$sendMessage[$funcCall[greet;World]]
```

Output: `Hello World!`

### Function without $funcReturn (text body)

```bdfd
$func[wave;who]Waving at $funcArg[who]...$funcEnd
$sendMessage[$funcCall[wave;Alice]]
```

Output: `Waving at Alice...`

### Multiple parameters

```bdfd
$func[add;a;b]
$funcReturn[$funcArg[a] + $funcArg[b]]
$funcEnd
$sendMessage[Result: $funcCall[add;10;20]]
```

Output: `Result: 10 + 20` (the text is only concatenated, not calculated; use `$sum[]` or `$calculate[]` for the arithmetic).

### Multiple calls

```bdfd
$func[tag;val]
$funcReturn[<$funcArg[val]>]
$funcEnd
$sendMessage[$funcCall[tag;a] $funcCall[tag;b] $funcCall[tag;c]]
```

Output: `<a> <b> <c>`

## Notes

- A function must be **defined before it is called**: the definition is registered when execution reaches it. Calling an undefined function returns an empty string.
- Function and parameter names are case-insensitive.
- `$func` itself outputs nothing; the line breaks around it in the script remain in the output.
- Defining a function again with the same name replaces the previous definition.
- A `$func` defined inside the body of another function exists only while that outer call is running.
- Recursion is allowed up to 10 nested calls (`$func[r]x$funcCall[r]$funcEnd` followed by `$funcCall[r]` returns ten `x`); deeper calls return an empty string and record a warning in the execution trace.
- Temporary variables (`$var[...]`) are shared with the caller; they are not local to the function.
- `$funcArg` is only meaningful inside a function call; outside it returns an empty string.
