---
layout: doc
title: $setAutomodExemptRoles[]
translation_key: docs
category: "AutoMod"
function_name: setAutomodExemptRoles
syntax: $setAutomodExemptRoles[roles]
description: "Stages the exempt roles (20 at most) for the next $editAutomodRule."
---
# $setAutomodExemptRoles — Stages the exempt roles (20 at most) for the next $editAutomodRule.

## Syntax

```
$setAutomodExemptRoles[roles]
```

## Parameters

- **roles** *(String, required)* — Role IDs

## Return Value

- None.

## Usage

```
$setAutomodExemptRoles[roles] → result
```

## Example

```bdfd
$sendMessage[$setAutomodExemptRoles[roles]]
```
