---
layout: doc
title: $entitlementStartTimestamp[]
translation_key: docs
category: "Events"
function_name: entitlementStartTimestamp
syntax: $entitlementStartTimestamp
description: "Returns when the entitlement starts, in milliseconds."
---
# $entitlementStartTimestamp — Returns when the entitlement starts, in milliseconds.

## Syntax

```
$entitlementStartTimestamp
```

## Parameters

None.

## Return Value

- Number.

## Usage

```
$entitlementStartTimestamp → result
```

## Example

```bdfd
$sendMessage[$entitlementStartTimestamp]
```
