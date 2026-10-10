---
layout: doc
title: $serverVerificationLevel[]
translation_key: docs
category: "Entity Info"
function_name: serverVerificationLevel
syntax: $serverVerificationLevel[(guildID)]
description: Returns the verification level of the server as a label (None, Low, Medium, High, Very High).
---

# $serverVerificationLevel[] — Verification Level

`$serverVerificationLevel[]` returns the verification level of the server as a **text label**, not as a number.

## Syntax

```
$serverVerificationLevel[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | *(Optional)* The ID of a server. If omitted or empty, the current server is used. A non-empty value that is not a positive integer raises `Invalid guild ID.` |

## Return Value

- **Type**: `string`
- One of `None`, `Low`, `Medium`, `High`, `Very High` (Discord levels 0 to 4 in that order).
- If the server cannot be fetched or its level is not one of 0 to 4, the `guild.verificationLevel` context variable supplied by the host is returned unchanged, or `None` if there is none.

| Discord level | Returned text |
|--------|--------|
| 0 | `None` |
| 1 | `Low` |
| 2 | `Medium` |
| 3 | `High` |
| 4 | `Very High` |

## Examples

### Simple display

```bdfd
$sendMessage[🔒 Verification level: $serverVerificationLevel]
```

### Interpreted message

```bdfd
$var[verifLevel;$serverVerificationLevel]
$if[$var[verifLevel]==None]
$sendMessage[🔓 No verification required.]
$elseIf[$var[verifLevel]==Very High]
$sendMessage[🔒 Highest verification level.]
$else
$sendMessage[🔒 Verification level: **$var[verifLevel]**]
$endif
```

### Server info embed

```bdfd
$title[Configuration of $serverName]
$addField[Verification level;$serverVerificationLevel;yes]
$addField[AFK Timeout;$afkTimeout seconds;yes]
$color[#5865F2]
```

## Notes

- The comparison with `==` is case-sensitive: write `Very High`, `High`, etc. exactly.
- When the server was fetched, the engine maps the Discord level to the label. Only when it could not be fetched (or the level is outside 0 to 4) does it fall back to the host-supplied `guild.verificationLevel` text (used unchanged), and finally to `None`.
