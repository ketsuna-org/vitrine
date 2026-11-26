---
layout: doc
title: $oldEntitlement[]
translation_key: docs
category: "Events"
function_name: oldEntitlement
syntax: $oldEntitlement[property;(separator)]
description: "Previous state of the entitlement (empty when the event carries none). Properties: id, skuID, userID, guildID, type, consumed, active, startTimestamp, endTimestamp."
---
# $oldEntitlement — Previous state of the entitlement (empty when the event carries none). Properties: id, skuID, userID, guildID, type, consumed, active, startTimestamp, endTimestamp.

## Syntax

```
$oldEntitlement[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property
- **separator** *(String, optional)* — Separator for lists

## Return Value

- String.

## Usage

```
$oldEntitlement[property;separator] → result
```

## Example

```bdfd
$sendMessage[$oldEntitlement[property;separator]]
```
