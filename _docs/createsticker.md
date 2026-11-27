---
layout: doc
title: $createSticker
translation_key: docs
category: "Stickers"
function_name: createSticker
syntax: $createSticker[name;image;tags;(description);(reason);(returnID);(guildID)]
description: Creates a custom sticker on the server from an image URL. Bot Creator function; BDFD's $addSticker is also supported.
---

# $createSticker

The function `$createSticker` **creates a custom sticker** on a server from an image URL. It returns the ID of the sticker only when `returnID` is `yes`. It is the creation counterpart of `$editSticker`, `$deleteSticker` and `$listStickers`. The BDFD function `$addSticker` is also supported (see below).

## Syntax

```
$createSticker[name;image;tags;(description);(reason);(returnID);(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Required. The name of the sticker, 2 to 30 characters. |
| `image` | Required. The URL (`http://` or `https://`) of a PNG, APNG or GIF image, up to 512 KiB (Discord asks for 320x320 pixels). Anything else raises an error before anything is created. |
| `tags` | Required. The words that suggest the sticker, 2 to 200 characters (for example `happy` or `fire`). |
| `description` | Optional. 2 to 100 characters. Empty or absent: no description. |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |
| `returnID` | Optional. `yes`/`true`/`y` returns the ID of the created sticker; `no`/`false`/`n` or empty (default) returns nothing. Any other value raises `returnID must be yes or no.` |
| `guildID` | Optional. The ID of a server where the bot is present. Empty or absent: the current server. |

## Return value

- **Type**: String
- By default an empty string. With `returnID` set to `yes`, the ID of the created sticker.

## Examples

```bdfd
$createSticker[party;https://example.com/party.png;party,fun;A party sticker]
$sendMessage[Sticker created!]
```

```bdfd
$createSticker[party;https://example.com/party.png;party;;;yes]
```

### BDFD form: `$addSticker`

```bdfd
$addSticker[party;https://example.com/party.png;party;A party sticker;yes;$guildID]
```

`$addSticker[name;url;tags;(description);(returnID);(guildID)]` is the same function with the argument order of BDFD (no `reason`: use `$auditLogReason`).

## Notes

- The bot needs `Create Guild Expressions`. The number of stickers depends on the boost level of the server (Discord refuses the creation beyond it).
- Lottie (JSON) stickers are not supported.
- JavaScript: `guild.stickers.create({ file, name, tags, description })`.
