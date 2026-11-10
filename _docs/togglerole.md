---
layout: doc
title: $toggleRole[]
translation_key: docs
category: "Server Helpers"
function_name: toggleRole
syntax: $toggleRole[userID;roleID]
description: "Gives the role if the member does not have it, takes it away otherwise. Handy for role menus and buttons."
---
# $toggleRole — Gives the role if the member does not have it, takes it away otherwise

## Syntax

```
$toggleRole[userID;roleID]
```

## Parameters

- **userID** *(ID, required)* — The member.
- **roleID** *(ID, required)* — The role.

## Return Value

- `added` or `removed`.

## Usage

```
$toggleRole[$authorID;123] → "added"
```

## Example

```bdfd
$sendMessage[$toggleRole[$authorID;123]]
```
