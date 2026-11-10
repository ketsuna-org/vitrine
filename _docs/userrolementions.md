---
layout: doc
title: $userRoleMentions[]
translation_key: docs
category: "Server Helpers"
function_name: userRoleMentions
syntax: $userRoleMentions[userID;(separator)]
description: "Mentions (`<@&ID>`) of the roles a member holds, ready to display in an embed."
---
# $userRoleMentions — Mentions (`<@&ID>`) of the roles a member holds, ready to display in an embed

## Syntax

```
$userRoleMentions[userID;(separator)]
```

## Parameters

- **userID** *(ID, required)* — The member.
- **separator** *(text, optional)* — Default: a space.

## Return Value

- string.

## Usage

```
$userRoleMentions[1] → "<@&20> <@&40>"
```

## Example

```bdfd
$sendMessage[$userRoleMentions[1]]
```
