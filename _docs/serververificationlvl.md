---
layout: doc
translation_key: docs
category: "Misc"
---

# $serverVerificationLvl

Returns the server's verification level as an integer (0 to 4). Alias of `$serverVerificationLevel`.

## Syntax

```
$serverVerificationLvl
```

## Parameters

This function takes no parameters.

## Description

`$serverVerificationLvl` is a **shorter alias** of `$serverVerificationLevel`. It returns the verification level of the server as an integer, which determines the criteria a member must meet before being able to send messages.

## Return Value

- **Type**: Integer (0 to 4)

| Value | Level | Description |
|-------|-------|-------------|
| 0 | None | No restrictions |
| 1 | Low | Accounts with a verified email |
| 2 | Medium | Accounts registered for more than 5 minutes |
| 3 | High | Members of the server for more than 10 minutes |
| 4 | Very High | Accounts with a verified phone number |

## Examples

### Simple display

```
$sendMessage[🔒 Verification level: $serverVerificationLvl]
```

### Interpreted message

```
$var[vl;$serverVerificationLvl]
$if[$var[vl]==0]
  $sendMessage[🔒 No restrictions]
$elseIf[$var[vl]==1]
  $sendMessage[🔒 Verified email required]
$elseIf[$var[vl]==2]
  $sendMessage[🔒 Account older than 5 minutes]
$elseIf[$var[vl]==3]
  $sendMessage[🔒 Member for over 10 minutes]
$else
  $sendMessage[🔒 Verified phone number required]
$endif
```

### Server info embed

```
$title[Server Configuration]
$addField[Verification level;$serverVerificationLvl;yes]
$addField[Server name;$serverName;yes]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- `$serverVerificationLvl` and `$serverVerificationLevel` are identical and interchangeable.
- A higher verification level offers better protection against spam and raids.
- Level 4 (phone verification) is the most restrictive.
- Use this value in moderation commands or contextual welcome messages.
