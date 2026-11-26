---
layout: doc
title: $parseString[]
translation_key: docs
category: "Date & Time"
function_name: parseString
syntax: $parseString[duration]
description: "Parses valid duration string to ms"
---
# $parseString — Parses valid duration string to ms

## Syntax

```
$parseString[duration]
```

## Parameters

- **duration** *(text, required)* — The valid string to convert to ms

## Return Value

- Number.

## Usage

```
$parseString[duration] → result
```

## Example

```bdfd
$sendMessage[$parseString[1h 30m]]
```
