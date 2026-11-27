---
layout: doc
title: $entitlementUserID[]
translation_key: docs
category: "Events"
function_name: entitlementUserID
syntax: $entitlementUserID
description: "Returns the user ID of the entitlement of the current event."
---
# $entitlementUserID — Returns the user ID of the entitlement of the current event.

## Syntax

```
$entitlementUserID
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$entitlementUserID → result
```

## Example

```bdfd
$sendMessage[$entitlementUserID]
```
