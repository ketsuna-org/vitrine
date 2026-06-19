---
layout: doc
title: $thumbnail[]
translation_key: docs
category: "Embed & Message"
function_name: thumbnail
syntax: $thumbnail[url;(embedIndex)]
description: Sets the thumbnail of a Discord embed. The thumbnail is a small square image displayed at the top right of the embed.
---

# $thumbnail[]

The function `$thumbnail[]` sets the **thumbnail** of a Discord embed. The thumbnail is a small square image displayed at the top right corner of the embed.

## Syntax

```
$thumbnail[url;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `url` | URL of the image to use as the thumbnail. Must be a direct URL to an image file. |
| `embedIndex` | Optional. Index of the targeted embed (default is 0). |

## Return Value

Modifies the response currently being constructed. Returns nothing.

## Behavior

- The thumbnail appears at the top right of the embed.
- The image is automatically resized into a small square.
- Only one thumbnail is allowed per embed; the last call overwrites the previous one.

## Difference Between $thumbnail[] and $image[]

| Function | Position | Size |
|---|---|---|
| `$thumbnail[]` | Top right | Small (square, ~80x80px) |
| `$image[]` | Bottom of the embed | Large, full width |

## Examples

### Thumbnail with User Avatar

```bdfd
$title[Profile of $username]
$description[
**Username:** $username
**ID:** $authorID
**Account Created:** $creationDate[$authorID]
]
$thumbnail[$authorAvatar]
$color[#5865F2]
$sendMessage[]
```

### Thumbnail with Server Icon

```bdfd
$title[Welcome to $serverName]
$description[
Welcome to the server **$serverName**!
We are now **$membersCount** members!
]
$thumbnail[$serverIcon]
$color[#57F287]
$sendMessage[]
```

### Combining Thumbnail and Image

```bdfd
$title[New Update]
$description[
**Version 2.0** is now available!

- Bug fixes
- New features
- Performance improvements
]
$thumbnail[https://cdn.example.com/update-icon.png]
$image[https://cdn.example.com/update-banner.png]
$footer[Published at $time]
$color[#FEE75C]
$sendMessage[]
```

## Notes

- The URL must be publicly accessible.
- Supported formats: PNG, JPEG, GIF, WebP.
- The thumbnail is ideal for displaying an avatar, a logo, or a representative icon.
- For a large full-width image, use `$image[]`.

