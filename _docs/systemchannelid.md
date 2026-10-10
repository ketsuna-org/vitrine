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

## Examples

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
$if[$systemChannelID!=]
  $var[sys;<#$systemChannelID>]
$else
  $var[sys;Not configured]
$endif
$if[$rulesChannelID!=]
  $var[rules;<#$rulesChannelID>]
$else
  $var[rules;Not configured]
$endif
$if[$afkChannelID!=]
  $var[afk;<#$afkChannelID>]
$else
  $var[afk;Not configured]
$endif
$title[⚙️ Configuration of $serverName]
$addField[📢 System Channel;$var[sys];yes]
$addField[📋 Rules Channel;$var[rules];yes]
$addField[💤 AFK Channel;$var[afk];yes]
$color[#5865F2]
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
