---
layout: doc
title: $guildBoostProgressBarEnabled[]
translation_key: docs
category: "Entity Info"
function_name: guildBoostProgressBarEnabled
syntax: $guildBoostProgressBarEnabled[guildID]
description: "Returns whether a guild has the boost progress bar enabled."
---
# $guildBoostProgressBarEnabled — Returns whether a guild has the boost progress bar enabled.

## Syntax

```
$guildBoostProgressBarEnabled[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Boolean.

## Usage

```
$guildBoostProgressBarEnabled[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildBoostProgressBarEnabled]
```
