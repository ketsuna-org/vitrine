---
layout: doc
title: $setGuildDefaultMessageNotifications[]
translation_key: docs
category: "Moderation"
function_name: setGuildDefaultMessageNotifications
syntax: $setGuildDefaultMessageNotifications[guildID;(setting);(reason)]
description: "Sets the default message notifications setting for a guild, returns bool."
---
# $setGuildDefaultMessageNotifications — Sets the default message notifications setting for a guild, returns bool.

## Syntax

```
$setGuildDefaultMessageNotifications[guildID;(setting);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set default message notifications for
- **setting** *(text, optional)* — The new default message notifications setting
- **reason** *(text, optional)* — The reason for this action

## Return Value

- Boolean.

## Usage

```
$setGuildDefaultMessageNotifications[guildID;(setting);(reason)] → result
```

## Example

```bdfd
$sendMessage[$setGuildDefaultMessageNotifications[10;1]]
```
