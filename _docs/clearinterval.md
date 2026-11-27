---
layout: doc
title: $clearInterval[]
translation_key: docs
category: "Utilities"
function_name: clearInterval
syntax: $clearInterval[name]
description: "Cancels an interval. Returns true when it existed."
---
# $clearInterval — Cancels an interval. Returns true when it existed.

## Syntax

```
$clearInterval[name]
```

## Parameters

- **name** *(String, required)* — Timer name

## Return Value

- Boolean.

## Usage

```
$clearInterval[name] → result
```

## Example

```bdfd
$sendMessage[$clearInterval[name]]
```
