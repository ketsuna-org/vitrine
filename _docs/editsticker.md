---
layout: doc
title: $editSticker
translation_key: docs
category: "Stickers"
function_name: editSticker
syntax: $editSticker[stickerID;name;description;tags;(reason)]
description: Edits a custom sticker of the server.
---

# $editSticker

Edits a custom sticker of the server. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching action.

## Syntax

```
$editSticker[stickerID;name;description;tags;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `stickerID` | **Required.** The sticker ID (see `$listStickers`). |
| `name` | **Required.** The new name. Empty keeps the current one. |
| `description` | Optional. Empty keeps the current one. |
| `tags` | Optional. Comma separated tags. Empty keeps the current ones. |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return Value

- Returns nothing.

## Behavior

- The bot needs Manage Guild Expressions.

## Examples

```bdfd
$editSticker[$message[1];cool]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
