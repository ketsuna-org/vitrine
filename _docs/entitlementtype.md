---
layout: doc
title: $entitlementType
translation_key: docs
category: "Monetization"
function_name: entitlementType
syntax: $entitlementType[skuID;userID;serverID]
description: Gives the Discord type of the active entitlement of a SKU, as a number.
---

# $entitlementType

Gives the Discord type of the active entitlement of a SKU, as a number. Bot Creator extension (not in the official BDFD wiki). Purchases happen at Discord: create the SKU in the Discord developer portal (Monetization). A right is active when it is not deleted, already started and not ended. Without a user or server argument, the author of the run is checked.

## Syntax

```
$entitlementType[skuID;userID;serverID]
```

## Parameters

| Parameter | Description |
|---|---|
| `skuID` | **Required.** The SKU ID. |
| `userID` | Optional. The user. Empty: the author of the run, unless a server is given. |
| `serverID` | Optional. The server. |

## Return Value

- **Type**: String
- The Discord entitlement type: `1` purchase, `2` premium subscription, `3` developer gift, `4` test mode purchase, `5` free purchase, `6` user gift, `7` premium purchase, `8` application subscription. Empty when there is no active right.

## Examples

```bdfd
$if[$entitlementType[1234567890123456789]==4]
  $sendMessage[Test purchase.]
$endif
```
