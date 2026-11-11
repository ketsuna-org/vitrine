---
layout: doc
title: $listVars
translation_key: docs
category: "Variables"
function_name: listVars
syntax: $listVars[prefix;(separator);(limit)]
description: "Lists the names of the global variables that start with a prefix."
---

# $listVars

Lists the names of the global variables that start with a prefix.

## Syntax

```
$listVars[prefix;(separator);(limit)]
```

## Parameters

| Parameter | Description |
|---|---|
| `prefix` | Start of the names, for example `chunk_`. |
| `separator` | Optional. Text between two names. Default `, `. |
| `limit` | Optional. 1 to 1000, default 100. |

## Return Value

- string.

## Usage

```
$listVars[chunk_;|] → "chunk_0_0|chunk_1_0"
```

## Example

```bdfd
$listVars[chunk_;\n;20]
```

## Notes

Names are sorted. Use it to walk over a family of variables (one per block of a map) without keeping a separate index. JavaScript: `bc.vars.list(prefix, limit)`.
