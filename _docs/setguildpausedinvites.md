---
layout: doc
title: $setGuildPausedInvites[]
translation_key: docs
category: "Moderation"
function_name: setGuildPausedInvites
syntax: $setGuildPausedInvites[guildID;disabled]
description: "Sets a guild paused invite status, returns bool"
---
# $setGuildPausedInvites — Sets a guild paused invite status, returns bool

## Syntax

```
$setGuildPausedInvites[guildID;disabled]
```

## Parameters

- **guildID** *(id, required)* — The guild to set paused invites for
- **disabled** *(boolean, required)* — Whether to disable the invites

## Return Value

- Boolean.

## Usage

```
$setGuildPausedInvites[guildID;disabled] → result
```

## Example

```bdfd
$sendMessage[$setGuildPausedInvites[10;true]]
```
