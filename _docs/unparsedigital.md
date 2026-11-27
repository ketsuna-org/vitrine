---
layout: doc
title: $unparseDigital[]
translation_key: docs
category: "Date & Time"
function_name: unparseDigital
syntax: $unparseDigital[digital]
description: "Unparses given digital format to ms"
---
# $unparseDigital — Unparses given digital format to ms

## Syntax

```
$unparseDigital[digital]
```

## Parameters

- **digital** *(text, required)* — The digital format to convert to ms

## Return Value

- Number.

## Usage

```
$unparseDigital[digital] → result
```

## Example

```bdfd
$sendMessage[$unparseDigital[01:01:01]]
```
