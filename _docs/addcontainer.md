---
layout: doc
title: $addContainer[]
translation_key: docs
category: "Embed & Message"
function_name: addContainer
syntax: $addContainer[(id);(accentColor);(spoiler)]
description: Crée a container visuel in a Discord message. The conteneurs peuvent regrouper des sections and afficher a border colorée. Supporte le mode spoiler.
---

# $addContainer[] — Conteneur Visuel

`$addContainer[]` crée a container in a Discord message. The conteneurs offrent une structuration visuelle with a bordure colorée optionalle and the possibilité d'être hiddens derrière un spoiler.

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

Initialise a container. The components added afterward (sections, thumbnails, galeries) s'insèrent dans ce conteneur.

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
$addField[Description;Nous sommes ravis de vous accueillir !;no]
```

## Notes

- Les conteneurs sont a functionnalité visuelle propre à BDFD ; ils ne font pas partie of the API Discord native.
- Un conteneur can contain multiple sections ($addSection).
- The color `accentColor` must be in the format hexadecimal avec `#`.
- Le mode spoiler masque tout le content of the conteneur until the user clicks dessus.
