---
layout: doc
title: $guildTemplateCode[]
translation_key: docs
category: "Entity Info"
function_name: guildTemplateCode
syntax: $guildTemplateCode[guildID]
description: "Returns the template code of a guild."
---
# $guildTemplateCode — Returns the template code of a guild.

## Syntax

```
$guildTemplateCode[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to get template from

## Return Value

- Template.

## Usage

```
$guildTemplateCode[guildID] → result
```

## Example

```bdfd
$sendMessage[Value: $guildTemplateCode]
```
