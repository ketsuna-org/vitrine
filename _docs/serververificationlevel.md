---
layout: doc
title: $serverVerificationLevel[]
translation_key: docs
category: "Entity Info"
function_name: serverVerificationLevel
syntax: $serverVerificationLevel
description: Returns the verification level of the server in the form of an integer (0 to 4).
---

# $serverVerificationLevel[] — Verification Level

`$serverVerificationLevel[]` returns the verification level of the server, which determines the criteria that a member must meet before being able to send messages.

## Syntax

```
$serverVerificationLevel
```

## Parameters

None.

## Return Value

- **Type**: `integer`
- An integer from 0 to 4 representing the verification level:

| Value | Level | Description |
|--------|--------|-------------|
| 0 | None | No restrictions |
| 1 | Low | Accounts with a verified email |
| 2 | Medium | Accounts registered for more than 5 minutes |
| 3 | High | Members of the server for more than 10 minutes |
| 4 | Very High | Accounts with a verified phone number |

## Usage

### Simple display

```bdfd
$sendMessage[🔒 Verification level: $serverVerificationLevel]
```

### Interpreted message

```bdfd
$var[verifLevel;$serverVerificationLevel]
$if[$var[verifLevel]==0]
$var[verifText;No restrictions]
$elseIf[$var[verifLevel]==1]
$var[verifText;Verified email required]
$elseIf[$var[verifLevel]==2]
$var[verifText;Account older than 5 minutes]
$elseIf[$var[verifLevel]==3]
$var[verifText;Member for over 10 minutes]
$else
$var[verifText;Verified phone number required]
$endif
$sendMessage[🔒 Verification level: **$var[verifText]**]
```

### Server info embed

```bdfd
$title[Configuration of $serverName]
$addField[Verification level;$serverVerificationLevel;yes]
$addField[AFK Timeout;$afkTimeout seconds;yes]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- A higher level offers better protection against spam and raids.
- Level 4 (verified phone number) is the most restrictive and requires that Discord has verified the account's phone number.
- This information is useful for moderation commands or contextual welcome messages.
