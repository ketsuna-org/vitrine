---
layout: doc
title: $roleMemberCount[]
translation_key: docs
category: "Server Helpers"
function_name: roleMemberCount
syntax: $roleMemberCount[roleID]
description: "Number of members that have a role, without listing their IDs."
---
# $roleMemberCount — Number of members that have a role, without listing their IDs

## Syntax

```
$roleMemberCount[roleID]
```

## Parameters

- **roleID** *(ID, required)* — The role.

## Return Value

- number.

## Usage

```
$roleMemberCount[123] → "42"
```

## Example

```bdfd
$sendMessage[$roleMemberCount[123]]
```
