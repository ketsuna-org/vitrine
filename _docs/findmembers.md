---
layout: doc
title: $findMembers[]
translation_key: docs
category: "Entity Info"
function_name: findMembers
syntax: $findMembers[guildID;query;(limit);(enumvalue);(separator)]
description: "Finds member of a guild using a query"
---
# $findMembers — Finds member of a guild using a query

## Syntax

```
$findMembers[guildID;query;(limit);(enumvalue);(separator)]
```

## Parameters

- **guildID** *(id, required)* — The guild to use
- **query** *(text, required)* — The query to use
- **limit** *(number, optional)* — The limit of results
- **enumvalue** *(text, optional)* — The enum value to use
- **separator** *(text, optional)* — The separator to use for every result

## Return Value

- Unknown[].

## Usage

```
$findMembers[guildID;query;(limit);(enumvalue);(separator)] → result
```

## Example

```bdfd
$sendMessage[$findMembers[10;ali]]
```
