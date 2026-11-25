---
layout: doc
title: $entitlementStartsAt
translation_key: docs
category: "Monetization"
function_name: entitlementStartsAt
syntax: $entitlementStartsAt[skuID;userID;serverID]
description: Gives when the active Discord entitlement of a SKU started, as a Unix timestamp in seconds.
---

# $entitlementStartsAt

Gives when the active Discord entitlement of a SKU started, as a Unix timestamp in seconds. Bot Creator extension (not in the official BDFD wiki). Purchases happen at Discord: create the SKU in the Discord developer portal (Monetization). A right is active when it is not deleted, already started and not ended. Without a user or server argument, the author of the run is checked.

## Syntax

```
$entitlementStartsAt[skuID;userID;serverID]
```

## Parameters

| Parameter | Description |
|---|---|
| `skuID` | **Required.** The SKU ID. |
| `userID` | Optional. The user. Empty: the author of the run, unless a server is given. |
| `serverID` | Optional. The server. |

## Return Value

- **Type**: String
- Seconds since 1970 (the earliest start when there are several rights). Empty when there is no active right or when the right has no start date, as for test rights.

## Examples

```bdfd
Subscriber since <t:$entitlementStartsAt[1234567890123456789]:D>
```
