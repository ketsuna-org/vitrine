---
layout: doc
title: $jsonSet[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonSet
syntax: $jsonSet[key;(...);value]
description: Sets the value at a path of the current JSON document, creating missing levels; numbers, booleans, null and JSON text keep their type.
---
$jsonSet writes a value into the JSON document of the current command. It returns an empty string.

## Parameters

The **last argument is the value**; all the arguments before it form the path. The path is given as separate arguments, one per level (no dot notation: `a.b` is a single key named `a.b`). Surrounding spaces are removed and empty arguments are skipped. A whole-number argument selects an element when the current value is an array; when the current value is an object it is a plain key (`$jsonSet[lb;123456789012345678;10]` on `{"lb":{}}` writes the key `"123456789012345678"`). At most 100 arguments are accepted in total. Missing levels are created: an array only when the next argument is `0`, an object otherwise (so a Discord ID never allocates an array). Dot notation is **not** supported: `$jsonSet[user.xp;150]` creates a key literally named `user.xp`; write `$jsonSet[user;xp;150]`.

The value is converted before it is stored: JSON text starting with `{` or `[` that parses, `true`, `false`, `null` (case-insensitive), finite decimal numbers keep their type (`007` is stored as `7`, `1e3` as `1000`; surrounding spaces of a number are dropped); an empty value stays an empty string; anything else is stored as text, including `NaN`, `Infinity`, `1e400` and `0x1F`, which stay the strings `"NaN"`, `"Infinity"`, `"1e400"` and `"0x1F"`. Use `$jsonSetString` to keep the value as a string.

## Behavior

- An existing value at the path is replaced.
- If a level on the way already holds a value that is not an object or array (for example a number), the call changes nothing.
- In an existing array, an index equal to the length appends an element. An index beyond that, or a negative one, fails with `JSON array index N is out of range (length L).`: the array is never padded with `null`. A non-numeric key on an array changes nothing.
- With an empty path (all path arguments empty) the whole document is replaced by the value.
- With a single argument the call is refused ("Invalid argument count").

## Examples

### Set Property on JSON Object

```bdfd
$jsonParse[{}]
$jsonSet[user;xp;150]
$title[JSON Set Value]
$description[Updated object: `$jsonStringify`]
$color[#57F287]
```
