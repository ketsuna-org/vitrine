---
layout: doc
title: $editAutomodRule[]
translation_key: docs
category: "Moderation"
function_name: editAutomodRule
syntax: $editAutomodRule[guildID;ruleID;(name);(event);(enabled);(reason)]
description: "Edits an automod rule on a guild, returns bool"
---
# $editAutomodRule — Edits an automod rule on a guild, returns bool

## Syntax

```
$editAutomodRule[guildID;ruleID;(name);(event);(enabled);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to edit automod rule on
- **ruleID** *(id, required)* — The automod rule to edit
- **name** *(text, optional)* — The new name for the automod rule
- **event** *(text, optional)* — The new event type for the automod rule
- **enabled** *(boolean, optional)* — Whether the automod rule should be enabled
- **reason** *(text, optional)* — The reason for editing the automod rule

## Return Value

- Boolean.

## Usage

```
$editAutomodRule[guildID;ruleID;(name);(event);(enabled);(reason)] → result
```

## Example

```bdfd
$sendMessage[$editAutomodRule[10;500;Renamed;;true]]
```
