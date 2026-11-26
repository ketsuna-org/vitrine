---
layout: doc
title: $guildHasFeatures[]
translation_key: docs
category: "Entity Info"
function_name: guildHasFeatures
syntax: $guildHasFeatures[guildID;features]
description: "Returns whether this guild has all the given features."
---
# $guildHasFeatures — Returns whether this guild has all the given features.

## Syntax

```
$guildHasFeatures[guildID;features]
```

## Parameters

- **guildID** *(id, required)* — The guild to check for features
- **features** *(text, required)* — The features to check for

## Return Value

- Boolean.

## Usage

```
$guildHasFeatures[guildID;features] → result
```

## Example

```bdfd
$sendMessage[$guildHasFeatures[10;COMMUNITY;PARTNERED]]
```
