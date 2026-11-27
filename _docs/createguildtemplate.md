---
layout: doc
title: $createGuildTemplate[]
translation_key: docs
category: "Moderation"
function_name: createGuildTemplate
syntax: $createGuildTemplate[guildID;name;(description)]
description: "Creates template for a guild, returns template code"
---
# $createGuildTemplate — Creates template for a guild, returns template code

## Syntax

```
$createGuildTemplate[guildID;name;(description)]
```

## Parameters

- **guildID** *(id, required)* — The guild to create template on
- **name** *(text, required)* — The name for the template
- **description** *(text, optional)* — The description for the template

## Return Value

- Template.

## Usage

```
$createGuildTemplate[guildID;name;(description)] → result
```

## Example

```bdfd
$sendMessage[$createGuildTemplate[10;Starter]]
```
