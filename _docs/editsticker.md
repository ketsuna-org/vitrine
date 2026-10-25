---
layout: doc
title: $editSticker
translation_key: docs
category: "Stickers"
function_name: editSticker
syntax: $editSticker[stickerID;name;description;tags]
description: Edits a custom sticker of the server.
---

# $editSticker

Edits a custom sticker of the server. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching action.

## Syntax

```
$editSticker[stickerID;name;description;tags]
```

## Parameters

| Parameter | Description |
|---|---|
| `stickerID` | **Required.** The sticker ID (see `$listStickers`). |
| `name` | **Required.** The new name. Empty keeps the current one. |
| `description` | Optional. Empty keeps the current one. |
| `tags` | Optional. Comma separated tags. Empty keeps the current ones. |

## Return Value

- Returns nothing.

## Behavior

- The bot needs Manage Guild Expressions.

## Examples

```bdfd
$editSticker[$message[1];cool]
```
