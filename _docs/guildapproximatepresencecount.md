---
layout: doc
title: $guildApproximatePresenceCount[]
translation_key: docs
category: "Entity Info"
function_name: guildApproximatePresenceCount
syntax: $guildApproximatePresenceCount[guildID]
description: "Returns the approximated presence count."
---
# $guildApproximatePresenceCount — Returns the approximated presence count.

## Syntax

```
$guildApproximatePresenceCount[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Number.

## Usage

```
$guildApproximatePresenceCount[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildApproximatePresenceCount]
```
