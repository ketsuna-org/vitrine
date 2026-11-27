---
layout: doc
title: $hasAllEntitlements[]
translation_key: docs
category: "Monetization"
function_name: hasAllEntitlements
syntax: $hasAllEntitlements[sku]
description: "Whether the author owns an active entitlement for every one of these SKUs."
---
# $hasAllEntitlements — Whether the author owns an active entitlement for every one of these SKUs.

## Syntax

```
$hasAllEntitlements[sku]
```

## Parameters

- **sku** *(String, required)* — SKU ID (repeat for several)

## Return Value

- Boolean.

## Usage

```
$hasAllEntitlements[sku] → result
```

## Example

```bdfd
$sendMessage[$hasAllEntitlements[sku]]
```
