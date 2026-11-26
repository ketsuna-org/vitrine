---
layout: doc
title: $botTeamMembers[]
translation_key: docs
category: "Entity Info"
function_name: botTeamMembers
syntax: $botTeamMembers[property;(separator)]
description: "Returns the client's team members"
---
# $botTeamMembers — Returns the client's team members

## Syntax

```
$botTeamMembers[property;(separator)]
```

## Parameters

- **property** *(text, required)* — The property of each team member to return
- **separator** *(text, optional)* — The separator to use for every property

## Return Value

- Unknown[].

## Usage

```
$botTeamMembers[property;(separator)] → result
```

## Example

```bdfd
$sendMessage[$botTeamMembers]
```
