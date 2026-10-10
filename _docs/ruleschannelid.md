---
layout: doc
title: $rulesChannelID[]
translation_key: docs
category: "Entity Info"
function_name: rulesChannelID
syntax: $rulesChannelID[(guildID)]
description: Returns the ID of the rules channel of the server. Raises an error when the server has no rules channel set.
---

# $rulesChannelID[] — Rules Channel

`$rulesChannelID[]` returns the ID of the rules channel that Discord reports for the server.

## Syntax

```
$rulesChannelID[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | *(Optional)* The ID of a server. If omitted or empty, the current server is used. A non-empty value that is not a positive integer raises `Invalid guild ID.` |

## Return Value

- **Type**: `string`
- The ID of the rules channel.
- **No empty string**: if the server has no rules channel, the error `No rules channel set in this server.` is raised. Use `$try` / `$catch` / `$endTry` to handle it.

## Examples

### Simple Display

```bdfd
$try
  $sendMessage[📋 Server Rules: <#$rulesChannelID>]
$catch
  $sendMessage[ℹ️ This server does not have a dedicated rules channel.]
$endTry
```

### Welcome message with rules link

```bdfd
$sendMessage[Welcome $username!
Please read the rules here: <#$rulesChannelID> 📋]
```

### Server configuration embed

```bdfd
$title[⚙️ Configuration — $serverName]
$var[rules;Not configured]
$var[system;Not configured]
$var[afk;Not configured]
$try
  $var[rules;<#$rulesChannelID>]
$catch
$endTry
$try
  $var[system;<#$systemChannelID>]
$catch
$endTry
$try
  $var[afk;<#$afkChannelID>]
$catch
$endTry
$addField[📋 Rules;$var[rules];yes]
$addField[📢 System;$var[system];yes]
$addField[💤 AFK;$var[afk];yes]
$color[#5865F2]
```

### Redirection to rules

```bdfd
$try
  $if[$rulesChannelID!=$channelID]
    $sendMessage[⚠️ Please use commands in an appropriate channel. The rules are available here: <#$rulesChannelID>]
  $endif
$catch
$endTry
```

## Notes

- If Discord reports no rules channel for the server, the function raises an error instead of returning an empty string. The sibling functions `$systemChannelID` and `$afkChannelID` behave the same way (`No system channel set in this server.`, `No AFK channel set in this server.`).
