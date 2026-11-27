---
layout: doc
title: $entitlementIsDeleted[]
translation_key: docs
category: "Events"
function_name: entitlementIsDeleted
syntax: $entitlementIsDeleted
description: "Returns whether the entitlement was deleted."
---
# $entitlementIsDeleted — Returns whether the entitlement was deleted.

## Syntax

```
$entitlementIsDeleted
```

## Parameters

None.

## Return Value

- Boolean.

## Usage

```
$entitlementIsDeleted → result
```

## Example

```bdfd
$sendMessage[$entitlementIsDeleted]
```
