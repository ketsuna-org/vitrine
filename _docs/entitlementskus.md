---
layout: doc
title: $entitlementSKUs
translation_key: docs
category: "Monetization"
function_name: entitlementSKUs
syntax: $entitlementSKUs[separator;userID;serverID]
description: Lists the SKU IDs of the active Discord entitlements of a user or a server.
---

# $entitlementSKUs

Lists the SKU IDs of the active Discord entitlements of a user or a server. Bot Creator extension (not in the official BDFD wiki). Purchases happen at Discord: create the SKU in the Discord developer portal (Monetization). A right is active when it is not deleted, already started and not ended. Without a user or server argument, the author of the run is checked.

## Syntax

```
$entitlementSKUs[separator;userID;serverID]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Optional. Text put between the IDs (default `, `). |
| `userID` | Optional. The user. Empty: the author of the run, unless a server is given. |
| `serverID` | Optional. The server. |

## Return Value

- **Type**: String
- The distinct SKU IDs, empty when there is no active right.

## Examples

```bdfd
$entitlementSKUs[;$authorID]
```
