---
layout: doc
title: $banID
category: "Moderation"
function_name: banID
syntax: $banID[(reason);(userID)]
description: Bans a user ID, with the reason as the first argument. In a prefix command, an omitted ID falls back to the last word of the message; in a slash command it is an error.
locale: en
translation_key: doc-banid
---

# $banID

`$banID[reason;userID]` takes the reason first and the target ID second. Both arguments are optional (`$banID`, `$banID[reason]` and `$banID[reason;userID]` are all accepted). In a **prefix** command, an omitted or empty ID falls back to the last word of the message. In a **slash** command there is no such fallback: an empty ID raises `Missing or invalid user ID.` (the last option would often be a word of the reason, or another member's ID).

## Syntax

```text
$banID
$banID[reason]
$banID[reason;userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `reason` | Optional. Reason for the ban, at most 512 characters (empty by default). |
| `userID` | ID of the user to ban: decimal digits only (`0xDE` or `+222` are refused). Prefix command: if empty, the last word of the message. Slash command: required (use `$message[option]`, which is the ID of a user option). A missing or invalid ID raises "Missing or invalid user ID.". |

## Return value

Returns an empty string. The function does not delete past messages of the user (0 days of messages deleted).

## Behavior

- The bot needs the Ban Members permission; the target cannot be the server owner.
- If the target is a member, the bot's highest role must be above the target's highest role.
- A user who is not a member of the server can be banned (the hierarchy check is skipped when Discord reports the user is not a member).
- A refusal or failure from the moderation service is raised as an error.

## Examples

### Explicit ID

Replace the sample ID with a real user ID before running this example.

```bdfd
$onlyPerms[banmembers;You need Ban Members permission.]
$onlyBotPerms[banmembers;The bot needs Ban Members permission.]
$banID[Raid;123456789012345678]
Member banned for raiding.
```

### Prefix command example

Configure a prefix command named `ban`. Invoke it as `!ban 123456789012345678`.

```bdfd
$onlyPerms[banmembers;You need Ban Members permission.]
$onlyBotPerms[banmembers;The bot needs Ban Members permission.]
$onlyIf[$message[1]!=;Usage: !ban userID]
$onlyIf[$message[1]!=$authorID;You cannot ban yourself.]
$onlyIf[$message[1]!=$serverOwner;The server owner cannot be banned.]
$banID[Moderation;$message[1]]
Member banned successfully.
```

### Complete ban command (slash and prefix)

The same script serves a slash command with the options `usuário` (user) and `motivo` (string), and the prefix command `!ban @member reason`. In a slash command, `$message[usuário]` is already the user ID. In a prefix command, `$mentioned[1;no]` is the first mentioned user, or empty if nobody is mentioned: always add `;no`, because the default would return the command author when nobody is mentioned (and the guards would then try to ban the author or the owner).

```bdfd
$onlyPerms[banmembers;You need Ban Members permission.]
$onlyBotPerms[banmembers;The bot needs Ban Members permission.]
$if[$isSlash==true]
  $onlyIf[$message[usuário]!=$authorID;You cannot ban yourself.]
  $onlyIf[$message[usuário]!=$serverOwner;The server owner cannot be banned.]
  $banID[$message[motivo];$message[usuário]]
  Banned <@$message[usuário]>.
$else
  $if[$mentioned[1;no]!=]
    $onlyIf[$mentioned[1;no]!=$authorID;You cannot ban yourself.]
    $onlyIf[$mentioned[1;no]!=$serverOwner;The server owner cannot be banned.]
    $banID[$noMentionMessage;$mentioned[1;no]]
    Banned <@$mentioned[1;no]>.
  $else
    Usage: !ban @member reason
  $endif
$endif
```

See [`$message`](/docs/message/) for slash option values and [`$mentioned`](/docs/mentioned/) for the guard.
