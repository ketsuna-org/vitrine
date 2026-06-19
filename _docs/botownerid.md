---
layout: doc
title: $botOwnerID
translation_key: docs
category: "Entity Info"
function_name: botOwnerID
syntax: $botOwnerID
description: Returns the ID Discord du owner of the bot.
---

# $botOwnerID

The `$botOwnerID` function **returns the ID Discord du owner of the bot**, such as set in the console BDFD.

## Syntax

```
$botOwnerID
```

## Parameters

Aucun.

## Return value

- **Type** : String
- The ID Discord du owner of the bot.

## Behavior

- Returns the ID of the compte qui a enregistré the bot sur BDFD.
- ID fixe, ne change que if the bot est transféré.
- Utilisable pour des privilèges special or notifications.

## Examples

### Command contact owner

```bdfd
$var[motif;$message[1]]
$if[$var[motif]==]
  $sendMessage[❌ Usage: !contact <message>]
  $stop
$endif

$sendDM[$botOwnerID;📬 **Contact de $userName** ($authorID)
Server : $serverName ($guildID)
Message : $var[motif]]

$sendMessage[✅ Votre message has been transmis au owner of the bot.]
```

### Accès owner only

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ Cette command est réservée au owner of the bot.]
  $stop
$endif

;; Code réservé au owner
$sendMessage[✅ Command owner executede.]
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

- ID fixe, ne change pas without transfert de property.
- Mention du owner : `<@$botOwnerID>`.
- For the nom du owner, use `$userName[$botOwnerID]` (requires a server commun).
- Pour envoyer a message au owner, use `$sendDM[$botOwnerID;message]`.
