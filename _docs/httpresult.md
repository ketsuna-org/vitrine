---
layout: doc
title: $httpResult[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpResult
syntax: $httpResult[(key1);(key2);(...)]
description: Returns the body of the last HTTP response, or the JSON value found by following the given keys; empty when the path does not exist
---
$httpResult returns the response stored by the most recent HTTP request function (`$httpGet`, `$httpPost`, ...). Without argument it returns the raw body; with arguments it reads the body as JSON and follows the keys.

## Parameters

Zero to 100 optional arguments, each one a **path segment**:

- A segment is an object key (`name`) or, when it follows another segment and is a whole number, an array index (`list;0`). Empty segments are skipped; surrounding spaces are removed.
- A segment can itself contain dots and `[n]` indexes, so `$httpResult[a.b[1].c]` is the same as `$httpResult[a;b;1;c]`. A leading `$.` is accepted.
- A number as the **first** segment is a key name, not an index, so `$httpResult[0]` returns an empty string. To read an element of a top-level array write the index in brackets: `$httpResult[[0]]` (probed with a body `[5,{"k":"v"}]` it returns `5`).

## Return Value

- No argument (or only empty arguments): the raw response body, unchanged.
- A string value: the string. A number or boolean: its text (`1.5`, `true`). An object or an array: compact JSON text (`[1,2,3]`).
- An empty string when the path does not exist, when the value is `null`, when an index is out of range or negative, or when the body is not valid JSON.
- An error (`A preceding HTTP request is required.`) when no HTTP request has been made yet in the command.

## Examples

### Display API Result Body

```bdfd
$httpGet[https://dummyjson.com/quotes/random]
$title[Random Quote 📜]
$description[Response: `$httpResult`]
$color[#5865F2]
```

### Read a nested field

For a response `{"a":{"b":[10,{"c":"x"}]}}`, the following gives `10` then `x`:

```bdfd
$httpGet[https://api.example.com/data]
$sendMessage[$httpResult[a;b;0] / $httpResult[a;b;1;c]]
```
