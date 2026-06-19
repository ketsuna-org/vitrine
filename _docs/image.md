---
layout: doc
title: $image[]
translation_key: docs
category: "Embed & Message"
function_name: image
syntax: $image[url;(embedIndex)]
description: Sets the main image of a Discord embed. The image appears at the bottom of the embed, below the fields and description, in full width.
---

# $image[]

The function `$image[]` defines the **main (large) image** of a Discord embed. The image is displayed at the bottom of the embed in full width, after the description and the fields.

## Syntax

```
$image[url;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `url` | URL of the image to display. Must be a direct URL to an image file (PNG, JPG, GIF, WebP). |
| `embedIndex` | Optional. Index of the targeted embed (defaults to 0). |

## Return Value

Modifies the response currently being constructed. Returns nothing.

## Behavior

- The image occupies the full width of the embed.
- If the URL is invalid or the image is inaccessible, the embed will display without the image.
- Only one call to `$image[]` per embed: the last call overwrites any previous ones.

## Difference between $image[] and $thumbnail[]

| Function | Position | Size |
|---|---|---|
| `$image[]` | Bottom of the embed | Large, full width |
| `$thumbnail[]` | Top-right corner | Small (square) |

## Examples

### Simple image

```bdfd
$title[Photo of the Day]
$description[A beautiful photo selected for you.]
$image[https://picsum.photos/800/400]
$color[#5865F2]
$sendMessage[]
```

### Avatar as a large image

```bdfd
$title[Avatar of $username]
$description[**ID:** $authorID]
$image[$authorAvatar]
$color[#5865F2]
$sendMessage[]
```

### Embed combining image and thumbnail

```bdfd
$title[New Product]
$description[
**Name:** Gaming Pro Headset
**Price:** $79.99
**Availability:** In stock ✅
]
$thumbnail[https://cdn.example.com/product-icon.png]
$image[https://cdn.example.com/product-banner.png]
$color[#57F287]
$sendMessage[]
```

## Notes

- The URL must be publicly accessible (no local paths).
- Supported formats include PNG, JPEG, GIF (animated or static), and WebP.
- For a small image in the top-right corner, use `$thumbnail[]` instead of `$image[]`.
