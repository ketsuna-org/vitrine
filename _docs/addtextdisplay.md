---
layout: doc
translation_key: docs
category: "Components & Interactions"
---

# $addTextDisplay

Adds a block of text to a Components V2 message. It is not in an action row and is not interactive.

## Syntax

```text
$addTextDisplay[content;(containerId)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `content` | Text to display. | Yes |
| `containerId` | Name of a container (`$addContainer[name]`) or of a section (`$addSection[name]`) defined earlier: the text goes in it. A name that does not exist raises `Container or section <name> not found.` | No |

## Description

`$addTextDisplay` adds a text block. With `containerId`, it goes in the container or the section of that name. Without it, in a script that names no container or section, it goes inside the latest `$addContainer`, or becomes one of the texts of the section started with `$addSection` and still open; in a script that uses names, a text without a name attaches to the message.

## Components V2 rules

- Layout components (`$addContainer`, `$addSection`, `$addSeparator`, `$addTextDisplay`, `$addMediaGallery`, `$addThumbnail`, `$addFile`) make the response a Components V2 message. Such a message cannot carry content or embeds: the text written in the script and the embed functions are not sent.
- Buttons and select menus (`$addButtonCV2`, `$addStringSelect`, ...) can be added after any layout component. They go in an action row; in a script that names no container or section, a row added after a container goes inside that container.
- A Components V2 message is not limited to 5 rows: it holds at most 40 components (nested ones included) and 4000 characters of text. The limits are checked before the message is sent or edited.
- Names: as soon as one call of the script names a container or a section, every item is placed by its name, and a call without a name attaches the item to the message itself. A name that was not defined earlier raises `Container <name> not found.`, `Section <name> not found.` or `Container or section <name> not found.`

## Examples

### Text blocks

```bdfd
$addTextDisplay[**Controls**]
$addTextDisplay[Use the panel below.]
```

### Text in a container

```bdfd
$addContainer[info;#2ECC71]
$addTextDisplay[Service status]
$addSeparator
$addTextDisplay[Online]
```

### Text next to a thumbnail

```bdfd
$addSection
$addTextDisplay[Volume: 80%]
$addThumbnail[https://example.com/speaker.png;Speaker]
```

## Notes

- The text is not interactive.
- The text is not part of an action row and does not combine with buttons: to place a button, use `$addButtonCV2` (or `$addActionRow` then `$addButtonCV2`).
- A section holds 1 to 3 texts, and all the texts of a message hold 4000 characters at most.
- To change a text after the message is sent, use `$editTextDisplay`.
