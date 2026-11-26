---
layout: doc
title: $setGuildDmsDisabled[]
translation_key: docs
category: "Moderation"
function_name: setGuildDmsDisabled
syntax: $setGuildDmsDisabled[guildID;(duration)]
description: "Sets the guild's DMs activity disabled for a specific duration, returns bool"
---
# $setGuildDmsDisabled — Sets the guild's DMs activity disabled for a specific duration, returns bool

## Syntax

```
$setGuildDmsDisabled[guildID;(duration)]
```

## Parameters

- **guildID** *(id, required)* — The guild to disable DMs for
- **duration** *(text, optional)* — The duration for disabling DMs, omit to enable DMs again

## Return Value

- Boolean.

## Usage

```
$setGuildDmsDisabled[guildID;(duration)] → result
```

## Example

```bdfd
$sendMessage[$setGuildDmsDisabled[10;1h]]
```
