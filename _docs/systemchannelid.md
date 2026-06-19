---
layout: doc
title: $systemChannelID[]
translation_key: docs
category: "Entity Info"
function_name: systemChannelID
syntax: $systemChannelID
description: Returns the identifier (ID) of the system messages channel configured on the Discord server (welcome and boost messages).
---

# $systemChannelID[] — System Messages Channel

`$systemChannelID[]` returns the ID of the channel where Discord sends automatic system messages: new member announcements, Nitro boost messages, etc.

## Syntax

```
$systemChannelID
```

## Parameters

No parameters.

## Return Value

- **Type**: `string`
- The ID of the system channel, or an empty string if not configured.

## Usage

### Simple Display

```bdfd
$if[$systemChannelID!=]
$sendMessage[📢 System messages are sent in <#$systemChannelID>]
$else
$sendMessage[ℹ️ No system channel is configured.]
$endif
```

### Embed Configuration

```bdfd
$title[⚙️ Configuration of $serverName]
$addField[📢 System Channel;$if[$systemChannelID!=]<#$systemChannelID>$elseNot configured$endif;yes]
$addField[📋 Rules Channel;$if[$rulesChannelID!=]<#$rulesChannelID>$elseNot configured$endif;yes]
$addField[💤 AFK Channel;$if[$afkChannelID!=]<#$afkChannelID>$elseNot configured$endif;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Configuration Log

```bdfd
$log[Configuration $serverName | System: $systemChannelID | Rules: $rulesChannelID | AFK: $afkChannelID]
```

### Contextual Help Message

```bdfd
$if[$systemChannelID==$channelID]
$sendMessage[ℹ️ You are in the system messages channel. New members and boosts are announced here.]
$endif
```

## Notes

- The system channel is configured in the server settings ("Overview" tab).
- Messages regarding new members and Nitro boosts are automatically posted in this channel.
- If the channel is not configured, system messages are not sent.
- This channel is distinct from the rules channel (`$rulesChannelID[]`).
