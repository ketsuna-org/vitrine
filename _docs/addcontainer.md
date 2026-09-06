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

`$addContainer[]` creates a container in a Discord message. Containers offer visual structure with an optional colored border and the ability to be hidden behind a spoiler.

## Syntax

```
$addContainer[(id);(accentColor);(spoiler)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `id` | No | — | Container identifier. |
| `accentColor` | No | — | Hex color of the border (ex: `#FF0000`). |
| `spoiler` | No | `no` | `yes` to mask, `no` otherwise. |

## Return value

Initializes a container. Components added afterward (sections, thumbnails, galleries) insert into this container.

## Usage

### Basic container

```bdfd
$addContainer
$addSection
$addField[Status;Online;yes]
$addField[Uptime;24h;yes]
```

### Container with accent color

```bdfd
$addContainer[profile;#5865F2;no]
$addSection
$addThumbnail[$authorAvatar]
$addField[User;$username;no]
$addField[Joined on;$memberJoinDate;no]
```

### Spoiler container

```bdfd
$addContainer[secret;;yes]
$addSection
$addTextDisplay[**Spoiler Alert!** Click to reveal the content.]
```

### Multiple containers

```bdfd
$addContainer[header;#2ECC71;no]
$addSection
$addField[Title;Welcome to the server;no]

$addContainer[body;#3498DB;no]
$addSection
$addField[Description;We are delighted to welcome you!;no]
```

## Notes

- Containers are a visual feature specific to BDFD; they are not part of the native Discord API.
- A container can contain multiple sections ($addSection).
- The `accentColor` must be a hexadecimal format starting with `#`.
- Spoiler mode hides all content in the container until the user clicks on it.

