---
layout: doc
title: $addContainer[]
translation_key: docs
category: "Components & Interactions"
function_name: addContainer
syntax: $addContainer[(id);(accentColor);(spoiler)]
description: Starts a Components V2 container that groups the components added after it, with an optional accent color and spoiler mode.
---

# $addContainer[] — Visual Container

`$addContainer[]` starts a Components V2 container: a block with an optional colored border that groups the components added after it.

## Syntax

```text
$addContainer[(id);(accentColor);(spoiler)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `id` | No | — | Name of the container. Other calls (`$addTextDisplay`, `$addSection`, `$addSeparator`, `$addMediaGallery`, `$addActionRow`) can put their item in it by giving this name. |
| `accentColor` | No | none | Color of the left border: `#RRGGBB`, `RRGGBB`, or a whole number from 0 to 16777215. Digits alone are a number: `255000` is `#03E498`, not `#255000`. A number above 16777215 raises `Container color must be #RRGGBB or a number from 0 to 16777215.` Any other text is ignored when the message is built. |
| `spoiler` | No | `no` | `yes`/`true` to hide the container behind a spoiler, `no`/`false` (also when empty) otherwise. Any other value is an error (`Expected yes or no, got "<value>".`). |

## Return value

Returns an empty string. The container is created empty; the components added afterwards are placed inside it.

## Behavior

- **In a script that names no container or section**, everything added after `$addContainer` goes inside this container, until the end of the script or until the next `$addContainer`, which starts a new container at the top level. There is no way to close a container: components written before `$addContainer` stay outside it.
- **In a script that uses names**, an item goes in the container whose name it gives (`$addTextDisplay[text;panel]`), and an item without a name attaches to the message, outside the containers.
- A container can hold text displays, separators, sections, media galleries and action rows with buttons or selects.

## Components V2 rules

- Layout components (`$addContainer`, `$addSection`, `$addSeparator`, `$addTextDisplay`, `$addMediaGallery`, `$addThumbnail`, `$addFile`) make the response a Components V2 message. Such a message cannot carry content or embeds: the text written in the script and the embed functions are not sent.
- Buttons and select menus (`$addButtonCV2`, `$addStringSelect`, ...) can be added after any layout component. They go in an action row; in a script that names no container or section, a row added after a container goes inside that container.
- A Components V2 message is not limited to 5 rows: it holds at most 40 components (nested ones included) and 4000 characters of text. The limits are checked before the message is sent or edited.
- Names: as soon as one call of the script names a container or a section, every item is placed by its name, and a call without a name attaches the item to the message itself. A name that was not defined earlier raises `Container <name> not found.`, `Section <name> not found.` or `Container or section <name> not found.`

## Examples

### Container with accent color

```bdfd
$addContainer[profile;#5865F2]
$addTextDisplay[**Server status**]
$addSeparator
$addTextDisplay[All systems operational]
```

### Spoiler container

```bdfd
$addContainer[secret;;yes]
$addTextDisplay[**Spoiler alert!** Click to reveal the content.]
```

### Two containers

```bdfd
$addContainer[header;#2ECC71]
$addTextDisplay[Welcome to the server]
$addContainer[body;#3498DB]
$addTextDisplay[We are delighted to have you here.]
```

### Color as a whole number

```bdfd
$addContainer[status;5793266]
$addTextDisplay[Color 5793266 is #5865F2]
```

### Container with buttons

```bdfd
$addContainer[panel;#E67E22]
$addTextDisplay[Choose an option]
$addButtonCV2[yes;Yes;success]
$addButtonCV2[no;No;danger]
```

### Items placed by name

```bdfd
$addContainer[header;#2ECC71]
$addContainer[body;#3498DB]
$addTextDisplay[Welcome;header]
$addTextDisplay[We are delighted to have you here.;body]
```

## Notes

- The container displays its components in the order they were added.
- To change the color or the spoiler of a container after it is sent, use `$editContainer`.
- Containers are a Discord Components V2 feature.
