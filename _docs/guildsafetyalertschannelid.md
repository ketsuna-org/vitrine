---
layout: doc
title: $guildSafetyAlertsChannelID[]
translation_key: docs
category: "Entity Info"
function_name: guildSafetyAlertsChannelID
syntax: $guildSafetyAlertsChannelID[guildID]
description: "Returns the server's safety alerts channel ID."
---
# $guildSafetyAlertsChannelID — Returns the server's safety alerts channel ID.

## Syntax

```
$guildSafetyAlertsChannelID[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Channel.

## Usage

```
$guildSafetyAlertsChannelID[guildID] → result
```

## Example

```bdfd
$sendMessage[Value: $guildSafetyAlertsChannelID]
```
