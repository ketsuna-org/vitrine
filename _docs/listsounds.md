---
layout: doc
title: $listSounds
translation_key: docs
category: "Soundboard"
function_name: listSounds
syntax: $listSounds
description: Returns the soundboard sounds of the server as a JSON array.
---

# $listSounds

Returns the soundboard sounds of the server as a JSON array. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching action.

## Syntax

```
$listSounds
```

## Return Value

- **Type**: String (JSON)
- A JSON array of sounds (ID, name, emoji, volume); empty array when none.

## Behavior

- No special permission is needed.

## Examples

```bdfd
$jsonParse[$listSounds]
$jsonArrayCount
```
