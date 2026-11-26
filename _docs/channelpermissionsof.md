---
layout: doc
title: $channelPermissionsOf[]
translation_key: docs
category: "Entity Info"
function_name: channelPermissionsOf
syntax: $channelPermissionsOf[channelID;id;state;(separator)]
description: "Returns specific permissions of a role or member in a channel"
---
# $channelPermissionsOf — Returns specific permissions of a role or member in a channel

## Syntax

```
$channelPermissionsOf[channelID;id;state;(separator)]
```

## Parameters

- **channelID** *(id, required)* — The channel to get perms from
- **id** *(id, required)* — The role or user to get perms of
- **state** *(text, required)* — The state of the perms to return
- **separator** *(text, optional)* — The separator to use for every perm

## Return Value

- PermissionFlagsBits[].

## Usage

```
$channelPermissionsOf[channelID;id;state;(separator)] → result
```

## Example

```bdfd
$sendMessage[$channelPermissionsOf[30;71;allow;,]]
```
