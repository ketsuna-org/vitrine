---
layout: doc
title: $addEmoji
translation_key: docs
category: "Moderation"
function_name: addEmoji
syntax: $addEmoji[name;url;returnEmoji]
description: Adds a new custom emoji to the server from an image URL. The third argument (yes/no) chooses whether the emoji markup is returned.
---

# $addEmoji

The `$addEmoji[]` function **adds a new custom emoji** to the server from an image URL.

## Syntax

```
$addEmoji[name;url;returnEmoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Required. The emoji name (must not be empty; surrounding spaces are removed). |
| `url` | Required. An `http` or `https` URL of the image (at most 256 KiB). |
| `returnEmoji` | Required. `yes` or `no` (any other value, including empty, is an error). |

## Return value

- **Type**: String
- With `yes`: the markup of the created emoji, `<:name:ID>` (or `<a:name:ID>` for an animated emoji).
- With `no`: an empty string.

## Behavior

- The emoji is created in the current server without any role restriction. The bot needs the Create Guild Expressions permission (otherwise "Missing Create Guild Expressions permission."), and the command needs a server context.
- The image is downloaded with a GET request. Accepted formats (detected from the file content): PNG, JPEG, GIF, WebP and AVIF; any other content raises "Unsupported emoji image format.".
- Errors are raised (they are not returned as text) if the name is empty, the URL is not http/https, the download does not answer with a 2xx status, the image exceeds 256 KiB, the format is not supported, or the bot is not allowed to create the emoji.

## Examples

### Simple addition

```bdfd
$var[emoji;$addEmoji[cool;https://example.com/cool.png;yes]]
$sendMessage[Emoji added: $var[emoji]]
```

### Without returning the emoji

```bdfd
$addEmoji[cool;https://example.com/cool.png;no]
$sendMessage[Emoji added.]
```

## Notes

- The URL must point directly to an image.
- The `yes` / `no` flag is case-insensitive and surrounding spaces are ignored; use `$removeEmoji[]` to delete an emoji by its ID.
