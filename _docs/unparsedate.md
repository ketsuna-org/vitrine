---
layout: doc
title: $unparseDate[]
translation_key: docs
category: "Date & Time"
function_name: unparseDate
syntax: $unparseDate[date]
description: "Unparses given date to ms"
---
# $unparseDate — Unparses given date to ms

## Syntax

```
$unparseDate[date]
```

## Parameters

- **date** *(text, required)* — The date to get its ms

## Return Value

- Number.

## Usage

```
$unparseDate[date] → result
```

## Example

```bdfd
$sendMessage[$unparseDate[1970-01-02T00:00:00Z]]
```
