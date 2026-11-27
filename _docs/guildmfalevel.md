---
layout: doc
title: $guildMFALevel[]
translation_key: docs
category: "Entity Info"
function_name: guildMFALevel
syntax: $guildMFALevel[guildID]
description: "Returns the mfa level for this guild."
---
# $guildMFALevel — Returns the mfa level for this guild.

## Syntax

```
$guildMFALevel[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- GuildMFALevel.

## Usage

```
$guildMFALevel[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildMFALevel]
```
