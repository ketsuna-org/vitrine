---
layout: doc
title: $kick
translation_key: docs
category: "Moderation"
function_name: kick
syntax: $kick[userID;(reason)]
description: Kicks a specific user from the Discord server.
---

# $kick

`$kick[userID;reason]` kicks the specified member. The bot needs `Kick Members` and a highest role above the target's highest role. The server owner cannot be kicked.

## Syntax

```text
$kick[userID;(reason)]
```

`userID` is the target's Discord ID; `reason` is optional. The argument-free form `$kick` targets the command author. An explicitly empty target does not target the author: it fails with `Missing or invalid userId`.

## Examples

### Prefix command example

Configure a prefix command named `kick`. For `!kick @member`, `$mentioned[1]` selects the first mentioned user. A raw ID typed without a mention is not a mention.

```bdfd
$nomention
$onlyPerms[kickmembers;You need Kick Members permission.]
$onlyBotPerms[kickmembers;The bot needs Kick Members permission.]
$var[target;$mentioned[1]]
$onlyIf[$var[target]!=;Usage: !kick @member]
$onlyIf[$var[target]!=$authorID;You cannot kick yourself.]
$onlyIf[$var[target]!=$serverOwner;The server owner cannot be kicked.]
$kick[$var[target];Rules violation]
Member kicked successfully.
```

Replace the fixed reason with a value chosen by your command. For a slash command, use its configured user option instead of `$mentioned[1]`.

### Explicit ID

Replace the sample ID with a real member ID before running this example.

```bdfd
$onlyPerms[kickmembers;You need Kick Members permission.]
$kick[123456789012345678;Rules violation]
Member kicked successfully.
```

The function returns no text. A kicked member can rejoin with an invite.
