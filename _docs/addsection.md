---
layout: doc
title: $addSection[]
translation_key: docs
category: "Embed & Message"
function_name: addSection
syntax: $addSection[(id)]
description: Crée a section inside of a container. The sections allow organize le contenu (champs, text, thumbnails) of manière structurée in a visual container.
---

# $addSection[] — Section in a Conteneur

`$addSection[]` crée a section inside of a container previously initialisé with `$addContainer[]`. The sections structurent visually le contenu and can contain of fields, of the text, and médias.

## Syntax

```
$addSection[(id)]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `id` | No | Optional identifier for the section. |

## Return value

Initialise a section in the container courant. The components nexts are added to cette section.

## Usage

### Conteneur with a section

```bdfd
$addContainer[user_info;#E67E22;no]
$addSection
$addField[Pseudo;$username;no]
$addField[ID;$authorID;no]
$addField[Date of inscription;$creationDate;no]
```

### Multi-section container

```bdfd
$addContainer[embed;#9B59B6;no]

$addSection[header]
$addThumbnail[$authorAvatar]
$addTextDisplay[**Profil of $username**]

$addSection[stats]
$addField[Messages;$var[msg_count];yes]
$addField[XP;$var[xp];yes]

$addSection[footer]
$addTextDisplay[📅 Member since $memberJoinDate]
```

### Sections in a message complex

```bdfd
$addContainer[shop;#3498DB;no]

$addSection[item1]
$addField[Article;Épée légendaire;yes]
$addField[Prix;5000 pièces of or;yes]

$addSection[item2]
$addField[Article;Bouclier mystique;yes]
$addField[Prix;3500 pièces of or;yes]
```

## Notes

- Doit être utilisé inside of a container (`$addContainer`).
- Multiple sections can coexister in a même container.
- Each section can contain of fields (`$addField`), of the text (`$addTextDisplay`), or a thumbnail (`$addThumbnail`).
- L'ordre of ajout détermine the order of affichage in the message.
