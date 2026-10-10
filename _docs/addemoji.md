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
| `name` | Required. The emoji name (must not be empty). |
| `url` | Required. An `http` or `https` URL of the image (at most 256 KiB). |
| `returnEmoji` | Required. `yes` or `no` (any other value, including empty, is an error). |

## Return value

- **Type**: String
- With `yes`: the markup of the created emoji, `<:name:ID>` (or `<a:name:ID>` for an animated emoji).
- With `no`: an empty string.

## Behavior

- The emoji is created without any role restriction.
- Errors are raised (they are not returned as text) if the name is empty, the URL is not http/https, the image exceeds 256 KiB, the download fails, or the bot is not allowed to create the emoji.

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
- The server has an emoji limit according to its boost level.
