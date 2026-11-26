---
layout: doc
title: $newInvite[]
translation_key: docs
category: "Events"
function_name: newInvite
syntax: $newInvite[property;(separator)]
description: "State of the invite of an invite event. Properties: code, channelID, authorID, maxUses, maxAge, uses, temporary, timestamp."
---
# $newInvite — State of the invite of an invite event. Properties: code, channelID, authorID, maxUses, maxAge, uses, temporary, timestamp.

## Syntax

```
$newInvite[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property
- **separator** *(String, optional)* — Separator for lists

## Return Value

- String.

## Usage

```
$newInvite[property;separator] → result
```

## Example

```bdfd
$sendMessage[$newInvite[property;separator]]
```
