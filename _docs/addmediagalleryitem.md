---
layout: doc
title: $addMediaGalleryItem[]
translation_key: docs
category: "Components & Interactions"
function_name: addMediaGalleryItem
syntax: $addMediaGalleryItem[url;(description);(spoiler);(galleryId)]
description: Adds an element (image) to a media gallery. If galleryId is omitted, the element is added to the last gallery created.
---

# $addMediaGalleryItem[] — Gallery Item

`$addMediaGalleryItem[]` adds an image to a media gallery started with `$addMediaGallery[]`.

## Syntax

```text
$addMediaGalleryItem[url;(description);(spoiler);(galleryId)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `url` | Yes | — | URL of the image. |
| `description` | No | none | Description / alternative text (only sent if not empty). |
| `spoiler` | No | `no` | `yes`/`true` to mark the image as a spoiler, `no`/`false` (also when empty) otherwise. Any other value is an error (`Expected yes or no, got "<value>".`). |
| `galleryId` | No | last gallery | `id` given to `$addMediaGallery[]`. |

## Return value

Returns an empty string. The image is added to the gallery.

## Behavior

- Without `galleryId`, the item goes to the most recently created gallery.
- With `galleryId`, the item goes to the gallery created with that `id`.
- **If there is no matching gallery** (no gallery at all, or no gallery with that `galleryId`), the engine creates a new gallery to hold the item instead of raising an error.
- The engine does not check the URL when the item is added.

## Examples

### With explicit galleryId

```bdfd
$addMediaGallery[before_after]
$addMediaGalleryItem[https://cdn.example.com/before.jpg;Before renovation;no;before_after]
$addMediaGalleryItem[https://cdn.example.com/after.jpg;After renovation;no;before_after]
```

### Without galleryId (last gallery)

```bdfd
$addMediaGallery
$addMediaGalleryItem[https://site.com/img1.png;Capture 1]
$addMediaGalleryItem[https://site.com/img2.png;Capture 2]
$addMediaGalleryItem[https://site.com/img3.png;Capture 3]
```

### Two galleries

```bdfd
$addMediaGallery[designs]
$addMediaGallery[logos]
$addMediaGalleryItem[https://cdn.example.com/d1.png;Mobile design;no;designs]
$addMediaGalleryItem[https://cdn.example.com/logo_light.png;Light logo;no;logos]
$addMediaGalleryItem[https://cdn.example.com/d2.png;Desktop design;no;designs]
```

### With spoiler

```bdfd
$addMediaGallery[spoilers]
$addMediaGalleryItem[https://cdn.example.com/exclusive01.png;Exclusive 1;yes;spoilers]
$addMediaGalleryItem[https://cdn.example.com/exclusive02.png;Exclusive 2;yes;spoilers]
```

## Notes

- A gallery is a Components V2 element: the message cannot carry normal content or embeds.
