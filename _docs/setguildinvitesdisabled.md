---
layout: doc
title: $setGuildInvitesDisabled[]
translation_key: docs
category: "Moderation"
function_name: setGuildInvitesDisabled
syntax: $setGuildInvitesDisabled[guildID;(duration)]
description: "Sets the guild's invites disabled for a specific duration, returns bool"
---
# $setGuildInvitesDisabled — Sets the guild's invites disabled for a specific duration, returns bool

## Syntax

```
$setGuildInvitesDisabled[guildID;(duration)]
```

## Parameters

- **guildID** *(id, required)* — The guild to disable invites for
- **duration** *(text, optional)* — The duration for disabling invites, omit to enable invites again

## Return Value

- Boolean.

## Usage

```
$setGuildInvitesDisabled[guildID;(duration)] → result
```

## Example

```bdfd
$sendMessage[$setGuildInvitesDisabled[10;30m]]
```
