---
layout: doc
title: $entitlementID[]
translation_key: docs
category: "Events"
function_name: entitlementID
syntax: $entitlementID
description: "Returns the ID of the entitlement of the current event."
---
# $entitlementID — Returns the ID of the entitlement of the current event.

## Syntax

```
$entitlementID
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$entitlementID → result
```

## Example

```bdfd
$sendMessage[$entitlementID]
```
