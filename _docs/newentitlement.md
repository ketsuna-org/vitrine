---
layout: doc
title: $newEntitlement[]
translation_key: docs
category: "Events"
function_name: newEntitlement
syntax: $newEntitlement[property;(separator)]
description: "State of the entitlement of an entitlement event. Properties: id, skuID, userID, guildID, type, consumed, active, startTimestamp, endTimestamp."
---
# $newEntitlement — State of the entitlement of an entitlement event. Properties: id, skuID, userID, guildID, type, consumed, active, startTimestamp, endTimestamp.

## Syntax

```
$newEntitlement[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property
- **separator** *(String, optional)* — Separator for lists

## Return Value

- String.

## Usage

```
$newEntitlement[property;separator] → result
```

## Example

```bdfd
$sendMessage[$newEntitlement[property;separator]]
```
