---
layout: doc
title: $guildRoleIDs[]
translation_key: docs
category: "Entity Info"
function_name: guildRoleIDs
syntax: $guildRoleIDs[guildID;(separator);(everyone)]
description: "Returns every role id of the guild."
---
# $guildRoleIDs — Returns every role id of the guild.

## Syntax

```
$guildRoleIDs[guildID;(separator);(everyone)]
```

## Parameters

- **guildID** *(id, required)* — The guild to get role ids from
- **separator** *(text, optional)* — The separator to use for every role
- **everyone** *(yes/no, optional)* — Whether to include the @everyone role, defaults to true

## Return Value

- Role[].

## Usage

```
$guildRoleIDs[guildID;(separator);(everyone)] → result
```

## Example

```bdfd
$sendMessage[$guildRoleIDs[10;,;true]]
```
