---
layout: doc
title: $entitlementIsConsumed[]
translation_key: docs
category: "Events"
function_name: entitlementIsConsumed
syntax: $entitlementIsConsumed
description: "Returns whether the entitlement was consumed."
---
# $entitlementIsConsumed — Returns whether the entitlement was consumed.

## Syntax

```
$entitlementIsConsumed
```

## Parameters

None.

## Return Value

- Boolean.

## Usage

```
$entitlementIsConsumed → result
```

## Example

```bdfd
$sendMessage[$entitlementIsConsumed]
```
