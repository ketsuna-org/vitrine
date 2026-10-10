---
layout: doc
translation_key: docs
category: "Components & Interactions"
---

# $addSeparator

Adds a separator (an empty space or a thin line) between the components of a Components V2 message.

## Syntax

```text
$addSeparator[(divider);(spacing);(containerId)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `divider` | `yes`/`true` to display a separation line, `no`/`false` for a space only. Default (omitted or empty): `yes`. Any other value is an error (`Expected yes or no, got "<value>".`). | No |
| `spacing` | Size of the spacing: `2` gives a large spacing; any other value, or none, gives a small one. Values such as `sm`, `md` or `lg` are not recognized (they give a small spacing). | No |
| `containerId` | Accepted but not used: the separator goes into the latest `$addContainer` of the script, if any. | No |

## Description

`$addSeparator` adds a standalone separator at the top level of the message (or in the latest container). It is not part of an action row, it does not separate buttons from each other, and it ends the section being built with `$addSection`.

## Components V2 rules

- Layout components (`$addContainer`, `$addSection`, `$addSeparator`, `$addTextDisplay`, `$addMediaGallery`, `$addThumbnail`, `$addFile`) make the response a Components V2 message. Such a message cannot carry content or embeds: the text written in the script and the embed functions are not sent.
- Buttons and select menus (`$addButtonCV2`, `$addStringSelect`, ...) must be added **before** any text display, separator, thumbnail, file or media gallery of the script: added afterwards, they fail with `type 'Null' is not a subtype of type 'List<dynamic>' in type cast`.
- A button added right after `$addContainer` or `$addSection` is silently lost: write `$addActionRow` first.

## Examples

### Simple separator

```bdfd
$addTextDisplay[First block]
$addSeparator
$addTextDisplay[Second block]
```

### Space without a line

```bdfd
$addTextDisplay[Title]
$addSeparator[no;2]
$addTextDisplay[Content with a large space above]
```

### In a container

```bdfd
$addContainer[card;#5865F2]
$addTextDisplay[Service status]
$addSeparator[yes]
$addTextDisplay[Online]
```

## Notes

- The separator counts as a Components V2 element: the message cannot carry normal content or embeds.
