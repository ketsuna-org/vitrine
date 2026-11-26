---
layout: doc
title: $addDefaultChannelOption[]
translation_key: docs
category: "Components & Interactions"
function_name: addDefaultChannelOption
syntax: $addDefaultChannelOption[channelIDs...]
description: "Adds default channel options to the last select menu"
---
# $addDefaultChannelOption — Adds default channel options to the last select menu

## Syntax

```
$addDefaultChannelOption[channelIDs...]
```

## Parameters

- **channelIDs...** *(text, required)* — The channel ids

## Return Value

- String.

## Usage

```
$addDefaultChannelOption[channelIDs...] → result
```

## Example

```bdfd
$addChannelSelectMenu[c]$addDefaultChannelOption[31;32]
```
