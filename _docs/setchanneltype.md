---
layout: doc
title: $setChannelType[]
translation_key: docs
category: "Components & Interactions"
function_name: setChannelType
syntax: $setChannelType[types...]
description: "Sets channel types for the last select menu"
---
# $setChannelType — Sets channel types for the last select menu

## Syntax

```
$setChannelType[types...]
```

## Parameters

- **types...** *(text, required)* — The channel types to set

## Return Value

- String.

## Usage

```
$setChannelType[types...] → result
```

## Example

```bdfd
$addChannelSelectMenu[c]$addChannelType[GuildText]$setChannelType[GuildForum]
```
