---
layout: doc
title: $guildInviteExists[]
translation_key: docs
category: "Entity Info"
function_name: guildInviteExists
syntax: $guildInviteExists[guildID;code]
description: "Returns whether a guild invite code exists."
---
# $guildInviteExists — Returns whether a guild invite code exists.

## Syntax

```
$guildInviteExists[guildID;code]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull invites from
- **code** *(text, required)* — The invite to check

## Return Value

- Boolean.

## Usage

```
$guildInviteExists[guildID;code] → result
```

## Example

```bdfd
$sendMessage[$guildInviteExists[10;abc123]]
```
