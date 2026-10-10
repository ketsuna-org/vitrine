---
layout: doc
title: $jsonExists[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonExists
syntax: $jsonExists[(key);(...)]
description: Checks whether a path exists in the current JSON document and returns true or false (a key whose value is null still exists).
---
$jsonExists returns the text `true` if the path exists in the current JSON document and `false` otherwise, so it can be used directly in `$if` conditions. A key whose value is `null` exists.

## Parameters

The path is given as separate arguments, one per level (no dot notation: `a.b` is a single key named `a.b`). Surrounding spaces are removed and empty arguments are skipped. A whole-number argument selects an element when the current value is an array; otherwise it is used as an object key. With no argument, the whole document is checked and the result is `true`, even when no JSON has been loaded.

Dot notation is not supported: `$jsonExists[user.id]` looks for a key literally named `user.id`. An array index outside the array (negative or too large) does not exist.

## Examples

### Verify Property Existence

```bdfd
$jsonParse[{"user":{"id":"123","premium":true}}]
$title[JSON Key Verification]
$description[Does user, premium exist? **$jsonExists[user;premium]**]
$color[#57F287]
```
