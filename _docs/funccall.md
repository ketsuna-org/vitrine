---
layout: doc
translation_key: docs
category: "Misc"
---

# $funcCall

Calls a user-defined function previously declared with `$func[name;...]`. The call is expanded inline at compile-time.

## Syntax

```
$funcCall[funcName;arg1;arg2;...]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `funcName` | Name of the function to call (must match a `$func` definition) | Yes |
| `arg1`, `arg2`, ... | Arguments passed to the function's parameters | No |

## Description

`$funcCall` invokes a user-defined function. The function body is expanded **at compile-time** — all text, inline functions, and `$funcArg` references are resolved and inserted at the call site.

If the function uses `$funcReturn`, that value becomes the result. Otherwise, the accumulated text content of the function body is used.

## Examples

### Basic call with return

```
$func[greet;name]
$funcReturn[Hello $funcArg[name]!]
$funcEnd
$sendMessage[$funcCall[greet;World]]
```

### Call with runtime placeholders

```
$func[say;msg]
$funcReturn[You said: $funcArg[msg]]
$funcEnd
$sendMessage[$funcCall[say;$username]]
```

At runtime: `You said: <actual username>`

### Chaining calls

```
$func[wrap;x]
$funcReturn[[$funcArg[x]]]
$funcEnd
$func[bracket;v]
$funcReturn[{$funcArg[v]}]
$funcEnd
$sendMessage[$funcCall[wrap;$funcCall[bracket;hello]]]
```

Output: `[{hello}]`

### Calling an undefined function

```
$sendMessage[$funcCall[notfound;test]]
```

Returns empty string with a diagnostic warning.

## Notes

- The function must be defined **before** the call
- Calls are resolved at compile-time — not at runtime
- Max recursion depth: 10 calls
- If the function is not found, returns an empty string and emits a diagnostic
