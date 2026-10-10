---
layout: doc
title: $addContainer[]
translation_key: docs
category: "Components & Interactions"
function_name: addContainer
syntax: $addContainer[(id);(accentColor);(spoiler)]
description: Creates a visual container in a Discord message. The containers can group sections and display a colored border. Supports spoiler mode.
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
| `id` | No | — | Accepted but not used: it does not appear in the sent message. |
| `accentColor` | No | none | Color of the left border, as 6 hexadecimal digits with or without `#` (for example `#FF0000`). Any other value is ignored when the message is built. |
| `spoiler` | No | `no` | `yes`/`true` to hide the container behind a spoiler, `no`/`false` (also when empty) otherwise. Any other value is an error (`Expected yes or no, got "<value>".`). |

## Return value

Returns an empty string. The container is created empty; the components added afterwards are placed inside it.

## Behavior

- **Everything added after `$addContainer` goes inside this container**, until the end of the script or until the next `$addContainer`, which starts a new container at the top level. There is no way to close a container: components written before `$addContainer` stay outside it.
- A container can hold text displays, separators, sections, media galleries and action rows with buttons or selects.

## Components V2 rules

- Layout components (`$addContainer`, `$addSection`, `$addSeparator`, `$addTextDisplay`, `$addMediaGallery`, `$addThumbnail`, `$addFile`) make the response a Components V2 message. Such a message cannot carry content or embeds: the text written in the script and the embed functions are not sent.
- Buttons and select menus (`$addButtonCV2`, `$addStringSelect`, ...) must be added **before** any text display, separator, thumbnail, file or media gallery of the script: added afterwards, they fail with `type 'Null' is not a subtype of type 'List<dynamic>' in type cast`.
- A button added right after `$addContainer` or `$addSection` is silently lost: write `$addActionRow` first.

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

### Container with buttons

```bdfd
$addContainer[panel;#E67E22]
$addActionRow
$addButtonCV2[yes;Yes;success]
$addButtonCV2[no;No;danger]
$addTextDisplay[Choose an option]
```

## Notes

- In this last example the buttons come before the text display, as required by the rule above; the container displays its components in the order they were added.
- Containers are a Discord Components V2 feature.
