---
layout: doc
title: $listStickers
translation_key: docs
category: "Stickers"
function_name: listStickers
syntax: $listStickers
description: Returns the custom stickers of the server as a JSON array.
---

# $listStickers

Returns the custom stickers of the server as a JSON array. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching action.

## Syntax

```
$listStickers
```

## Return Value

- **Type**: String (JSON)
- A JSON array of stickers (ID, name, description, tags); empty array when none.

## Behavior

- No special permission is needed.

## Examples

```bdfd
$jsonParse[$listStickers]
$jsonArrayCount
```
