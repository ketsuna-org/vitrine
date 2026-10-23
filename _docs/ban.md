---
layout: doc
title: $ban
category: "Moderation"
function_name: ban
syntax: $ban[(reason)]
description: Bans the first mentioned user with an optional reason.
locale: en
translation_key: doc-ban
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
$onlyIf[$mentioned[1;no]!=;Usage: !ban @member]
$onlyIf[$mentioned[1;no]!=$authorID;You cannot ban yourself.]
$onlyIf[$mentioned[1;no]!=$serverOwner;The server owner cannot be banned.]
$ban[Spam]
Member banned for spam.
```

With no mention in the message, the call fails with "Missing or invalid user ID." (there is no fallback to the author). The reason is limited to 512 characters. The bot must have a highest role above the target's highest role. This function returns no text and does not delete past messages. Message deletion is not an argument of this BDFD function. To specify an ID explicitly, use `$banID[reason;userID]`.

In a slash command `$mentioned` is not available (it raises `Use message options for slash commands.`) and there is no mention to ban: use `$banID[$message[reason];$message[member]]`, where `$message[member]` is the ID of a `user` option. A complete slash and prefix example is on the [`$banID`](/docs/banid/) page. In prefix guards, always write `$mentioned[1;no]`: the default would return the command author when nobody is mentioned.
