---
layout: doc
title: $addThumbnail[]
translation_key: docs
category: "Embed & Message"
function_name: addThumbnail
syntax: $addThumbnail[url;(description);(spoiler)]
description: Ajoute an image miniature (thumbnail) inside of a section of container. Ce is not le thumbnail of an embed classique mais a component visual autonome.
---

# $addThumbnail[] — Miniature Visualle

`$addThumbnail[]` insère an image miniature in a section of container. Cette function ajoute a component of image autonome — distinct of the thumbnail of embed traditionnel set par `$thumbnail[]`.

## Syntax

```
$addThumbnail[url;(description);(spoiler)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `url` | Yes | — | URL of the image (must be a URL valid). |
| `description` | No | — | Text alternatif for the accessibilité. |
| `spoiler` | No | `no` | `yes` pour hide the image. |

## Return value

Ajoute the image miniature to la section courante of the container. The image est rendue en petit format.

## Usage

### Avatar user

```bdfd
$addContainer[profile;#5865F2;no]
$addSection
$addThumbnail[$authorAvatar;Avatar of $username]
$addField[User;$username;no]
```

### Icon of server

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
$addThumbnail[https://cdn.example.com/item1.png;Épée of feu]
$addField[Épée of feu;5000 or;yes]

$addSection
$addThumbnail[https://cdn.example.com/item2.png;Bouclier of glace]
$addField[Bouclier of glace;3500 or;yes]
```

## Notes

- Doit être utilisé in a section (`$addSection`) inside of a container (`$addContainer`).
- Ne pas confondre with `$thumbnail[]` qui définit le thumbnail of an embed classique.
- The URL must point vers an image accessible publicment (PNG, JPEG, GIF, WebP).
- Pour a gallery of images multiple, use `$addMediaGallery[]`.
