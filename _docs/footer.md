---
layout: doc
title: $footer[]
translation_key: docs
category: "Embed & Message"
function_name: footer
syntax: $footer[text;(iconURL);(embedIndex)]
description: Sets the pied de page (footer) of an embed Discord, avec optionallement une icon. The footer apparaît en bas of the embed.
---

# $footer[]

The function `$footer[]` définit le **pied de page** (footer) of an embed Discord. The footer apparaît tout en bas of the embed and peut inclure une petite icon à gauche du text.

## Syntax

```
$footer[text;(iconURL);(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Text du footer. Longueur maximale : 2048 becauseactères. |
| `iconURL` | Optional. URL of the icon du footer. Doit être une URL valid pointant vers une image. |
| `embedIndex` | Optional. Index of the embed ciblé (0 default). |

## Return Value

Modifies the response in progress de construction. Returns nothing directly.

## Behavior

- Le footer est displayed en bas of the embed, dans une police plus petite.
- Si une `iconURL` est fournie, une petite icon becauserée apparaît à gauche du text.
- Pour modifier only l'icon after avoir défini le footer, utilisez `$footerIcon[]`.

## Examples

### Footer simple

```bdfd
$title[Profil user]
$description[
**Nom :** $username
**ID :** $authorID
]
$footer[Demandé par $username]
$color[#5865F2]
$sendMessage[]
```

### Footer avec icon custome

```bdfd
$title[Information]
$description[Ce bot was created avec BDFD.]
$footer[Propulsé par Bot Designer for Discord;https://bdfd.com/logo.png]
$color[#5865F2]
$sendMessage[]
```

### Footer avec avatar dynamic

```bdfd
$title[Command executed]
$description[The command was traitée avec success.]
$footer[Exécuté par $username;$authorAvatar]
$addTimestamp
$color[#57F287]
$sendMessage[]
```

## Notes

- Le footer est often combiné avec `$addTimestamp[]` pour afficher la date en bas of an embed.
- Si vous souhaitez changer l'icon without modifier le text du footer, utilisez `$footerIcon[]`.
- The URL of the icon must be une image accessible publicment (PNG, JPG, GIF, WebP).
