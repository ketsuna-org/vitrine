---
layout: doc
title: $deleteSticker
translation_key: docs
category: "Stickers"
function_name: deleteSticker
syntax: $deleteSticker[stickerID]
description: Deletes a custom sticker of the server.
---

# $deleteSticker

Deletes a custom sticker of the server. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching action.

## Syntax

```
$deleteSticker[stickerID]
```

## Parameters

| Parameter | Description |
|---|---|
| `stickerID` | **Required.** The sticker ID. |

## Return Value

- Returns nothing.

## Behavior

- The bot needs Manage Guild Expressions.

## Examples

```bdfd
$deleteSticker[$message[1]]
```
