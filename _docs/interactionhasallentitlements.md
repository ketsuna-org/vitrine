---
layout: doc
title: $interactionHasAllEntitlements[]
translation_key: docs
category: "Monetization"
function_name: interactionHasAllEntitlements
syntax: $interactionHasAllEntitlements[sku]
description: "Alias of $hasAllEntitlements."
---
# $interactionHasAllEntitlements — Alias of $hasAllEntitlements.

## Syntax

```
$interactionHasAllEntitlements[sku]
```

## Parameters

- **sku** *(String, required)* — SKU ID (repeat for several)

## Return Value

- Boolean.

## Usage

```
$interactionHasAllEntitlements[sku] → result
```

## Example

```bdfd
$sendMessage[$interactionHasAllEntitlements[sku]]
```
