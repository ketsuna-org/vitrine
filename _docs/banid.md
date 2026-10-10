---
layout: doc
title: $banID
translation_key: docs
category: "Moderation"
function_name: banID
syntax: $banID / $banID[(reason)] / $banID[(reason);(userID)]
description: Bans a user ID, with the reason as the first argument. All arguments are optional; without an ID, the last argument of the message is used.
---

# $banID

`$banID[reason;userID]` takes the reason first and the target ID second. Both arguments are optional (`$banID`, `$banID[reason]` and `$banID[reason;userID]` are all accepted). When the ID is omitted or empty, the last argument of the command message is used as the ID.

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
| `userID` | Optional. ID of the user to ban (positive integer). If empty, the last argument of the message. A missing or invalid ID raises "Missing or invalid user ID.". |

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
