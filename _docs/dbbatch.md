---
layout: doc
title: $dbBatch
translation_key: docs
category: "Database"
function_name: dbBatch
syntax: $dbBatch[operations]
description: Runs up to 20 write operations as one atomic batch. Not in BDFD.
---

# $dbBatch

`$dbBatch` is the transaction of the database: **all** the operations apply, or **none** does. There is no open transaction in a script; the batch is the unit. At most 20 operations, all in the same space.

## Syntax

```
$dbBatch[operations]
```

## Parameters

| Parameter | Description |
|---|---|
| `operations` | A JSON list of operations, each `{"op":..., "collection":..., "id":...}` with `value`, `path`, `delta`, `min`, `max`, `max_len`, `rev` or `to_id` as needed. `op` is one of `set`, `create`, `merge`, `incr`, `push`, `pull`, `addToSet`, `delete`, `transfer`. |

## Return value

- A JSON list with one result per operation (`{"doc":...}` or `{"deleted":...}`).
- Empty when the batch was refused (nothing was written).

## Examples

```bdfd
$dbBatch[[{"op":"incr","collection":"wallet","id":"$authorID","path":"cash","delta":-50,"min":0},{"op":"push","collection":"players","id":"$authorID","path":"items","value":"potion"}]]
```
