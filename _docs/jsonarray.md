---
layout: doc
title: $jsonArray[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArray
syntax: $jsonArray[(key);(...);(separator)]
description: Converts the string stored at a path of the current JSON document into an array by splitting it on a separator (default `,`). Replaces the value with an empty array if it is missing, empty or not a string.
---
$jsonArray converts a delimited string value into a JSON array by splitting on a separator. It is useful when data arrives as delimited text (CSV lines, tagged values) and must be handled as an array. It returns an empty string.

## Parameters

- With **one argument**, it is the path and the separator is `,`.
- With **two or more arguments**, the **last one is the separator** and the preceding ones are the path (one argument per level, no dot notation). The separator is used as written (a space or `, ` is kept); an empty separator keeps the whole string as a single element.
- With no argument, the path is the whole document.

## Behavior

- If the value at the path is a non-empty string, it is split on the separator.
- If the value is already an array, it is left unchanged.
- Otherwise (missing path, empty string, number, object...), the value is replaced by an empty array.

## Examples

### Split a string into an array

```bdfd
$jsonParse[{"tags":"discord,bot,bdfd"}]
$jsonArray[tags]
$title[JSON Array Elements]
$description[First tag: `$jsonValue[tags;0]`
Total tags: **$jsonArrayCount[tags]**]
$color[#00BCD4]
```

### Custom separator

```bdfd
$jsonParse[{"tags":"discord bot bdfd"}]
$jsonArray[tags; ]
$sendMessage[$jsonStringify]
```
