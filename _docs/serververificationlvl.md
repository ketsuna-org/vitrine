---
layout: doc
translation_key: docs
category: "Misc"
---

# $serverVerificationLvl

Returns the server's verification level as a text label (`None`, `Low`, `Medium`, `High` or `Very High`).

## Syntax

```bdfd
$serverVerificationLvl
```

## Parameters

This function takes no parameters (an argument is refused: "Invalid argument count"). To read another server, use `$serverVerificationLevel[(guildID)]`.

## Description

`$serverVerificationLvl` returns the verification level of the current server as a **text label**, not as a number. It is a separate registration from `$serverVerificationLevel`: it uses the same five labels, but it takes no server ID, and when the level cannot be read it stops the command with the error "Guild verification level is unavailable." (`$serverVerificationLevel` falls back to a context value or `None`). If the server itself is not found, the error is "Guild not found.".

## Return Value

- **Type**: Text, one of the following (Discord levels 0 to 4, in that order):

| Level | Returned text |
|-------|---------------|
| 0 | `None` |
| 1 | `Low` |
| 2 | `Medium` |
| 3 | `High` |
| 4 | `Very High` |

## Examples

### Simple display

```bdfd
$sendMessage[🔒 Verification level: $serverVerificationLvl]
```

### Interpreted message

```bdfd
$var[vl;$serverVerificationLvl]
$if[$var[vl]==None]
  $sendMessage[🔒 No restrictions]
$elseIf[$var[vl]==Low]
  $sendMessage[🔒 Low verification level]
$elseIf[$var[vl]==Medium]
  $sendMessage[🔒 Medium verification level]
$elseIf[$var[vl]==High]
  $sendMessage[🔒 High verification level]
$else
  $sendMessage[🔒 Very High verification level]
$endif
```

### Server info embed

```bdfd
$title[Server Configuration]
$addField[Verification level;$serverVerificationLvl;yes]
$addField[Server name;$serverName;yes]
$color[#5865F2]
```

## Notes

- The result is text: compare it with `None`, `Low`, `Medium`, `High` or `Very High`, not with `0` to `4`.
- Needs a server context (the current server is looked up).
- See also `$serverVerificationLevel`, which accepts an optional server ID.
