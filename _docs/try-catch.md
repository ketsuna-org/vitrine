---
layout: doc
title: $try / $catch / $endTry + $error
translation_key: docs
category: "Control Flow"
function_name: try
syntax: $try.. $catch.. $endTry
description: Error handling block — catches runtime errors in the try body and allows graceful recovery or logging.
---
# $try / $catch / $endTry — Error Handling

The `$try` family of tokens provides structured error handling in BDFD scripts. Instead of letting a runtime error crash the entire action sequence, you can wrap risky code in a `$try` block and handle failures gracefully inside `$catch`. These are **structural tokens** processed at the parser level.

## Block Structure

```
$try
 .. risky commands...
$catch
 .. recovery commands...
$endTry
```

1. The parser executes the body between `$try` and `$catch`.
2. If **no error** occurs, the `$catch` block is skipped entirely and execution resumes after `$endTry`.
3. If **any function error** occurs inside the `$try` body, execution immediately jumps to `$catch`. The error is consumed — it will not propagate outside the try-catch. An error raised inside the `$catch` block itself is not caught by that same `$try`. `$catch` is optional: without it, an error in the body is swallowed and execution resumes after `$endTry`.

**Important:** `$endTry` is always required, even if no `$catch` is provided.

## The $error Variable

Inside the `$catch` block, the `$error` variable provides access to the caught error's metadata:

| Usage                | Returns                                       |
|----------------------|-----------------------------------------------|
| `$error`             | The full error text (with a BDFD location prefix of the form `BDFD L<line>:<column> $function: ...`) |
| `$error[message]`    | The error message alone, without the location prefix |
| `$error[command]`    | The name of the command that caused the error |
| `$error[source]`     | The source line or context of the error       |
| `$error[row]`        | The row number where the error occurred       |
| `$error[column]`     | The column number where the error occurred    |

Any other type (the types are lowercase) raises the error `Error type must be command, message, source, row or column.` `$error` is empty until an error has been caught; it is meant to be used within the `$catch` block. The recorded values are not cleared when the block ends.

## Nesting

`$try` blocks can be nested. Each `$catch` only catches errors from its own `$try` body. An error caught in an inner `$catch` does not propagate to an outer `$catch`.

## Interaction with $stop

If `$stop` is called inside a `$try` block, it halts execution **before** the `$catch` is reached — so the error handler does not run. This is by design: `$stop` is an unconditional halt.

## Use Cases

- **API calls**: Wrap `$httpGet` / `$httpPost` calls to handle network failures.
- **User input parsing**: Catch errors when parsing or coercing user-supplied values.
- **Fallback logic**: Try a primary operation, fall back to a secondary on failure.
- **Logging**: Use `$catch` to log errors with `$log[]` or save them to a variable for later inspection.

## Common Pitfalls

- Forgetting `$endTry` produces a parse error ("Missing $endtry.").
- Placing `$endTry` before `$catch` — the parser expects `$catch` before `$endTry`.
- Using `$error` outside `$catch` — it only holds a value once an error has been caught.
- Using arguments on the delimiters — `$catch` and `$endTry` accept none, and a `$try` with arguments is not a block.
- Catching an error but doing nothing with it — at minimum, log it to help with debugging.

## Examples

### Error-Protected Expression Evaluation

```bdfd
$try
  $var[result;$calculate[$message]]
  $title[Calculation Succeeded]
  $description[Result: **$var[result]**]
  $color[#57F287]
$catch
  $title[Calculation Failed]
  $description[Invalid mathematical expression provided!]
  $color[#ED4245]
$endTry
$sendMessage[Calculation processed]
```
