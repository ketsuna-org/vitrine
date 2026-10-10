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

The `$botOwnerID` function **returns the Discord ID of the owner of the bot application**, as supplied by the running bot session.

## Syntax

```
$botOwnerID
```

## Parameters

None (passing one is an error).

## Return value

- **Type**: String
- The Discord ID of the bot owner (the owner of the Discord team that owns the application, or the owner of the application when there is no team), read from the context variable `bot.ownerId`.
- An empty string if the context holds no owner ID.

## Behavior

- No request is made to Discord by the function itself.
- Can be used for special privileges or notifications.

## Examples

### Owner contact command

```bdfd
$var[motif;$message[1]]
$if[$var[motif]==]
  $sendMessage[❌ Usage: !contact <message>]
  $stop
$endif

$sendMessage[✅ Your message has been forwarded to the bot owner.]

$dm[$botOwnerID]
📬 **Contact from $username** ($authorID)
Server: $serverName ($guildID)
Message: $var[motif]
```

### Owner-only access

```bdfd
$if[$authorID!=$botOwnerID]
  $ephemeral
  $sendMessage[❌ This command is reserved for the bot owner.]
  $stop
$endif

$c[Code reserved for the owner]
$sendMessage[✅ Owner command executed.]
```

### Information bot

```bdfd
$title[🤖 $botName]
$addField[Owner;<@$botOwnerID>;yes]
$addField[ID;$botID;yes]
$addField[Node;$botNode;yes]
$addField[Version;$nodeVersion;yes]
$thumbnail[$userAvatar[$botID]]
$color[#5865F2]
```

## Notes

- Mentioning the owner: `<@$botOwnerID>`.
- To get the name of the owner, use `$username[$botOwnerID]`.
- `$dm[$botOwnerID]` sends the command's main response (the text written outside `$sendMessage[]`) to the owner's private messages.
