---
description: Reads the error caught by the last $try / $catch block, or one of its details.
layout: doc
translation_key: docs
category: "Misc"
function_name: error
syntax: $error / $error[type]
---

# $error

`$error` gives access to the error that the last `$try ... $catch ... $endTry` block caught. It does **not** raise an error: to catch errors and read them, use [$try / $catch / $endTry](/docs/try-catch/).

## Syntax

```text
$error
$error[type]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `type` | Which detail to return: `message`, `command`, `source`, `row` or `column` (lowercase). Without it, the full error text is returned. Any other value is an error: "Error type must be command, message, source, row or column." | No |

## Return values

| Usage | Returns |
|-------|---------|
| `$error` | The full error text, with its location prefix: `BDFD L<line>:<column> $function: message` |
| `$error[message]` | The error message alone, without the location prefix |
| `$error[command]` | The function that failed, with its `$` (for example `$sum`) |
| `$error[source]` | The source line where the error occurred (trimmed) |
| `$error[row]` | The line number of the error |
| `$error[column]` | The column of the error |

## Behavior

- `$error` is empty until a `$try` block has caught an error. It is meant to be read inside the `$catch` part.
- The recorded values are not cleared when the block ends: they stay readable after `$endTry` until another error is caught.
- Each caught error replaces the previous one.

## Examples

### Show the reason of a failure

```bdfd
$try
  $var[result;$calculate[$message]]
  $sendMessage[Result: $var[result]]
$catch
  $sendMessage[Calculation failed: $error[message]]
$endTry
```

### Log where an error happened

```bdfd
$try
  $httpGet[https://api.example.com/data]
$catch
  $log[$error[command] failed on line $error[row], column $error[column]]
$endTry
```

## Notes

- `$error[message]` is not a way to stop a command with a custom message: its argument is the detail to read, not a text to display.
- To stop the script with a message when a condition fails, use [$onlyIf](/docs/onlyif/) (`$onlyIf[condition;message]`); to stop it silently, use [$stop](/docs/stop/).
