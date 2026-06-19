---
layout: doc
title: $addContainer[]
translation_key: docs
category: "Embed & Message"
function_name: addContainer
syntax: $addContainer[(id);(accentColor);(spoiler)]
description: Creates a visual container in a Discord message. The containers can group sections and display a colored border. Supports spoiler mode.
---

# $addContainer[] — Conteneur Visual

`$addContainer[]` crée a container in a Discord message. The containers offrent une structuration visualle with a colored border optionalle and the ability of être hiddens derrière un spoiler.

## Syntax

```
$addContainer[(id);(accentColor);(spoiler)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `id` | No | — | Container identifier. |
| `accentColor` | No | — | Hex color of the border (ex: `#FF0000`). |
| `spoiler` | No | `no` | `yes` pour masquer, `no` otherwise. |

## Return value

Initialise a container. The components added afterward (sections, thumbnails, galeries) s'insèrent in ce container.

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
$addField[Rejoint le;$memberJoinDate;no]
```

### Spoiler container

```bdfd
$addContainer[secret;;yes]
$addSection
$addTextDisplay[**Spoiler Alert !** Cliquez pour révéler le contenu.]
```

### Multiple containers

```bdfd
$addContainer[header;#2ECC71;no]
$addSection
$addField[Titre;Bienvenue on the server;no]

$addContainer[body;#3498DB;no]
$addSection
$addField[Description;Nous sommes ravis of vous accueillir !;no]
```

## Notes

- Les containers sont a functionnalité visualle propre to BDFD ; ils ne font pas partie of the API Discord native.
- Un container can contain multiple sections ($addSection).
- The color `accentColor` must be in the format hexadecimal with `#`.
- Le spoiler mode masque tout le content of the container until the user clicks dessus.
