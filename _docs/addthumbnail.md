---
layout: doc
title: $addThumbnail[]
translation_key: docs
category: "Embed & Message"
function_name: addThumbnail
syntax: $addThumbnail[url;(description);(spoiler)]
description: Adds a thumbnail image inside a container section. This is not the thumbnail of a classic embed but a standalone visual component.
---

# $addThumbnail[] — Visual Thumbnail

`$addThumbnail[]` inserts a thumbnail image in a container section. This function adds a standalone image component — distinct from the traditional embed thumbnail set by `$thumbnail[]`.

## Syntax

```
$addThumbnail[url;(description);(spoiler)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `url` | Yes | — | URL of the image (must be a valid URL). |
| `description` | No | — | Alternative text for accessibility. |
| `spoiler` | No | `no` | `yes` to hide the image. |

## Return value

Adds the thumbnail image to the current section of the container. The image is rendered in a small format.

## Usage

### User avatar

```bdfd
$addContainer[profile;#5865F2;no]
$addSection
$addThumbnail[$authorAvatar;Avatar of $username]
$addField[User;$username;no]
```

### Server icon

```bdfd
$addContainer[server_info;#2ECC71;no]
$addSection
$addThumbnail[$serverIcon;Server icon]
$addField[Server;$serverName;yes]
$addField[Members;$membersCount;yes]
```

### Spoiler image

```bdfd
$addContainer[secret_content;#E74C3C;no]
$addSection
$addThumbnail[$var[hidden_image];Secret image;yes]
$addTextDisplay[Click to reveal the image...]
```

### In a complex layout

```bdfd
$addContainer[catalog;#9B59B6;no]

$addSection
$addThumbnail[https://cdn.example.com/item1.png;Fire sword]
$addField[Fire sword;5000 gold;yes]

$addSection
$addThumbnail[https://cdn.example.com/item2.png;Ice shield]
$addField[Ice shield;3500 gold;yes]
```

## Notes

- Must be used in a section (`$addSection`) inside a container (`$addContainer`).
- Do not confuse this with `$thumbnail[]` which defines the thumbnail of a classic embed.
- The URL must point to a publicly accessible image (PNG, JPEG, GIF, WebP).
- For a gallery of multiple images, use `$addMediaGallery[]`.

