---
layout: doc
title: $guildTimedOutMembers[]
translation_key: docs
category: "Entity Info"
function_name: guildTimedOutMembers
syntax: $guildTimedOutMembers[guildID;(separator)]
description: "Returns all current timed out members of a guild."
---
# $guildTimedOutMembers — Returns all current timed out members of a guild.

## Syntax

```
$guildTimedOutMembers[guildID;(separator)]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data
- **separator** *(text, optional)* — The separator to use for every member

## Return Value

- Member[].

## Usage

```
$guildTimedOutMembers[guildID;(separator)] → result
```

## Example

```bdfd
$sendMessage[Value: $guildTimedOutMembers[10;,]]
```
