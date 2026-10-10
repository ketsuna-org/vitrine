---
layout: doc
title: $jsonArrayAppend[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayAppend
syntax: $jsonArrayAppend[key;(...);value]
description: Appends a value to the end of the JSON array at a path of the current document; creates the array if the path is missing or not an array.
---
$jsonArrayAppend adds a value to the end of a JSON array — the equivalent of JavaScript's `Array.push()`. It returns an empty string.

## Parameters

The **last argument is the value**; all the arguments before it form the path. The path is given as separate arguments, one per level (no dot notation: `a.b` is a single key named `a.b`). Surrounding spaces are removed and empty arguments are skipped. A whole-number argument selects an element when the current value is an array; otherwise it is used as an object key.

The value is converted like in `$jsonSet`: JSON text starting with `{` or `[` that parses, `true`, `false`, `null` (case-insensitive) and numbers keep their type; anything else is stored as a string.

## Behavior

- If the path does not exist, or holds a value that is not an array (a string, a number, an object...), it is **replaced** by a new array containing only the value; the previous value is lost.
- Use `$jsonArrayUnshift` to add to the beginning and `$jsonArrayPop` to remove from the end.
- With a single argument the call is refused ("Invalid argument count").

## Examples

### Append Item to JSON Array

```bdfd
$jsonParse[{"roles":["Member"]}]
$jsonArrayAppend[roles;Moderator]
$title[Array Append]
$description[Updated roles array: `$jsonStringify`]
$color[#57F287]
```
