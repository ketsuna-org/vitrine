---
layout: doc
title: $getDisabledFilters[]
translation_key: docs
category: "Music"
function_name: getDisabledFilters
syntax: $getDisabledFilters
description: "Disabled audio filters, separated by commas."
---
# $getDisabledFilters — Disabled audio filters, separated by commas.

## Syntax

```
$getDisabledFilters
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$getDisabledFilters → result
```

## Example

```bdfd
$sendMessage[$getDisabledFilters]
```
