---
description: Defines a reusable function block in BDScript.
layout: doc
translation_key: docs
category: "Misc"
---

# $func

Defines a reusable user-defined function that can be called later with `$funcCall`. Functions must be closed with `$funcEnd`.

## Syntax

```
$func[name;param1;param2;...]
  ...body...
$funcEnd
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `name` | Unique name for the function | Yes |
| `param1`, `param2`, ... | Parameter names accessible via `$funcArg[name]` inside the body | No |

## Description

The `$func` system lets you define **reusable blocks of code** — similar to functions in programming. Define a function once with `$func[name;params...]...$funcEnd`, then call it anywhere in your command with `$funcCall[name;args...]`.

Inside the function body:
- Access parameters with `$funcArg[paramName]`
- Return a value early with `$funcReturn[value]`
- If no `$funcReturn` is used, the accumulated text content of the body is returned
- Functions are **compile-time**: the body is expanded inline at each call site
- Recursion is blocked (max depth: 10)

## Examples

### Simple function with $funcReturn

```
$func[greet;name]
$funcReturn[Hello $funcArg[name]!]
$funcEnd
$sendMessage[$funcCall[greet;World]]
```

Output: `Hello World!`

### Function without $funcReturn (text body)

```
$func[wave;who]
Waving at $funcArg[who]...
$funcEnd
$sendMessage[$funcCall[wave;Alice]]
```

Output: `Waving at Alice...`

### Multiple parameters

```
$func[add;a;b]
$funcReturn[$funcArg[a] + $funcArg[b]]
$funcEnd
$sendMessage[Result: $funcCall[add;10;20]]
```

Output: `Result: 10 + 20`

### Multiple calls

```
$func[tag;val]
$funcReturn[<$funcArg[val]>]
$funcEnd
$sendMessage[$funcCall[tag;a] $funcCall[tag;b] $funcCall[tag;c]]
```

Output: `<a> <b> <c>`

## Notes

- Functions must be defined **before** they are called
- Function names are case-insensitive
- Nested `$func` definitions are supported
- Max recursion depth is 10 calls — exceeding this triggers a warning and returns empty string
- Parameter names become local variables inside the function body
- `$funcArg` is only valid inside a function call context
