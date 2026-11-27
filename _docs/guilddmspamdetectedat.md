---
layout: doc
title: $guildDmSpamDetectedAt[]
translation_key: docs
category: "Entity Info"
function_name: guildDmSpamDetectedAt
syntax: $guildDmSpamDetectedAt[guildID]
description: "Returns when a direct message spam was detected on a guild."
---
# $guildDmSpamDetectedAt — Returns when a direct message spam was detected on a guild.

## Syntax

```
$guildDmSpamDetectedAt[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Number.

## Usage

```
$guildDmSpamDetectedAt[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildDmSpamDetectedAt]
```
