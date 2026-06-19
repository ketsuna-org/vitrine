---
layout: doc
title: $rulesChannelID[]
translation_key: docs
category: "Entity Info"
function_name: rulesChannelID
syntax: $rulesChannelID
description: Returns the identifier (ID) of the rules channel configured on the Discord server (Community server).
---

# $rulesChannelID[] — Rules Channel

`$rulesChannelID[]` returns the ID of the rules channel configured on a Discord Community server. This channel is shown to new members when they join the server.

> **Prerequisite**: The server must have the "Community" feature enabled in its settings.

## Syntax

```
$rulesChannelID
```

## Parameters

No parameters.

## Return Value

- **Type**: `string`
- The ID of the rules channel, or an empty string if not configured.

## Usage

### Simple Display

```bdfd
$if[$rulesChannelID!=]
  $sendMessage[📋 Server Rules: <#$rulesChannelID>]
$else
  $sendMessage[ℹ️ This server does not have a dedicated rules channel.]
$endif
```

### Welcome message with rules link

```bdfd
$sendMessage[Welcome $username! 
Please read the rules here: <#$rulesChannelID> 📋]
```

### Server configuration embed

```bdfd
$title[⚙️ Configuration — $serverName]
$addField[📋 Rules;$if[$rulesChannelID!=]<#$rulesChannelID>$elseNot configured$endif;yes]
$addField[📢 System;$if[$systemChannelID!=]<#$systemChannelID>$elseNot configured$endif;yes]
$addField[💤 AFK;$if[$afkChannelID!=]<#$afkChannelID>$elseNot configured$endif;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Redirection to rules

```bdfd
$if[$rulesChannelID!=$channelID]
  $sendMessage[⚠️ Please use commands in an appropriate channel. The rules are available here: <#$rulesChannelID>]
$endif
```

## Notes

- The rules channel is configured in the Community server settings.
- If the server is not a Community server, this function returns an empty string.
- Use `$serverFeatures[]` to check if the server has the `COMMUNITY` feature enabled.
- The channel is generally read-only for standard members.
