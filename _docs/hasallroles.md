---
layout: doc
title: $hasAllRoles[]
translation_key: docs
category: "Server Helpers"
function_name: hasAllRoles
syntax: $hasAllRoles[userID;roleIDs;(separator)]
description: "Tells whether a member has every role of a list."
---
# $hasAllRoles — Tells whether a member has every role of a list

## Syntax

```
$hasAllRoles[userID;roleIDs;(separator)]
```

## Parameters

- **userID** *(ID, required)* — The member.
- **roleIDs** *(text, required)* — The role IDs.
- **separator** *(text, optional)* — Default: `,`.

## Return Value

- `true` or `false`.

## Usage

```
$hasAllRoles[1;20,40] → "true"
```

## Example

```bdfd
$sendMessage[$hasAllRoles[1;20,40]]
```
