---
layout: doc
translation_key: docs
category: "Misc"
---

# $error

Generates a custom error that stops the command execution with the provided message.

## Syntax

```
$error[message]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `message` | The error message to display | Yes |

## Description

`$error` stops the execution of the current command immediately and displays a custom error message to the user. This is useful when you want to interrupt a command under certain conditions with a clear, descriptive message.

Unlike `$stop` which silently stops execution, `$error` explicitly signals that something went wrong and provides feedback.

## Examples

### Missing parameter

```
$if[$message==]
  $error[❌ Please provide a message.]
$endif
$sendMessage[$message]
```

### Invalid value

```
$if[$isNumber[$message]!=true]
  $error[❌ The provided value must be a number.]
$endif
$sendMessage[Valid number: $message]
```

### Permission check

```
$if[$checkContains[$userPerms;BanMembers]!=true]
  $error[❌ You need the Ban Members permission to use this command.]
$endif
$ban[$mentioned[1]]
$sendMessage[User banned.]
```

### Conditional validation

```
$var[age;$message]
$if[$var[age]<18]
  $error[❌ You must be at least 18 years old.]
$endif
$sendMessage[Access granted.]
```

## Notes

- `$error` immediately stops command execution; no code after it will run.
- For silent stops without a message, use `$stop`.
- The error message can contain emojis, mentions, and formatting.
- Useful for input validation and permission checks.
