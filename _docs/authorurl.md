---
layout: doc
title: $authorUrl[]
translation_key: docs
category: "Embed & Message"
function_name: authorUrl
syntax: $authorUrl[url;(embedIndex)]
description: Modifies l'Destination URL of the author of an embed. Rend the name of the author cliquable without avoir to redefine the name and the icon.
---

# $authorUrl[]

The `$authorUrl[]` function **modifier only the URL** of destination of the author of an embed. A fois définie, the name of the author devient a link hypertext cliquable.

## Syntax

```
$authorUrl[url;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `url` | Destination URL. The author name pointera vers cette adresse. |
| `embedIndex` | Optional. Index of the embed ciblé (0 by default). |

## Return value

Modifies the response in progress of construction. Returns nothing.

## Quand use $authorUrl[]

- Vous avez déjà set the author with `$author[name]` or `$author[name;icon]` and souhaitez le rendre cliquable.
- The URL est dynamic (dépend of a variable, of an ID, etc.).
- Vous souhaitez separate the définition of the name/icon of that of the link pour more than clarté.

## Examples

### Link vers le profil Discord of the user

```bdfd
$author[$username;$authorAvatar]
$authorUrl[https://discord.com/users/$authorID]
$title[Profil user]
$description[
Cliquez on the name ci-dessus pour ouvrir le profil Discord.
]
$color[#5865F2]
$sendMessage[]
```

### Link conditionnel

```bdfd
$author[Site web;$serverIcon]
$if[$var[page]!=]
$authorUrl[https://monsite.com/$var[page]]
$else
$authorUrl[https://monsite.com]
$endif
$title[Navigation]
$description[Selectionnez une page in the menu ci-dessous.]
$color[#5865F2]
$sendMessage[]
```

### Auteur with all attributes separateds

```bdfd
$author[Bot Designer for Discord]
$authorIcon[https://bdfd.com/icon.png]
$authorUrl[https://bdfd.com]
$title[Created with BDFD]
$description[Ce bot has been created with Bot Designer for Discord.]
$footer[Version 2.0]
$color[#5865F2]
$sendMessage[]
```

## Notes

- `$authorUrl[]` must be called **after** `$author[]`, otherwise there is no of auteur on lequel appliquer the URL.
- Si vous callez `$authorUrl[]` seul (without `$author[]` to the préalable), the URL will be ignorée.
- The URL must be absolue (commençant par `http://` or `https://`).
