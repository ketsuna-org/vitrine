---
layout: doc
title: $skuName
translation_key: docs
category: "Monetization"
function_name: skuName
syntax: $skuName[skuID]
description: Returns the name of a SKU of the bot application.
---

# $skuName

Returns the name of a SKU of the bot application. Bot Creator extension (not in the official BDFD wiki). Purchases happen at Discord: create the SKU in the Discord developer portal (Monetization). A right is active when it is not deleted, already started and not ended. Without a user or server argument, the author of the run is checked.

## Syntax

```
$skuName[skuID]
```

## Parameters

| Parameter | Description |
|---|---|
| `skuID` | **Required.** The SKU ID. |

## Return Value

- **Type**: String
- The SKU name, empty when the SKU does not exist.

## Examples

```bdfd
$skuName[1234567890123456789]
```
