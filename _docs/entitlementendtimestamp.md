---
layout: doc
title: $entitlementEndTimestamp[]
translation_key: docs
category: "Events"
function_name: entitlementEndTimestamp
syntax: $entitlementEndTimestamp
description: "Returns when the entitlement ends, in milliseconds."
---
# $entitlementEndTimestamp — Returns when the entitlement ends, in milliseconds.

## Syntax

```
$entitlementEndTimestamp
```

## Parameters

None.

## Return Value

- Number.

## Usage

```
$entitlementEndTimestamp → result
```

## Example

```bdfd
$sendMessage[$entitlementEndTimestamp]
```
