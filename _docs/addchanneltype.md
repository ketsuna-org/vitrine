---
layout: doc
title: $addChannelType[]
translation_key: docs
category: "Components & Interactions"
function_name: addChannelType
syntax: $addChannelType[types...]
description: "Adds channel types to the last select menu"
---
# $addChannelType — Adds channel types to the last select menu

## Syntax

```
$addChannelType[types...]
```

## Parameters

- **types...** *(text, required)* — The channel types to add

## Return Value

- String.

## Usage

```
$addChannelType[types...] → result
```

## Example

```bdfd
$addChannelSelectMenu[c]$addChannelType[GuildText;GuildVoice]$addChannelType[GuildText]
```
