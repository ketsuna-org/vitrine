---
layout: doc
title: $guildApproximateMemberCount[]
translation_key: docs
category: "Entity Info"
function_name: guildApproximateMemberCount
syntax: $guildApproximateMemberCount[guildID]
description: "Returns the approximated member count."
---
# $guildApproximateMemberCount — Returns the approximated member count.

## Syntax

```
$guildApproximateMemberCount[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Number.

## Usage

```
$guildApproximateMemberCount[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildApproximateMemberCount]
```
