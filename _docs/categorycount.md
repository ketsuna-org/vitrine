---
layout: doc
title: $categoryCount
translation_key: docs
category: "Entity Info"
function_name: categoryCount
syntax: $categoryCount
description: Returns the number of categories on the Discord server.
---

# $categoryCount

The `$categoryCount` function returns the **total number of categories** present on the Discord server.

## Syntax

```
$categoryCount
```

## Parameters

No parameters.

## Return value

| Type | Description |
|---|---|
| `integer` | The number of categories on the server. |

## Examples

### Number of categories

```bdfd
$sendMessage[This server has $categoryCount categories.]
```

### Comparison of channels and categories

```bdfd
$sendMessage[
**Server Statistics:**
Categories: $categoryCount
Channels: $channelCount
]
```

### Server without categories

```bdfd
$if[$categoryCount==0]
  $sendMessage[This server has no categories.]
$endif
```

## Notes

- Only counts channels of type `category`.
- Useful for statistics or displaying the server structure.
