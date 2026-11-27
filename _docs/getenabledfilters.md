---
layout: doc
title: $getEnabledFilters[]
translation_key: docs
category: "Music"
function_name: getEnabledFilters
syntax: $getEnabledFilters
description: "Enabled audio filters, separated by commas."
---
# $getEnabledFilters — Enabled audio filters, separated by commas.

## Syntax

```
$getEnabledFilters
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$getEnabledFilters → result
```

## Example

```bdfd
$sendMessage[$getEnabledFilters]
```
