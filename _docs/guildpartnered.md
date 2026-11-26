---
layout: doc
title: $guildPartnered[]
translation_key: docs
category: "Entity Info"
function_name: guildPartnered
syntax: $guildPartnered[guildID]
description: "Returns whether the server is partnered."
---
# $guildPartnered — Returns whether the server is partnered.

## Syntax

```
$guildPartnered[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Boolean.

## Usage

```
$guildPartnered[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildPartnered]
```
