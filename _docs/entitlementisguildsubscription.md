---
layout: doc
title: $entitlementIsGuildSubscription[]
translation_key: docs
category: "Events"
function_name: entitlementIsGuildSubscription
syntax: $entitlementIsGuildSubscription
description: "Returns whether the entitlement belongs to a server."
---
# $entitlementIsGuildSubscription — Returns whether the entitlement belongs to a server.

## Syntax

```
$entitlementIsGuildSubscription
```

## Parameters

None.

## Return Value

- Boolean.

## Usage

```
$entitlementIsGuildSubscription → result
```

## Example

```bdfd
$sendMessage[$entitlementIsGuildSubscription]
```
