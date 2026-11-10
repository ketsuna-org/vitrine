---
layout: doc
title: $tryLock[]
translation_key: docs
category: "Variables"
function_name: tryLock
syntax: $tryLock[name;(duration)]
description: "Takes a named lock and returns `true`, or returns `false` while another script holds it. The lock expires by itself."
---
# $tryLock — Takes a named lock and returns `true`, or returns `false` while another script holds it

## Syntax

```
$tryLock[name;(duration)]
```

## Parameters

- **name** *(text, required)* — The lock name, per bot.
- **duration** *(duration, optional)* — Default 30s, at most 10m.

## Return Value

- `true` when the lock was taken, `false` when it is held.

## Usage

```
$tryLock[forge;10s] → "true"
```

## Important Notes

- The lock lives in memory in the bot's process: a restart releases it.
- Release it early with `$unlock`.

## Example

```bdfd
$onlyIf[$tryLock[forge;10s]==true;The forge is busy.]
```
