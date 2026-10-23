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
| `id` | No | Name of the section. `$addTextDisplay[text;name]` and `$addThumbnail[url;;;name]` can put their item in it by giving this name. |
| `containerId` | No | Name of a container defined earlier: the section goes in it. A name that does not exist raises `Container <name> not found.` |

## Return value

Returns an empty string. The section is created empty.

## Behavior

- The `$addTextDisplay[]` calls that follow become the texts of the section, and `$addThumbnail[]` sets its thumbnail (a second thumbnail replaces the first).
- The section stays open until `$addSeparator`, `$addMediaGallery`, `$addFile`, `$addActionRow`, a select menu, `$addContainer` or another `$addSection`. Text displays written after that are outside of it.
- A section can be used with or without `$addContainer`: in a script that names nothing, a section added after `$addContainer` is placed inside the container.
- A section must hold 1 to 3 texts, otherwise `A section holds 1 to 3 text displays.` is raised before the message is sent. Having a thumbnail is not checked.
- In a script that uses names, the texts and the thumbnail are attached by name (`containerId` of `$addTextDisplay`, `sectionID` of `$addThumbnail`).

## Components V2 rules

- Layout components (`$addContainer`, `$addSection`, `$addSeparator`, `$addTextDisplay`, `$addMediaGallery`, `$addThumbnail`, `$addFile`) make the response a Components V2 message. Such a message cannot carry content or embeds: the text written in the script and the embed functions are not sent.
- Buttons and select menus (`$addButtonCV2`, `$addStringSelect`, ...) can be added after any layout component. They go in an action row; in a script that names no container or section, a row added after a container goes inside that container.
- A Components V2 message is not limited to 5 rows: it holds at most 40 components (nested ones included) and 4000 characters of text. The limits are checked before the message is sent or edited.
- Names: as soon as one call of the script names a container or a section, every item is placed by its name, and a call without a name attaches the item to the message itself. A name that was not defined earlier raises `Container <name> not found.`, `Section <name> not found.` or `Container or section <name> not found.`

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
