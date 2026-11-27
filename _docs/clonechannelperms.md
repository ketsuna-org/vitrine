---
layout: doc
title: $cloneChannelPerms[]
translation_key: docs
category: "Moderation"
function_name: cloneChannelPerms
syntax: $cloneChannelPerms[channelID;channelID]
description: "Clones the given channel's perms to another channel, returns bool"
---
# $cloneChannelPerms — Clones the given channel's perms to another channel, returns bool

## Syntax

```
$cloneChannelPerms[channelID;channelID]
```

## Parameters

- **channelID** *(id, required)* — The channel to clone its perms
- **channelID** *(id, required)* — The other channel to set new perms for

## Return Value

- Boolean.

## Usage

```
$cloneChannelPerms[channelID;channelID] → result
```

## Example

```bdfd
$sendMessage[$cloneChannelPerms[30;31]]
```
