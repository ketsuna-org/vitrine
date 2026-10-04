---
layout: doc
title: $banID
translation_key: docs
category: "Moderation"
function_name: banID
syntax: $banID[reason;(userID)]
description: Bans a user ID, with the reason as the first argument.
---

# $banID

`$banID[reason;userID]` takes the reason first and the target ID second. When the ID is omitted, Bot Creator uses the last message argument.

## Syntax

```text
$banID
$banID[reason]
$banID[reason;userID]
```

## Examples

### Explicit ID

Replace the sample ID with a real member ID before running this example.

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
$banID[Moderation; $message[1]]
Member banned successfully.
```

The bot needs a highest role above the target's highest role. Bot Creator currently checks the target's server membership before banning, so this implementation cannot promise a preventive ban of an absent user. The function returns no text and does not delete past messages.
