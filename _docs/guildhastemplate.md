---
layout: doc
title: $guildHasTemplate[]
translation_key: docs
category: "Entity Info"
function_name: guildHasTemplate
syntax: $guildHasTemplate[guildID]
description: "Returns whether this guild has a template."
---
# $guildHasTemplate — Returns whether this guild has a template.

## Syntax

```
$guildHasTemplate[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to check for template

## Return Value

- Boolean.

## Usage

```
$guildHasTemplate[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildHasTemplate]
```
