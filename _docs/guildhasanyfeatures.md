---
layout: doc
title: $guildHasAnyFeatures[]
translation_key: docs
category: "Entity Info"
function_name: guildHasAnyFeatures
syntax: $guildHasAnyFeatures[guildID;features]
description: "Returns whether this guild has any of the given features."
---
# $guildHasAnyFeatures — Returns whether this guild has any of the given features.

## Syntax

```
$guildHasAnyFeatures[guildID;features]
```

## Parameters

- **guildID** *(id, required)* — The guild to check for features
- **features** *(text, required)* — The features to check for

## Return Value

- Boolean.

## Usage

```
$guildHasAnyFeatures[guildID;features] → result
```

## Example

```bdfd
$sendMessage[$guildHasAnyFeatures[10;NEWS;PARTNERED]]
```
