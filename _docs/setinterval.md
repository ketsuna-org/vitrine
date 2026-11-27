---
layout: doc
title: $setInterval[]
translation_key: docs
category: "Utilities"
function_name: setInterval
syntax: $setInterval[code;(time);(name)]
description: "Runs code every time the delay passes, until $clearInterval. 5 seconds at least, 24 hours at most; a run that is still going makes the next one skip."
---
# $setInterval — Runs code every time the delay passes, until $clearInterval. 5 seconds at least, 24 hours at most; a run that is still going makes the next one skip.

## Syntax

```
$setInterval[code;(time);(name)]
```

## Parameters

- **code** *(String, required)* — BDFD code to run later (never run now)
- **time** *(String, optional)* — Delay: 10s, 5m, 1h or milliseconds
- **name** *(String, optional)* — Name, to cancel it with $clearTimeout / $clearInterval

## Return Value

- String.

## Usage

```
$setInterval[code;time;name] → result
```

## Example

```bdfd
$sendMessage[$setInterval[code;time;name]]
```
