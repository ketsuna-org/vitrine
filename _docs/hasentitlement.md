---
layout: doc
title: $hasEntitlement
translation_key: docs
category: "Monetization"
function_name: hasEntitlement
syntax: $hasEntitlement[skuID;userID;serverID]
description: Checks if a user or a server has an active Discord entitlement (paid subscription or purchase) for a SKU. Returns true or false.
---

# $hasEntitlement

Checks if a user or a server has an active Discord entitlement (paid subscription or purchase) for a SKU. Returns true or false. Bot Creator extension (not in the official BDFD wiki). Purchases happen at Discord: create the SKU in the Discord developer portal (Monetization). A right is active when it is not deleted, already started and not ended. Without a user or server argument, the author of the run is checked.

## Syntax

```
$hasEntitlement[skuID;userID;serverID]
```

## Parameters

| Parameter | Description |
|---|---|
| `skuID` | **Required.** The SKU ID (digits only, otherwise `Invalid SKU ID.`). |
| `userID` | Optional. The user to check. Empty: the author of the run, unless a server is given. |
| `serverID` | Optional. The server to check (server subscription). A right of the user OR of the server counts. |

## Return Value

- **Type**: String
- `true` if an active right exists, `false` otherwise.

## Examples

```bdfd
$if[$hasEntitlement[1234567890123456789]==true]
  $sendMessage[Welcome, supporter!]
$else
  $sendMessage[This command is for subscribers.]
$endif
```
