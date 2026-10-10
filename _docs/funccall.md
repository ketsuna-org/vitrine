---
layout: doc
translation_key: docs
category: "Misc"
function_name: funcCall
syntax: $funcCall[funcName;(arg1);(arg2);...]
---

# $funcCall

Calls a user-defined function previously declared with `$func[name;...]`. The function body runs at the moment of the call.

## Syntax

```bdfd
$funcCall[funcName;(arg1);(arg2);...]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `funcName` | Name of the function to call (case-insensitive, must match a `$func` already defined). An empty name is an error ("A function name is required."). | Yes |
| `arg1`, `arg2`, ... | Arguments for the function's parameters, in the order of the `$func` header. At most 100. | No |

## Description

`$funcCall` invokes a user-defined function and returns its result. The arguments are evaluated first and bound to the parameters; missing arguments become empty text and extra arguments are ignored. Then the body runs, with its output collected rather than sent.

If the body executes `$funcReturn`, the value of the last executed `$funcReturn` becomes the result. Otherwise, the text produced by the body is the result.

## Examples

### Basic call with return

```bdfd
$func[greet;name]
$funcReturn[Hello $funcArg[name]!]
$funcEnd
$sendMessage[$funcCall[greet;World]]
```

### Call with runtime placeholders

```bdfd
$func[say;msg]
$funcReturn[You said: $funcArg[msg]]
$funcEnd
$sendMessage[$funcCall[say;$username]]
```

At runtime: `You said: <actual username>`

### Chaining calls

```bdfd
$func[wrap;x]
$funcReturn[($funcArg[x])]
$funcEnd
$func[bracket;v]
$funcReturn[{$funcArg[v]}]
$funcEnd
$sendMessage[$funcCall[wrap;$funcCall[bracket;hello]]]
```

Output: `({hello})`

### Calling an undefined function

```bdfd
$sendMessage[$funcCall[notfound;test]]
```

Returns an empty string (and records a warning in the execution trace).

## Notes

- The function must be defined **before** the call is executed.
- The body is executed at each call, at runtime.
- Calls can nest up to 10 deep; a deeper call returns an empty string.
- If the function is not found, the result is an empty string; no error is raised.
- Anything that the body sends explicitly (for example with `$sendMessage`) is sent when the call runs.
