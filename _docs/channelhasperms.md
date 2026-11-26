---
layout: doc
title: $channelHasPerms[]
translation_key: docs
category: "Entity Info"
function_name: channelHasPerms
syntax: $channelHasPerms[channelID;id;permissions...]
description: "Returns whether role or member has perms in a channel"
---
# $channelHasPerms — Returns whether role or member has perms in a channel

## Syntax

```
$channelHasPerms[channelID;id;permissions...]
```

## Parameters

- **channelID** *(id, required)* — The channel to get perms from
- **id** *(id, required)* — The role or user to get perms of
- **permissions...** *(text, required)* — The perms to check for

## Return Value

- Boolean.

## Usage

```
$channelHasPerms[channelID;id;permissions...] → result
```

## Example

```bdfd
$sendMessage[$channelHasPerms[30;71;ViewChannel]]
```
