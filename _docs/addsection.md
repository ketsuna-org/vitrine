---
layout: doc
title: $addSection[]
translation_key: docs
category: "Components & Interactions"
function_name: addSection
syntax: $addSection[(id)]
description: Creates a section inside a container. Sections allow organizing content (fields, text, thumbnails) in a structured way within a visual container.
---

# $addSection[] — Section inside a Container

`$addSection[]` creates a section inside a container previously initialized with `$addContainer[]`. Sections visually structure content and can contain fields, text, and media.

## Syntax

```
$addSection[(id)]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `id` | No | Optional identifier for the section. |

## Return value

Initializes a section in the current container. Subsequent components are added to this section.

## Usage

### Container with a section

```bdfd
$addContainer[user_info;#E67E22;no]
$addSection
$addField[Username;$username;no]
$addField[ID;$authorID;no]
$addField[Registration date;$creationDate;no]
```

### Multi-section container

```bdfd
$addContainer[embed;#9B59B6;no]

$addSection[header]
$addThumbnail[$authorAvatar]
$addTextDisplay[**Profile of $username**]

$addSection[stats]
$addField[Messages;$var[msg_count];yes]
$addField[XP;$var[xp];yes]

$addSection[footer]
$addTextDisplay[📅 Member since $memberJoinDate]
```

### Sections in a complex message

```bdfd
$addContainer[shop;#3498DB;no]

$addSection[item1]
$addField[Article;Legendary sword;yes]
$addField[Price;5000 gold coins;yes]

$addSection[item2]
$addField[Article;Mystic shield;yes]
$addField[Price;3500 gold coins;yes]
```

## Notes

- Must be used inside a container (`$addContainer`).
- Multiple sections can coexist in the same container.
- Each section can contain fields (`$addField`), text (`$addTextDisplay`), or a thumbnail (`$addThumbnail`).
- The order of addition determines the display order in the message.

