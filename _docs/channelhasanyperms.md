---
layout: doc
title: $channelHasAnyPerms[]
translation_key: docs
category: "Entity Info"
function_name: channelHasAnyPerms
syntax: $channelHasAnyPerms[channelID;id;permissions...]
description: "Returns whether role or member has any of the perms in a channel"
---
# $channelHasAnyPerms — Returns whether role or member has any of the perms in a channel

## Syntax

```
$channelHasAnyPerms[channelID;id;permissions...]
```

## Parameters

- **channelID** *(id, required)* — The channel to get perms from
- **id** *(id, required)* — The role or user to get perms of
- **permissions...** *(text, required)* — The perms to check for

## Return Value

- Boolean.

## Usage

```
$channelHasAnyPerms[channelID;id;permissions...] → result
```

## Example

```bdfd
$sendMessage[$channelHasAnyPerms[30;71;SendMessages;ViewChannel]]
```
