---
layout: doc
title: $parseDate[]
translation_key: docs
category: "Date & Time"
function_name: parseDate
syntax: $parseDate[ms;type]
description: "Parses valid ms to a date"
---
# $parseDate — Parses valid ms to a date

## Syntax

```
$parseDate[ms;type]
```

## Parameters

- **ms** *(number, required)* — The ms to convert to date
- **type** *(text, required)* — The date type

## Return Value

- Date.

## Usage

```
$parseDate[ms;type] → result
```

## Example

```bdfd
$sendMessage[$parseDate[0;ISO]]
```
