---
layout: doc
title: $setGuildVerificationLevel[]
translation_key: docs
category: "Moderation"
function_name: setGuildVerificationLevel
syntax: $setGuildVerificationLevel[guildID;(level);(reason)]
description: "Sets the verification level of a guild, returns bool."
---
# $setGuildVerificationLevel — Sets the verification level of a guild, returns bool.

## Syntax

```
$setGuildVerificationLevel[guildID;(level);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set verification level on
- **level** *(text, optional)* — The new verification level
- **reason** *(text, optional)* — The reason for this action

## Return Value

- Boolean.

## Usage

```
$setGuildVerificationLevel[guildID;(level);(reason)] → result
```

## Example

```bdfd
$sendMessage[$setGuildVerificationLevel[10;2]]
```
