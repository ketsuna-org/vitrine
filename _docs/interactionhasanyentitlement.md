---
layout: doc
title: $interactionHasAnyEntitlement[]
translation_key: docs
category: "Monetization"
function_name: interactionHasAnyEntitlement
syntax: $interactionHasAnyEntitlement[sku]
description: "Alias of $hasAnyEntitlement."
---
# $interactionHasAnyEntitlement — Alias of $hasAnyEntitlement.

## Syntax

```
$interactionHasAnyEntitlement[sku]
```

## Parameters

- **sku** *(String, required)* — SKU ID (repeat for several)

## Return Value

- Boolean.

## Usage

```
$interactionHasAnyEntitlement[sku] → result
```

## Example

```bdfd
$sendMessage[$interactionHasAnyEntitlement[sku]]
```
