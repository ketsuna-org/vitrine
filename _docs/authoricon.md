---
layout: doc
title: $authorIcon[]
translation_key: docs
category: "Embed & Message"
function_name: authorIcon
syntax: $authorIcon[url;(embedIndex)]
description: Modifies the icon (avatar) of the author of an embed after que this one has been set with $author[]. Allows changer only the image without modifier the name ni the URL.
---

# $authorIcon[]

The `$authorIcon[]` function **modifier only the icon** of the author of an embed after que this one has been set with `$author[]`. Elle évite of répéter the name and the URL when seule the image doit changer.

## Syntax

```
$authorIcon[url;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `url` | URL of the image to use like icon of the author. |
| `embedIndex` | Optional. Index of the embed ciblé (0 by default). |

## Return value

Modifies the response in progress of construction. Returns nothing.

## Quand use $authorIcon[]

- Vous avez déjà set the author with `$author[name]` and souhaitez ajouter or changer the icon without modifier the name.
- L'icon dépend of a variable dynamic (avatar, role, etc.).
- Vous voulez un comoreover modulaire and lisible.

## Examples

### Ajouter l'avatar of the user like icon

```bdfd
$author[$username]
$authorIcon[$authorAvatar]
$title[Profil of $username]
$description[
**ID :** $authorID
**Counts created le :** $creationDate[$authorID]
]
$color[#5865F2]
$sendMessage[]
```

### Icon differente according to the role

```bdfd
$author[Message of la modération]
$if[$hasRole[$authorID;admin]]
$authorIcon[https://cdn.example.com/admin-badge.png]
$elseif[$hasRole[$authorID;modo]]
$authorIcon[https://cdn.example.com/modo-badge.png]
$else
$authorIcon[$authorAvatar]
$endif
$title[Avertissement]
$description[Veuillez respecter les règles of the server.]
$color[#ED4245]
$sendMessage[]
```

## Notes

- `$authorIcon[]` must be called **after** `$author[]`, otherwise the icon does not have of auteur on lequel s'appliquer.
- Si `$authorIcon[]` est called before `$author[]`, the icon will be ignorée.
- The URL must point vers an image accessible publicment (PNG, JPG, GIF, WebP).
- Pour changer the name or ajouter a link, use respectivement `$author[]` (qui redéfinit tout) or `$authorUrl[]`.
