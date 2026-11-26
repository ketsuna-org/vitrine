---
layout: doc
title: $entitlementGuildID[]
translation_key: docs
category: "Events"
function_name: entitlementGuildID
syntax: $entitlementGuildID
description: "Returns the server ID of the entitlement of the current event."
---
# $entitlementGuildID — Returns the server ID of the entitlement of the current event.

## Syntax

```
$entitlementGuildID
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$entitlementGuildID → result
```

## Example

```bdfd
$sendMessage[$entitlementGuildID]
```
