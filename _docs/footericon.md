---
layout: doc
title: $footerIcon[]
translation_key: docs
category: "Embed & Message"
function_name: footerIcon
syntax: $footerIcon[url;(embedIndex)]
description: Modifies l'icon of the footer of an embed after que celui-ci was défini with $footer[]. Allows changer only l'image without modifier le text.
---

# $footerIcon[]

The function `$footerIcon[]` allows **modifier only l'icon** of un footer déjà défini with `$footer[]`. Elle est utile when vous souhaitez define ae icon dynamic without répéter le text of the footer.

## Syntax

```
$footerIcon[url;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `url` | URL of the image to use like icon of the footer. |
| `embedIndex` | Optional. Index of the embed ciblé (0 default). |

## Return Value

Modifies the response in progress of construction. Returns nothing.

## Quand use $footerIcon[]

- Vous avez déjà défini le footer with `$footer[text]` and souhaitez ajouter or changer l'icon.
- L'icon dépend of a variable dynamic (avatar, status, etc.).
- Vous voulez separate the logique of the text and of l'icon for a comoreover lisible.

## Examples

### Icon dynamic basée on the user

```bdfd
$title[Profil]
$description[
**Nom :** $username
**Tag :** $discriminator
]
$footer[Demandé par $username]
$footerIcon[$authorAvatar]
$color[#5865F2]
$sendMessage[]
```

### Icon conditionnelle

```bdfd
$title[Status of the server]
$description[The server est opérationnel.]
$footer[Last vérification : $time]
$if[$var[status]==online]
$footerIcon[https://cdn.example.com/green.png]
$else
$footerIcon[https://cdn.example.com/red.png]
$endif
$color[#57F287]
$sendMessage[]
```

## Notes

- `$footerIcon[]` must be callé **after** `$footer[]`, otherwise there is no of footer on lequel appliquer l'icon.
- Si `$footerIcon[]` est callé before `$footer[]`, l'icon sera ignorée.
- The URL doit pointer vers une image accessible publicment.
