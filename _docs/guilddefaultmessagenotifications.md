---
layout: doc
title: $guildDefaultMessageNotifications[]
translation_key: docs
category: "Entity Info"
function_name: guildDefaultMessageNotifications
syntax: $guildDefaultMessageNotifications[guildID]
description: "Returns the default message notifications for this guild."
---
# $guildDefaultMessageNotifications — Returns the default message notifications for this guild.

## Syntax

```
$guildDefaultMessageNotifications[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- GuildDefaultMessageNotifications.

## Usage

```
$guildDefaultMessageNotifications[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildDefaultMessageNotifications]
```
