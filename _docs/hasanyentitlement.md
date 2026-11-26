---
layout: doc
title: $hasAnyEntitlement[]
translation_key: docs
category: "Monetization"
function_name: hasAnyEntitlement
syntax: $hasAnyEntitlement[sku]
description: "Whether the author owns an active entitlement for at least one of these SKUs."
---
# $hasAnyEntitlement — Whether the author owns an active entitlement for at least one of these SKUs.

## Syntax

```
$hasAnyEntitlement[sku]
```

## Parameters

- **sku** *(String, required)* — SKU ID (repeat for several)

## Return Value

- Boolean.

## Usage

```
$hasAnyEntitlement[sku] → result
```

## Example

```bdfd
$sendMessage[$hasAnyEntitlement[sku]]
```
