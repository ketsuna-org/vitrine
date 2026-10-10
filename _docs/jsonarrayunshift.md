---
layout: doc
title: $jsonArrayUnshift[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayUnshift
syntax: $jsonArrayUnshift[key;(...);value]
description: Adds a value to the beginning of the JSON array at a path of the current document; creates the array if the path is missing or not an array.
---
$jsonArrayUnshift adds a value to the front of a JSON array — the equivalent of JavaScript's `Array.unshift()`. Existing elements move one position up. It returns an empty string.

## Parameters

The **last argument is the value**; all the arguments before it form the path. The path is given as separate arguments, one per level (no dot notation: `a.b` is a single key named `a.b`). Surrounding spaces are removed and empty arguments are skipped. A whole-number argument selects an element when the current value is an array; otherwise it is used as an object key. At most 100 arguments are accepted in total.

The value is converted like in `$jsonSet` (JSON text, `true`/`false`/`null` and numbers keep their type; anything else is a string).

## Behavior

- If the path does not exist, or holds a value that is not an array, it is **replaced** by a new array containing only the value.
- Useful for queues where an item must be served first with `$jsonArrayShift`.

## Examples

### Insert Item at Beginning of Array

```bdfd
$jsonParse[{"tasks":["Review PR"]}]
$jsonArrayUnshift[tasks;Deploy Release]
$title[Prepend Array Item]
$description[Tasks list: `$jsonStringify`]
$color[#5865F2]
```
