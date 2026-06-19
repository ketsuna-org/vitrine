---
layout: doc
title: $addModalFileUpload[]
translation_key: docs
category: "Embed & Message"
function_name: addModalFileUpload
syntax: $addModalFileUpload[customId;label;(required)]
description: Ajoute a component de téléversement de file à a modal Discord. Allows the user to joindre a file directly since le modal.
---

# $addModalFileUpload[] — Téléversement de File dans un Modal

`$addModalFileUpload[]` ajoute a component permettant à the user de joindre a file directly since a modal Discord. The file téléversé est then accessible in the gestionnaire d'interaction.

## Syntax

```
$addModalFileUpload[customId;label;(required)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier of the field file. |
| `label` | Yes | — | Text displayed above of the field. |
| `required` | No | `yes` | `yes` si required, `no` otherwise. |

## Return value

Ajoute le composant d'upload au modal. The URL and les métadatas of the file sont accessibles via `$input[customId]` after soumission.

## Usage

### Upload required

```bdfd
$newModal[Candidature;apply_modal]
$addModalTextDisplay[Veuillez joindre votre CV in the format PDF.]
$addModalTextInput[motivation;Lettre de motivation;paragraph;;;yes;50;1000]
$addModalFileUpload[cv;Votre CV (PDF);yes]
```

### Upload optional avec autres champs

```bdfd
$newModal[Signalement;report_modal]
$addModalTextInput[description;Description of the problème;paragraph;;;yes;20;1000]
$addModalFileUpload[screenshot;Capture d'écran (optionalle);no]
```

### Traitement of the file

```bdfd
$onInteraction[apply_submit]
$var[cv_url;$input[cv]]
$var[motivation;$input[motivation]]
$sendMessage[New candidature receivede !
CV : $var[cv_url]
Motivation : $var[motivation]]
$endInteraction
```

## Notes

- Le file est hébergé temporarily par Discord ; the URL retournée est a URL CDN Discord.
- Le `customId` must be unique au sein of the modal.
- The size maximale of the file est déterminée par Discord (generally 25 Mo selon le level de boost of the server).
- Ce composant n'is available que in thes modals (pas in thes messages classiques).
