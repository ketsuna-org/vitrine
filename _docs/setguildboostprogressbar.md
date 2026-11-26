---
layout: doc
title: $setGuildBoostProgressBar[]
translation_key: docs
category: "Moderation"
function_name: setGuildBoostProgressBar
syntax: $setGuildBoostProgressBar[guildID;enabled;(reason)]
description: "Sets a guild boost progress bar, returns bool."
---
# $setGuildBoostProgressBar — Sets a guild boost progress bar, returns bool.

## Syntax

```
$setGuildBoostProgressBar[guildID;enabled;(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set boost progress bar for
- **enabled** *(yes/no, required)* — Whether to enable the boost progress bar
- **reason** *(text, optional)* — The reason for enabling/disabling boost progress bar

## Return Value

- Boolean.

## Usage

```
$setGuildBoostProgressBar[guildID;enabled;(reason)] → result
```

## Example

```bdfd
$sendMessage[$setGuildBoostProgressBar[10;true]]
```
