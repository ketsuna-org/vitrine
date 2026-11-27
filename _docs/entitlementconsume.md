---
layout: doc
title: $entitlementConsume[]
translation_key: docs
category: "Monetization"
function_name: entitlementConsume
syntax: $entitlementConsume[sku]
description: "Marks the active one-time purchase of this SKU (or the entitlement with this ID) of the author as consumed. False when there is none to consume."
---
# $entitlementConsume — Marks the active one-time purchase of this SKU (or the entitlement with this ID) of the author as consumed. False when there is none to consume.

## Syntax

```
$entitlementConsume[sku]
```

## Parameters

- **sku** *(String, required)* — SKU ID or entitlement ID

## Return Value

- Boolean.

## Usage

```
$entitlementConsume[sku] → true or false
```

## Example

```bdfd
$sendMessage[$entitlementConsume[sku]]
```
