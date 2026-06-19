---
layout: doc
title: $addSection[]
translation_key: docs
category: "Embed & Message"
function_name: addSection
syntax: $addSection[(id)]
description: Crée a section inside of a container. The sections permettent d'organize le contenu (champs, text, thumbnails) de manière structurée in a container visuel.
---

# $addSection[] — Section dans un Conteneur

`$addSection[]` crée a section inside of a container previously initialisé avec `$addContainer[]`. The sections structurent visually le contenu and can contain of fields, of the text, and médias.

## Syntax

```
$addSection[(id)]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `id` | No | Optional identifier for the section. |

## Return value

Initialise a section in the container courant. The components nexts are added à cette section.

## Usage

### Conteneur with a section

```bdfd
$addContainer[user_info;#E67E22;no]
$addSection
$addField[Pseudo;$username;no]
$addField[ID;$authorID;no]
$addField[Date d'inscription;$creationDate;no]
```

### Multi-section container

```bdfd
$addContainer[embed;#9B59B6;no]

$addSection[header]
$addThumbnail[$authorAvatar]
$addTextDisplay[**Profil de $username**]

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
$addField[Prix;5000 pièces d'or;yes]

$addSection[item2]
$addField[Article;Bouclier mystique;yes]
$addField[Prix;3500 pièces d'or;yes]
```

## Notes

- Doit être utilisé inside of a container (`$addContainer`).
- Multiple sections peuvent coexister dans un même conteneur.
- Each section can contain of fields (`$addField`), of the text (`$addTextDisplay`), or a thumbnail (`$addThumbnail`).
- L'ordre d'ajout détermine the order d'affichage in the message.
