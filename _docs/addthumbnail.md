---
layout: doc
title: $addThumbnail[]
translation_key: docs
category: "Embed & Message"
function_name: addThumbnail
syntax: $addThumbnail[url;(description);(spoiler)]
description: Ajoute an image miniature (thumbnail) inside d'a section de conteneur. Ce is not le thumbnail of an embed classique mais a component visuel autonome.
---

# $addThumbnail[] — Miniature Visuelle

`$addThumbnail[]` insère an image miniature dans a section de conteneur. Cette function ajoute a component d'image autonome — distinct du thumbnail d'embed traditionnel set par `$thumbnail[]`.

## Syntax

```
$addThumbnail[url;(description);(spoiler)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `url` | Yes | — | URL of the image (must be a URL valid). |
| `description` | No | — | Text alternatif for the accessibilité. |
| `spoiler` | No | `no` | `yes` pour masquer the image. |

## Return value

Ajoute the image miniature à la section courante du conteneur. The image est rendue en petit format.

## Usage

### Avatar user

```bdfd
$addContainer[profile;#5865F2;no]
$addSection
$addThumbnail[$authorAvatar;Avatar de $username]
$addField[User;$username;no]
```

### Icon de server

```bdfd
$addContainer[server_info;#2ECC71;no]
$addSection
$addThumbnail[$serverIcon;Icon of the server]
$addField[Server;$serverName;yes]
$addField[Members;$membersCount;yes]
```

### Image spoiler

```bdfd
$addContainer[secret_content;#E74C3C;no]
$addSection
$addThumbnail[$var[hidden_image];Image secrète;yes]
$addTextDisplay[Cliquez pour révéler the image...]
```

### Dans une mise en page complex

```bdfd
$addContainer[catalog;#9B59B6;no]

$addSection
$addThumbnail[https://cdn.example.com/item1.png;Épée de feu]
$addField[Épée de feu;5000 or;yes]

$addSection
$addThumbnail[https://cdn.example.com/item2.png;Bouclier de glace]
$addField[Bouclier de glace;3500 or;yes]
```

## Notes

- Doit être utilisé dans a section (`$addSection`) inside of a container (`$addContainer`).
- Ne pas confondre avec `$thumbnail[]` qui définit le thumbnail of an embed classique.
- The URL must point vers an image accessible publicment (PNG, JPEG, GIF, WebP).
- Pour a gallery d'images multiple, use `$addMediaGallery[]`.
