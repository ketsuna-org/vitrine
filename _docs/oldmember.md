---
layout: doc
title: $oldMember[]
translation_key: docs
category: "Events"
function_name: oldMember
syntax: $oldMember[property;(separator)]
description: "Previous state of the member before an update (guildMemberUpdate). Properties: id, nickname, displayName, avatar, roles, roleCount, timeout, timedOutUntil, boosting, timestamp, mention, addedRoles, removedRoles."
---
# $oldMember — Previous state of the member before an update (guildMemberUpdate). Properties: id, nickname, displayName, avatar, roles, roleCount, timeout, timedOutUntil, boosting, timestamp, mention, addedRoles, removedRoles.

## Syntax

```
$oldMember[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property to read; see the list above
- **separator** *(String, optional)* — Separator for list values (default comma)

## Return Value

- String.

## Usage

```
$oldMember[property;(separator)] → value
```

## Example

```bdfd
$sendMessage[$oldMember[property;(separator)]]
```
