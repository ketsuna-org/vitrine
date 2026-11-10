---
layout: doc
title: $listJoin[]
translation_key: docs
category: "Lists & Helpers"
function_name: listJoin
syntax: $listJoin[list;sourceSeparator;outputSeparator]
description: "Changes the separator of a list. This keeps IDs from getting mixed up: turn `1,2,3` into one item per line or into `1 and 2 and 3`."
---
# $listJoin — Changes the separator of a list

## Syntax

```
$listJoin[list;sourceSeparator;outputSeparator]
```

## Parameters

- **list** *(text, required)* — The items.
- **sourceSeparator** *(text, required)* — The separator used in the list. Empty means `,`.
- **outputSeparator** *(text, required)* — The separator to put between the items. `\n` means a new line.

## Return Value

- string.

## Usage

```
$listJoin[1,2,3;,; and ] → "1 and 2 and 3"
$listJoin[1,2;,;\n] → "1" then "2" on two lines
```

## Example

```bdfd
$sendMessage[$listJoin[1,2,3;,; and ]]
```
