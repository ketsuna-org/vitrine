---
layout: doc
title: $getGuildPreview[]
translation_key: docs
category: "Entity Info"
function_name: getGuildPreview
syntax: $getGuildPreview[guildID;(property);(separator)]
description: "Returns the preview of a guild."
---
# $getGuildPreview — Returns the preview of a guild.

## Syntax

```
$getGuildPreview[guildID;(property);(separator)]
```

## Parameters

- **guildID** *(text, required)* — The guild to fetch preview from
- **property** *(text, optional)* — The property to return
- **separator** *(text, optional)* — The separator to use in case of array

## Return Value

- Json,Unknown.

## Usage

```
$getGuildPreview[guildID;(property);(separator)] → result
```

## Example

```bdfd
$sendMessage[$getGuildPreview[10;approximate_member_count]]
```
