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
| `containerId` | Accepted but not used: the text goes into the latest `$addContainer` of the script, if any. | No |

## Description

`$addTextDisplay` adds a text block at the top level of the message, or inside the latest `$addContainer`. When a section was started with `$addSection` and is still open, the text becomes one of the section's texts.

## Components V2 rules

- Layout components (`$addContainer`, `$addSection`, `$addSeparator`, `$addTextDisplay`, `$addMediaGallery`, `$addThumbnail`, `$addFile`) make the response a Components V2 message. Such a message cannot carry content or embeds: the text written in the script and the embed functions are not sent.
- Buttons and select menus (`$addButtonCV2`, `$addStringSelect`, ...) must be added **before** any text display, separator, thumbnail, file or media gallery of the script: added afterwards, they fail with `type 'Null' is not a subtype of type 'List<dynamic>' in type cast`.
- A button added right after `$addContainer` or `$addSection` is silently lost: write `$addActionRow` first.

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
- The text is not part of an action row and does not combine with buttons: to place a button, use `$addActionRow` then `$addButtonCV2`, before any text display.
