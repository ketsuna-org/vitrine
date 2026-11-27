---
layout: doc
title: $setGuildMFALevel[]
translation_key: docs
category: "Moderation"
function_name: setGuildMFALevel
syntax: $setGuildMFALevel[guildID;level;(reason)]
description: "Sets the MFA level for a guild, returns bool"
---
# $setGuildMFALevel — Sets the MFA level for a guild, returns bool

## Syntax

```
$setGuildMFALevel[guildID;level;(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set MFA level for
- **level** *(text, required)* — The new MFA level
- **reason** *(text, optional)* — The reason for this action

## Return Value

- Boolean.

## Usage

```
$setGuildMFALevel[guildID;level;(reason)] → result
```

## Example

```bdfd
$sendMessage[$setGuildMFALevel[10;1]]
```
