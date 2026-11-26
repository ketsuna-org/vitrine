---
layout: doc
title: $memberFlags[]
translation_key: docs
category: "Entity Info"
function_name: memberFlags
syntax: $memberFlags[guildID;userID;(separator)]
description: "Returns the flags of a member."
---
# $memberFlags — Returns the flags of a member.

## Syntax

```
$memberFlags[guildID;userID;(separator)]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull member from
- **userID** *(id, required)* — The user to get its flags
- **separator** *(text, optional)* — The separator to use for every flag

## Return Value

- GuildMemberFlags[].

## Usage

```
$memberFlags[guildID;userID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$memberFlags]
```
