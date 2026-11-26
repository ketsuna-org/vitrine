---
layout: doc
title: $guildVerified[]
translation_key: docs
category: "Entity Info"
function_name: guildVerified
syntax: $guildVerified[guildID]
description: "Returns whether the server is verified."
---
# $guildVerified — Returns whether the server is verified.

## Syntax

```
$guildVerified[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Boolean.

## Usage

```
$guildVerified[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildVerified]
```
