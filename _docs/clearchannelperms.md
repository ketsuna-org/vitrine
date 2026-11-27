---
layout: doc
title: $clearChannelPerms[]
translation_key: docs
category: "Moderation"
function_name: clearChannelPerms
syntax: $clearChannelPerms[channelID;(id)]
description: "Deletes all permission overwrites from the channel or given id, returns bool"
---
# $clearChannelPerms — Deletes all permission overwrites from the channel or given id, returns bool

## Syntax

```
$clearChannelPerms[channelID;(id)]
```

## Parameters

- **channelID** *(id, required)* — The channel to delete perms from
- **id** *(id, optional)* — The role or member id to delete all perms for

## Return Value

- Boolean.

## Usage

```
$clearChannelPerms[channelID;(id)] → result
```

## Example

```bdfd
$sendMessage[$clearChannelPerms[30]]
```
