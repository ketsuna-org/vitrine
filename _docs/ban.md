---
layout: doc
title: $ban
translation_key: docs
category: "Moderation"
function_name: ban
syntax: $ban[(reason)]
description: Bans the first mentioned user with an optional reason.
---

# $ban

`$ban` bans the first mentioned user in the triggering message. Its argument is the optional reason, not a user ID.

## Syntax

```text
$ban
$ban[reason]
```

## Examples

### Prefix command example

Configure a prefix command named `ban`, then invoke `!ban @member`.

```bdfd
$nomention
$onlyPerms[banmembers;You need Ban Members permission.]
$onlyBotPerms[banmembers;The bot needs Ban Members permission.]
$onlyIf[$mentioned[1]!=;Usage: !ban @member]
$onlyIf[$mentioned[1]!=$authorID;You cannot ban yourself.]
$onlyIf[$mentioned[1]!=$serverOwner;The server owner cannot be banned.]
$ban[Spam]
Member banned for spam.
```

With no mention in the message, the call fails with "Missing or invalid user ID." (there is no fallback to the author). The reason is limited to 512 characters. The bot must have a highest role above the target's highest role. This function returns no text and does not delete past messages. Message deletion is not an argument of this BDFD function. To specify an ID explicitly, use `$banID[reason;userID]`.
