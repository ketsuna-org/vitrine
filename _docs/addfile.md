---
layout: doc
title: $addFile[]
translation_key: docs
category: "Embed & Message"
function_name: addFile
syntax: $addFile[url;(spoiler)]
description: Attache a file (image, document, etc.) to a message Discord as a composant visual. The file is displayed directly in the message.
---

# $addFile[] — Pièce Jointe File

`$addFile[]` attache a file (image, PDF, document, etc.) to a message. The file est téléloaded since the URL fournie and displayed like attachment in the message Discord.

## Syntax

```
$addFile[url;(spoiler)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `url` | Yes | — | URL of the file to attach. |
| `spoiler` | No | `no` | `yes` pour spoiler le file. |

## Return value

Ajoute le file like attachment to the message. Discord displays the file according to its type (aperçu for images, icon + nom for documents).

## Usage

### Joindre an image

```bdfd
$addFile[https://cdn.example.com/chart.png]
$sendMessage[Voici le graphique demandé]
```

### PDF document

```bdfd
$addFile[https://docs.example.com/rapport-2024.pdf]
$sendMessage[Rapport annuel ci-joint]
```

### Spoiler file

```bdfd
$addFile[https://cdn.example.com/spoiler_endgame.png;yes]
$sendMessage[Warning: spoiler of fin !]
```

### Multiple files

```bdfd
$addFile[https://files.example.com/logs.txt]
$addFile[https://files.example.com/config.json]
$sendMessage[Files of configuration]
```

### With embed and file

```bdfd
$title[Rapport mensuel]
$description[Voici le rapport détaillé of the months]
$color[#5865F2]
$addFile[https://reports.example.com/monthly.pdf]
```

## Supported fithe types

- Images : PNG, JPEG, GIF, WebP
- Documents : PDF, TXT, CSV, JSON, XML
- Archives : ZIP (limité)
- Taille max : ~25 Mo (selon le level of boost of the server)

## Notes

- The URL must be accessible publicment.
- Multiple `$addFile[]` can be utilisés in a même message.
- À not confondre with `$addModalFileUpload[]` qui est for modals interactifs.
- Le spoiler masque le file until the user clicks for the révéler.
