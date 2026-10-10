---
layout: doc
title: $addThumbnail[]
translation_key: docs
category: "Embed & Message"
function_name: addThumbnail
syntax: $addThumbnail[url;(description);(spoiler);(sectionID)]
description: Adds a thumbnail component (Components V2). After $addSection it becomes the accessory of that section. This is not the thumbnail of a classic embed.
---

# $addThumbnail[] — Visual Thumbnail

`$addThumbnail[]` adds a thumbnail component to the message being built. It is a Components V2 element — distinct from the traditional embed thumbnail set by `$thumbnail[]`.

## Syntax

```
$addThumbnail[url;(description);(spoiler);(sectionID)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `url` | Yes | — | URL of the image. It is not checked by the engine. |
| `description` | No | — | Alternative text. An empty value means no description. |
| `spoiler` | No | `no` | `yes`/`true` to mark the image as a spoiler, `no`/`false` otherwise. An empty value means `no`; any other value is an error (`Expected yes or no, got "..."`). |
| `sectionID` | No | — | Accepted, but the engine does not use it to choose the section: the thumbnail goes to the section opened last. |

## Return value

None (empty string). If a section was opened with `$addSection` (and not closed by a separator, file, gallery, container, action row or select menu), the thumbnail becomes the **accessory** of that section. Otherwise it is added as a standalone component.

## Components V2 message

A thumbnail is a *rich* (Components V2) component. A message that contains one is sent as a Components V2 message, which **cannot carry text content or embeds**: use `$addTextDisplay[]` for the text, which is added to the open section.

## Examples

### User avatar

```bdfd
$addContainer[profile;#5865F2;no]
$addSection
$addTextDisplay[Profile of $username]
$addThumbnail[$authorAvatar;Avatar of $username]
```

### Server icon

```bdfd
$addContainer[server_info;#2ECC71;no]
$addSection
$addTextDisplay[Server: $serverName]
$addThumbnail[$serverIcon;Server icon]
```

### Spoiler image

```bdfd
$addContainer[secret_content;#E74C3C;no]
$addSection
$addTextDisplay[Click to reveal the image...]
$addThumbnail[$var[hidden_image];Secret image;yes]
```

### In a complex layout

```bdfd
$addContainer[catalog;#9B59B6;no]

$addSection
$addTextDisplay[Fire sword - 5000 gold]
$addThumbnail[https://cdn.example.com/item1.png;Fire sword]

$addSection
$addTextDisplay[Ice shield - 3500 gold]
$addThumbnail[https://cdn.example.com/item2.png;Ice shield]
```

## Notes

- Use it right after `$addSection` (itself usually after `$addContainer`) to attach it to a section.
- Do not confuse this with `$thumbnail[]` which defines the thumbnail of a classic embed.
- For a gallery of multiple images, use `$addMediaGallery[]`.
