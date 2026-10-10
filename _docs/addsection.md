---
layout: doc
title: $addSection[]
translation_key: docs
category: "Components & Interactions"
function_name: addSection
syntax: $addSection[(id);(containerId)]
description: "Starts a section: text displays that can have a thumbnail. The text displays and the thumbnail added next belong to it."
---

# $addSection[] — Section

`$addSection[]` starts a Components V2 section: a block of text displays that can have a thumbnail on its side.

## Syntax

```text
$addSection[(id);(containerId)]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `id` | No | Accepted but not used. |
| `containerId` | No | Accepted but not used: the section goes into the latest `$addContainer` of the script, if any, whatever this value. |

## Return value

Returns an empty string. The section is created empty.

## Behavior

- The `$addTextDisplay[]` calls that follow become the texts of the section, and `$addThumbnail[]` sets its thumbnail (a second thumbnail replaces the first).
- The section stays open until `$addSeparator`, `$addMediaGallery`, `$addFile`, `$addActionRow`, a select menu, `$addContainer` or another `$addSection`. Text displays written after that are outside of it.
- A section can be used with or without `$addContainer`: after `$addContainer`, the section is placed inside the container.
- The engine does not check the number of texts of the section nor whether it has a thumbnail.

## Components V2 rules

- Layout components (`$addContainer`, `$addSection`, `$addSeparator`, `$addTextDisplay`, `$addMediaGallery`, `$addThumbnail`, `$addFile`) make the response a Components V2 message. Such a message cannot carry content or embeds: the text written in the script and the embed functions are not sent.
- Buttons and select menus (`$addButtonCV2`, `$addStringSelect`, ...) must be added **before** any text display, separator, thumbnail, file or media gallery of the script: added afterwards, they fail with `type 'Null' is not a subtype of type 'List<dynamic>' in type cast`.
- A button added right after `$addContainer` or `$addSection` is silently lost: write `$addActionRow` first.

## Examples

### Section with a thumbnail

```bdfd
$addSection
$addTextDisplay[**Profile**]
$addTextDisplay[Level 12]
$addThumbnail[https://example.com/avatar.png;Avatar]
```

### Sections in a container

```bdfd
$addContainer[shop;#3498DB]
$addSection
$addTextDisplay[**Legendary sword** - 5000 gold]
$addThumbnail[https://example.com/sword.png;Sword]
$addSection
$addTextDisplay[**Mystic shield** - 3500 gold]
$addThumbnail[https://example.com/shield.png;Shield]
```

## Notes

- The order of the calls is the display order.
- Embed fields (`$addField`) are not components: they cannot be used in a section.
