---
layout: doc
title: $findGuild[]
translation_key: docs
category: "Entity Info"
function_name: findGuild
syntax: $findGuild[query;(returnguild)]
description: "Finds a guild"
---
# $findGuild — Finds a guild

## Syntax

```
$findGuild[query;(returnguild)]
```

## Parameters

- **query** *(text, required)* — The id or guild name to find
- **returnguild** *(boolean, optional)* — Returns the current guild id if none found

## Return Value

- Guild.

## Usage

```
$findGuild[query;(returnguild)] → result
```

## Example

```bdfd
$sendMessage[$findGuild[Other]]
```
