---
layout: doc
title: $addMediaGallery[]
translation_key: docs
category: "Components & Interactions"
function_name: addMediaGallery
syntax: $addMediaGallery[(id);(containerId)]
description: Starts a Components V2 media gallery. Images are added with $addMediaGalleryItem[].
---

# $addMediaGallery[] — Media Gallery

`$addMediaGallery[]` starts a Components V2 media gallery: a block that shows several images together. Images are added with `$addMediaGalleryItem[]`.

## Syntax

```text
$addMediaGallery[(id);(containerId)]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `id` | No | Identifier used to target this gallery from the `galleryId` argument of `$addMediaGalleryItem[]`. It is not sent to Discord. |
| `containerId` | No | Accepted but not used: the gallery goes into the latest `$addContainer` of the script, if any. |

## Return value

Returns an empty string. The gallery is created empty.

## Behavior

- Items are added with `$addMediaGalleryItem[]`, which targets the last gallery unless a `galleryId` is given.
- The gallery ends a section being built with `$addSection`.
- The engine does not check that the gallery has items, nor their number.

## Components V2 rules

- Layout components (`$addContainer`, `$addSection`, `$addSeparator`, `$addTextDisplay`, `$addMediaGallery`, `$addThumbnail`, `$addFile`) make the response a Components V2 message. Such a message cannot carry content or embeds: the text written in the script and the embed functions are not sent.
- Buttons and select menus (`$addButtonCV2`, `$addStringSelect`, ...) must be added **before** any text display, separator, thumbnail, file or media gallery of the script: added afterwards, they fail with `type 'Null' is not a subtype of type 'List<dynamic>' in type cast`.
- A button added right after `$addContainer` or `$addSection` is silently lost: write `$addActionRow` first.

## Examples

### Simple gallery

```bdfd
$addMediaGallery[portfolio]
$addMediaGalleryItem[https://cdn.example.com/work1.png;Project 1]
$addMediaGalleryItem[https://cdn.example.com/work2.png;Project 2]
$addMediaGalleryItem[https://cdn.example.com/work3.png;Project 3]
```

### Gallery in a container

```bdfd
$addContainer[showcase;#E67E22]
$addTextDisplay[**Creation Gallery**]
$addMediaGallery[creations]
$addMediaGalleryItem[https://cdn.example.com/a.png;Original]
$addMediaGalleryItem[https://cdn.example.com/b.png;Variant]
```

### Gallery with spoiler images

```bdfd
$addMediaGallery[spoiler_gallery]
$addMediaGalleryItem[https://cdn.example.com/secret.png;Exclusive content;yes]
$addMediaGalleryItem[https://cdn.example.com/bonus.png;Bonus;yes]
```

## Notes

- Gallery elements are added using `$addMediaGalleryItem[]`.
- Embeds (`$title`, `$description`, ...) cannot be combined with a gallery: a Components V2 message carries no embed.
