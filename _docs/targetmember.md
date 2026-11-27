---
layout: doc
title: $targetMember[]
translation_key: docs
category: "Interactions"
function_name: targetMember
syntax: $targetMember[property;(separator)]
description: "Property of the user a user context menu command was run on: id, nickname, displayName, avatar, banner, mention or guildID."
---
# $targetMember — Property of the user a user context menu command was run on: id, nickname, displayName, avatar, banner, mention or guildID.

## Syntax

```
$targetMember[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property
- **separator** *(String, optional)* — Ignored

## Return Value

- String.

## Usage

```
$targetMember[property;separator] → result
```

## Example

```bdfd
$sendMessage[$targetMember[property;separator]]
```
