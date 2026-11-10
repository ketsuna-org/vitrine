---
layout: doc
title: $hasAnyRole[]
translation_key: docs
category: "Server Helpers"
function_name: hasAnyRole
syntax: $hasAnyRole[userID;roleIDs;(separator)]
description: "Tells whether a member has at least one of several roles. `$hasRole` only tests one."
---
# $hasAnyRole — Tells whether a member has at least one of several roles

## Syntax

```
$hasAnyRole[userID;roleIDs;(separator)]
```

## Parameters

- **userID** *(ID, required)* — The member.
- **roleIDs** *(text, required)* — The role IDs, joined by the separator.
- **separator** *(text, optional)* — Default: `,`.

## Return Value

- `true` or `false`.

## Usage

```
$hasAnyRole[1;20,30] → "true"
```

## Important Notes

- `@everyone` counts as held by every member.
- An empty list gives `false`.

## Example

```bdfd
$sendMessage[$hasAnyRole[1;20,30]]
```
