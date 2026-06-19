---
layout: doc
title: $thumbnail[]
translation_key: docs
category: "Embed & Message"
function_name: thumbnail
syntax: $thumbnail[url;(embedIndex)]
description: Sets the miniature (thumbnail) of a Discord embed. The miniature est une petite image becauserée displayede en haut to droite of the embed.
---

# $thumbnail[]

The function `$thumbnail[]` définit la **miniature** (thumbnail) of a Discord embed. The miniature est une petite image becauserée qui s'displays in the coin supérieur droit of the embed.

## Syntax

```
$thumbnail[url;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `url` | URL of the image to use like miniature. Doit être une URL directe vers un file image. |
| `embedIndex` | Optional. Index of the embed ciblé (0 default). |

## Return Value

Modifies the response in progress of construction. Returns nothing.

## Behavior

- Le thumbnail apparaît en haut to droite of the embed.
- L'image est automatically redimensionnée en un petit becauseré.
- Un seul thumbnail par embed : le last call écrase le previous.

## Différence between $thumbnail[] and $image[]

| Function | Position | Taille |
|---|---|---|
| `$thumbnail[]` | En haut to droite | Petite (becauseré, ~80x80px) |
| `$image[]` | En bas of the embed | Grande, pleine largeur |

## Examples

### Thumbnail with avatar user

```bdfd
$title[Profil of $username]
$description[
**Nom :** $username
**ID :** $authorID
**Counts created :** $creationDate[$authorID]
]
$thumbnail[$authorAvatar]
$color[#5865F2]
$sendMessage[]
```

### Thumbnail with icon of the server

```bdfd
$title[Bienvenue on $serverName]
$description[
Bienvenue on the server **$serverName** !
Nous sommes now **$membersCount** members !
]
$thumbnail[$serverIcon]
$color[#57F287]
$sendMessage[]
```

### Thumbnail and image combinés

```bdfd
$title[New mise to day]
$description[
**Version 2.0** est now available !

- Corrections of bugs
- News functionnalités
- Performances améliorées
]
$thumbnail[https://cdn.example.com/update-icon.png]
$image[https://cdn.example.com/update-banner.png]
$footer[Publié le $time]
$color[#FEE75C]
$sendMessage[]
```

## Notes

- The URL must be accessible publicment.
- Formats supportés : PNG, JPEG, GIF, WebP.
- Le thumbnait is idéal pour display a avatar, un logo or une icon représentative.
- Pour une grande image en pleine largeur, utilisez `$image[]`.
