---
layout: doc
title: $entitlementCount
translation_key: docs
category: "Monetization"
function_name: entitlementCount
syntax: $entitlementCount[userID;serverID]
description: Counts the active Discord entitlements of a user or a server.
---

# $entitlementCount

Counts the active Discord entitlements of a user or a server. Bot Creator extension (not in the official BDFD wiki). Purchases happen at Discord: create the SKU in the Discord developer portal (Monetization). A right is active when it is not deleted, already started and not ended. Without a user or server argument, the author of the run is checked.

## Syntax

```
$entitlementCount[userID;serverID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional. The user. Empty: the author of the run, unless a server is given. |
| `serverID` | Optional. The server. |

## Return Value

- **Type**: String
- A number (`0` when there is none).

## Examples

```bdfd
You have $entitlementCount active purchase(s).
```
