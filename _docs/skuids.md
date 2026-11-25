---
layout: doc
title: $skuIDs
translation_key: docs
category: "Monetization"
function_name: skuIDs
syntax: $skuIDs[separator]
description: Lists the SKU IDs of the bot application (its products on Discord).
---

# $skuIDs

Lists the SKU IDs of the bot application (its products on Discord). Bot Creator extension (not in the official BDFD wiki). Purchases happen at Discord: create the SKU in the Discord developer portal (Monetization). A right is active when it is not deleted, already started and not ended. Without a user or server argument, the author of the run is checked.

## Syntax

```
$skuIDs[separator]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Optional. Text put between the IDs (default `, `). |

## Return Value

- **Type**: String
- The SKU IDs, empty when the application has none.

## Examples

```bdfd
$skuIDs[ | ]
```
