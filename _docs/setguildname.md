---
layout: doc
title: $setGuildName[]
translation_key: docs
category: "Moderation"
function_name: setGuildName
syntax: $setGuildName[guildID;name;(reason)]
description: "Sets a guild name, returns boolean."
---
# $setGuildName — Sets a guild name, returns boolean.

## Syntax

```
$setGuildName[guildID;name;(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set name
- **name** *(text, required)* — The new name
- **reason** *(text, optional)* — The reason for this action

## Return Value

- Boolean.

## Usage

```
$setGuildName[guildID;name;(reason)] → result
```

## Example

```bdfd
$sendMessage[$setGuildName[10;New name]]
```
