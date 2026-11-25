---
layout: doc
title: $addSticker
translation_key: docs
category: "Stickers"
function_name: addSticker
syntax: $addSticker[name;url;tags;(description);(returnID);(guildID)]
description: Adds a custom sticker to the server from an image URL (BDFD argument order). Same function as $createSticker.
---

# $addSticker

The function `$addSticker` **adds a custom sticker** to a server from an image URL, with the argument order of BDFD. It is the same function as `$createSticker`, which also takes a `reason`.

## Syntax

```
$addSticker[name;url;tags;(description);(returnID);(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Required. The name of the sticker, 2 to 30 characters. |
| `url` | Required. The URL of a PNG, APNG or GIF image, up to 512 KiB. |
| `tags` | Required. The words that suggest the sticker, 2 to 200 characters. |
| `description` | Optional. 2 to 100 characters. Empty or absent: no description. |
| `returnID` | Optional. `yes` returns the ID of the created sticker; empty or `no` (default) returns nothing. |
| `guildID` | Optional. The ID of a server where the bot is present. Empty or absent: the current server. |

## Return value

- **Type**: String
- By default an empty string. With `returnID` set to `yes`, the ID of the sticker.

## Example

```bdfd
$addSticker[party;https://example.com/party.png;party,fun;A party sticker]
```

## Notes

- See `$createSticker` for the rules of the image, the permission and the audit log reason (set it with `$auditLogReason`).
