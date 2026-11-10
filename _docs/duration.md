---
layout: doc
title: $duration[]
translation_key: docs
category: "Lists & Helpers"
function_name: duration
syntax: $duration[seconds;(style)]
description: "Writes a number of seconds in a readable way."
---
# $duration — Writes a number of seconds in a readable way

## Syntax

```
$duration[seconds;(style)]
```

## Parameters

- **seconds** *(integer, required)* — The duration in seconds.
- **style** *(`short`, `long` or `compact`, optional)* — `short` (default): `2 h 5 min`. `long`: `2 hours 5 minutes`. `compact`: `2h5m`.

## Return Value

- string.

## Usage

```
$duration[7500] → "2 h 5 min"
$duration[7503;long] → "2 hours 5 minutes 3 seconds"
$duration[3661;compact] → "1h1m1s"
```

## Example

```bdfd
$sendMessage[$duration[7500]]
```
