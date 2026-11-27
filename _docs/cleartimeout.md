---
layout: doc
title: $clearTimeout[]
translation_key: docs
category: "Utilities"
function_name: clearTimeout
syntax: $clearTimeout[name]
description: "Cancels a timeout. Returns true when it existed."
---
# $clearTimeout — Cancels a timeout. Returns true when it existed.

## Syntax

```
$clearTimeout[name]
```

## Parameters

- **name** *(String, required)* — Timer name

## Return Value

- Boolean.

## Usage

```
$clearTimeout[name] → result
```

## Example

```bdfd
$sendMessage[$clearTimeout[name]]
```
