---
layout: doc
title: $footerIcon[]
translation_key: docs
category: "Embed & Message"
function_name: footerIcon
syntax: $footerIcon[url;(embedIndex)]
description: Modifies l'icon du footer of an embed after que celui-ci was défini avec $footer[]. Allows changer only l'image without modifier le text.
---

# $footerIcon[]

The function `$footerIcon[]` allows **modifier only l'icon** d'un footer déjà défini avec `$footer[]`. Elle est utile when vous souhaitez définir une icon dynamic without répéter le text du footer.

## Syntax

```
$footerIcon[url;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `url` | URL of the image à utiliser comme icon du footer. |
| `embedIndex` | Optional. Index of the embed ciblé (0 default). |

## Return Value

Modifies the response in progress de construction. Returns nothing.

## Quand utiliser $footerIcon[]

- Vous avez déjà défini le footer avec `$footer[text]` and souhaitez ajouter or changer l'icon.
- L'icon dépend of a variable dynamic (avatar, status, etc.).
- Vous voulez séparer la logique du text and de l'icon for a comoreover lisible.

## Examples

### Icon dynamic basée sur the user

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
$footer[Dernière vérification : $time]
$if[$var[status]==online]
$footerIcon[https://cdn.example.com/green.png]
$else
$footerIcon[https://cdn.example.com/red.png]
$endif
$color[#57F287]
$sendMessage[]
```

## Notes

- `$footerIcon[]` must be callé **after** `$footer[]`, otherwise there is no de footer sur lequel appliquer l'icon.
- Si `$footerIcon[]` est callé before `$footer[]`, l'icon sera ignorée.
- The URL doit pointer vers une image accessible publicment.
