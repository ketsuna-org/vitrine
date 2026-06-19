---
layout: doc
title: $botOwnerID
translation_key: docs
category: "Entity Info"
function_name: botOwnerID
syntax: $botOwnerID
description: Returns the Discord ID of the owner of the bot.
---

# $botOwnerID

The `$botOwnerID` function **returns the Discord ID of the bot owner**, as configured in the BDFD console.

## Syntax

```
$botOwnerID
```

## Parameters

None.

## Return value

- **Type**: String
- The Discord ID of the bot owner.

## Behavior

- Returns the ID of the account that registered the bot on BDFD.
- Fixed ID, only changes if the bot is transferred.
- Can be used for special privileges or notifications.

## Examples

### Owner contact command

```bdfd
$var[motif;$message[1]]
$if[$var[motif]==]
  $sendMessage[❌ Usage: !contact <message>]
  $stop
$endif

$sendDM[$botOwnerID;📬 **Contact from $userName** ($authorID)
Server: $serverName ($guildID)
Message: $var[motif]]

$sendMessage[✅ Your message has been forwarded to the bot owner.]
```

### Owner-only access

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ This command is reserved for the bot owner.]
  $stop
$endif

;; Code reserved for the owner
$sendMessage[✅ Owner command executed.]
```

### Information bot

```bdfd
$title[🤖 $botName]
$addField[Owner;<@$botOwnerID>;yes]
$addField[ID;$botID;yes]
$addField[Node;$botNode;yes]
$addField[Version;$nodeVersion;yes]
$thumbnail[$botAvatar]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Fixed ID, does not change without a transfer of ownership.
- Mentioning the owner: `<@$botOwnerID>`.
- To get the name of the owner, use `$userName[$botOwnerID]` (requires a shared server).
- To send a message to the owner, use `$sendDM[$botOwnerID;message]`.
