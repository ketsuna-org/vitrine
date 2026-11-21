---
layout: doc
title: $dbFind
translation_key: docs
category: "Database"
function_name: dbFind
syntax: $dbFind[collection;field;operator;value;(sort);(limit);(cursor)]
description: Lists the documents of a collection that match one condition, sorted and paged. Not in BDFD.
---

# $dbFind

`$dbFind` returns a page of documents. On a large collection (over 5 000 documents) the fields you filter and sort on need an **index** (declared in the app or the API); otherwise the call fails with `needs_index`. Types never mix: a number is never equal to a text.

## Syntax

```
$dbFind[collection;field;operator;value;(sort);(limit);(cursor)]
```

## Parameters

| Parameter | Description |
|---|---|
| `collection` | Collection name: lowercase letters, digits, `_`, `.` or `-` (up to 64 characters). It is created on first write. |
| `field` | Dotted path of the field to test. |
| `operator` | `=`, `!=`, `<`, `<=`, `>`, `>=`, `in` (comma-separated values or a JSON list) or `prefix`. |
| `value` | Value to compare. Read as JSON when valid (so `100` is a number, `"100"` a text); a 16-digit number or more stays text. |
| `sort` | Optional. A field, `-field` for descending, or `field:desc`. Documents without that field are left out. |
| `limit` | Optional. 1 to 100 (default 100). |
| `cursor` | Optional. The `next` value of the previous page. |

## Return value

- JSON: `{"docs":[{"id":...,"data":{...},"rev":...}],"next":"..."}`. `next` is present when there are more results.
- Empty on a handled error.

## Examples

### The richest players

```bdfd
$dbFind[players;xp;>;0;-xp;10]
```
