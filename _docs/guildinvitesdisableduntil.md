---
layout: doc
title: $guildInvitesDisabledUntil[]
translation_key: docs
category: "Entity Info"
function_name: guildInvitesDisabledUntil
syntax: $guildInvitesDisabledUntil[guildID]
description: "Returns the invites disabled timestamp of a guild."
---
# $guildInvitesDisabledUntil — Returns the invites disabled timestamp of a guild.

## Syntax

```
$guildInvitesDisabledUntil[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Number.

## Usage

```
$guildInvitesDisabledUntil[guildID] → result
```

## Example

```bdfd
$sendMessage[Value: $guildInvitesDisabledUntil]
```
