---
layout: doc
title: $newRole[]
translation_key: docs
category: "Events"
function_name: newRole
syntax: $newRole[property;(separator)]
description: "State of the role after an update (guildRoleUpdate). Properties: id, name, color, permissions, position, rawPosition, mentionable, hoisted."
---
# $newRole — State of the role after an update (guildRoleUpdate). Properties: id, name, color, permissions, position, rawPosition, mentionable, hoisted.

## Syntax

```
$newRole[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property to read; see the list above
- **separator** *(String, optional)* — Separator for list values (default comma)

## Return Value

- String.

## Usage

```
$newRole[property;(separator)] → value
```

## Example

```bdfd
$sendMessage[$newRole[property;(separator)]]
```
