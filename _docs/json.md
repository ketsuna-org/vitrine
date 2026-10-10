---
layout: doc
title: $json[]
translation_key: docs
category: "HTTP & JSON"
function_name: json
syntax: $json[(key);(...)]
description: With one argument starting with { or [, replaces the current JSON document and returns an empty string; otherwise reads the value at the given path (the whole document without argument).
---
$json has two forms, depending on its arguments:

- **One argument that starts with `{` or `[`** (after removing surrounding spaces): the argument is parsed as JSON and replaces the current JSON document. It returns an empty string. If the text is not valid JSON, or is not an object or array, the document becomes an empty object `{}`.
- **Anything else** (no argument, or arguments that do not start with `{` / `[`): it reads a value, exactly like `$jsonValue`. With no argument it returns the whole document as compact JSON text; if no JSON document exists yet it returns an empty string.

The path is given as separate arguments, one per level (no dot notation: `a.b` is a single key named `a.b`). Surrounding spaces are removed and empty arguments are skipped. A whole-number argument selects an element when the current value is an array; otherwise it is used as an object key.

Values are returned as text: strings as they are, numbers and booleans as `1.5` / `true`, objects and arrays as compact JSON, `null` and missing paths as an empty string. The document lives for the current command and is shared by all the JSON functions; `$jsonParse` is the dedicated way to load JSON, and `$jsonClear` resets the document to `{}`.

## Examples

### Load JSON and read a value

```bdfd
$json[{"bot":"Bot Creator","version":"2.0"}]
$title[JSON Context Overview]
$description[Bot Name: **$json[bot]**
Engine Version: **$json[version]**]
$color[#00BCD4]
```
