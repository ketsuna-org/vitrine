---
layout: doc
title: $oldRole[]
translation_key: docs
category: "Events"
function_name: oldRole
syntax: $oldRole[property;(separator)]
description: "Previous state of the role before an update (guildRoleUpdate). Properties: id, name, color, permissions, position, rawPosition, mentionable, hoisted."
---
# $oldRole — Previous state of the role before an update (guildRoleUpdate). Properties: id, name, color, permissions, position, rawPosition, mentionable, hoisted.

## Syntax

```
$oldRole[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property to read; see the list above
- **separator** *(String, optional)* — Separator for list values (default comma)

## Return Value

- String.

## Usage

```
$oldRole[property;(separator)] → value
```

## Example

```bdfd
$sendMessage[$oldRole[property;(separator)]]
```
