---
layout: doc
title: $oldInvite[]
translation_key: docs
category: "Events"
function_name: oldInvite
syntax: $oldInvite[property;(separator)]
description: "Previous state of the invite (empty when the event carries none). Properties: code, channelID, authorID, maxUses, maxAge, uses, temporary, timestamp."
---
# $oldInvite — Previous state of the invite (empty when the event carries none). Properties: code, channelID, authorID, maxUses, maxAge, uses, temporary, timestamp.

## Syntax

```
$oldInvite[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property
- **separator** *(String, optional)* — Separator for lists

## Return Value

- String.

## Usage

```
$oldInvite[property;separator] → result
```

## Example

```bdfd
$sendMessage[$oldInvite[property;separator]]
```
