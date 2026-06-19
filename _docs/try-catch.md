---
layout: doc
title: $try / $catch / $endTry + $error
translation_key: docs
category: "Control Flow"
function_name: try
syntax: $try ... $catch ... $endTry
description: Error handling block — catches runtime errors in the try body and allows graceful recovery or logging.
parameters:
  - name: (none)
    type: structural
    required: true
    description: $try, $catch, and $endTry are structural tokens with no direct parameters. $error[type] accepts an optional type specifier.
returns:
  type: void
  description: Structural tokens controlled at parser level. Use $error inside the $catch block to retrieve error metadata.
related:
  - eprint
  - stop
examples:
  - title: Basic try-catch with error message
    code: |
      $try
        $setUserVar[result;$divide[$getUserVar[a];0]]
      $catch
        $sendMessage[Error occurred: $error]
      $endTry
      Result: catches the division-by-zero and sends the error message
  - title: Inspecting specific error metadata
    code: |
      $try
        $httpGet[https://api.example.com/broken-endpoint]
      $catch
        $sendMessage[Error type: $error]
        $sendMessage[Command: $error[command]]
        $sendMessage[Source: $error[source]]
      $endTry
      Result: sends detailed error information back to the user
  - title: Silent catch with fallback
    code: |
      $try
        $setUserVar[cachedData;$httpGet[https://api.example.com/data]]
      $catch
        $setUserVar[cachedData;No data available — API unreachable]
      $endTry
      Result: assigns a fallback value silently on failure
---
# $try / $catch / $endTry — Error Handling

The `$try` family of tokens provides structured error handling in BDFD scripts. Instead of letting a runtime error crash the entire action sequence, you can wrap risky code in a `$try` block and handle failures gracefully inside `$catch`. These are **structural tokens** processed at the parser level.

## Block Structure

```
$try
  ... risky commands ...
$catch
  ... recovery commands ...
$endTry
```

1. The parser executes the body between `$try` and `$catch`.
2. If **no error** occurs, the `$catch` block is skipped entirely and execution resumes after `$endTry`.
3. If **any error** occurs inside the `$try` body, execution immediately jumps to `$catch`. The error is consumed — it will not propagate outside the try-catch.

**Important:** `$endTry` is always required, even if no `$catch` is provided.

## The $error Variable

Inside the `$catch` block, the `$error` variable provides access to the caught error's metadata:

| Usage                | Returns                                       |
|----------------------|-----------------------------------------------|
| `$error`             | The error message as a string                 |
| `$error[message]`    | Same as above — the error message             |
| `$error[command]`    | The name of the command that caused the error |
| `$error[source]`     | The source line or context of the error       |
| `$error[row]`        | The row number where the error occurred       |
| `$error[column]`     | The column number where the error occurred    |

Outside the `$catch` block, `$error` is empty or undefined. It only has meaning within the catch scope.

## Nesting

`$try` blocks can be nested. Each `$catch` only catches errors from its own `$try` body. An error caught in an inner `$catch` does not propagate to an outer `$catch`.

## Interaction with $stop

If `$stop` is called inside a `$try` block, it halts execution **before** the `$catch` is reached — so the error handler does not run. This is by design: `$stop` is an unconditional halt.

## Use Cases

- **API calls**: Wrap `$httpGet` / `$httpPost` calls to handle network failures.
- **User input parsing**: Catch errors when parsing or coercing user-supplied values.
- **Fallback logic**: Try a primary operation, fall back to a secondary on failure.
- **Logging**: Use `$catch` to log errors with `$eprint` or save them to a variable for later inspection.

## Common Pitfalls

- Forgetting `$endTry` produces a parse error.
- Placing `$endTry` before `$catch` — the parser expects `$catch` before `$endTry`.
- Assuming `$error` is available outside `$catch` — it is scoped to the catch block only.
- Catching an error but doing nothing with it — at minimum, log it to help with debugging.
