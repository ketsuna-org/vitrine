---
layout: doc
title: $entitlementIsUserSubscription[]
translation_key: docs
category: "Events"
function_name: entitlementIsUserSubscription
syntax: $entitlementIsUserSubscription
description: "Returns whether the entitlement belongs to a user."
---
# $entitlementIsUserSubscription — Returns whether the entitlement belongs to a user.

## Syntax

```
$entitlementIsUserSubscription
```

## Parameters

None.

## Return Value

- Boolean.

## Usage

```
$entitlementIsUserSubscription → result
```

## Example

```bdfd
$sendMessage[$entitlementIsUserSubscription]
```
