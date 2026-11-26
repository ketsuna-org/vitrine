---
layout: doc
title: $newMember[]
translation_key: docs
category: "Events"
function_name: newMember
syntax: $newMember[property;(separator)]
description: "State of the member after an update (guildMemberUpdate). Properties: id, nickname, displayName, avatar, roles, roleCount, timeout, timedOutUntil, boosting, timestamp, mention, addedRoles, removedRoles."
---
# $newMember — State of the member after an update (guildMemberUpdate). Properties: id, nickname, displayName, avatar, roles, roleCount, timeout, timedOutUntil, boosting, timestamp, mention, addedRoles, removedRoles.

## Syntax

```
$newMember[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property to read; see the list above
- **separator** *(String, optional)* — Separator for list values (default comma)

## Return Value

- String.

## Usage

```
$newMember[property;(separator)] → value
```

## Example

```bdfd
$sendMessage[$newMember[property;(separator)]]
```
