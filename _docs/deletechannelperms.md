---
layout: doc
title: $deleteChannelPerms[]
translation_key: docs
category: "Moderation"
function_name: deleteChannelPerms
syntax: $deleteChannelPerms[channelID;id;perms...]
description: "Deletes some permission overwrites from a channel, returns bool"
---
# $deleteChannelPerms — Deletes some permission overwrites from a channel, returns bool

## Syntax

```
$deleteChannelPerms[channelID;id;perms...]
```

## Parameters

- **channelID** *(id, required)* — The channel to clear perms from
- **id** *(id, required)* — The role or member id to clear these perms for
- **perms...** *(text, required)* — The perms to clear from the id

## Return Value

- Boolean.

## Usage

```
$deleteChannelPerms[channelID;id;perms...] → result
```

## Example

```bdfd
$sendMessage[$deleteChannelPerms[30;71;SendMessages]]
```
