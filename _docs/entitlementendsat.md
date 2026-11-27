---
layout: doc
title: $entitlementEndsAt
translation_key: docs
category: "Monetization"
function_name: entitlementEndsAt
syntax: $entitlementEndsAt[skuID;userID;serverID]
description: Gives when the active Discord entitlement of a SKU ends, as a Unix timestamp in seconds.
---

# $entitlementEndsAt

Gives when the active Discord entitlement of a SKU ends, as a Unix timestamp in seconds. Bot Creator extension (not in the official BDFD wiki). Purchases happen at Discord: create the SKU in the Discord developer portal (Monetization). A right is active when it is not deleted, already started and not ended. Without a user or server argument, the author of the run is checked.

## Syntax

```
$entitlementEndsAt[skuID;userID;serverID]
```

## Parameters

| Parameter | Description |
|---|---|
| `skuID` | **Required.** The SKU ID. |
| `userID` | Optional. The user. Empty: the author of the run, unless a server is given. |
| `serverID` | Optional. The server. |

## Return Value

- **Type**: String
- Seconds since 1970, `never` when the right has no end date (lifetime or test right), empty when there is no active right. With several rights for the SKU, the latest end counts.

## Examples

```bdfd
Your subscription ends <t:$entitlementEndsAt[1234567890123456789]:R>
```
