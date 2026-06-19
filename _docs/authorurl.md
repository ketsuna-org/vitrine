---
layout: doc
title: $authorUrl[]
translation_key: docs
category: "Embed & Message"
function_name: authorUrl
syntax: $authorUrl[url;(embedIndex)]
description: Modifies l'Destination URL de the author of an embed. Rend the name de the author cliquable without avoir à redéfinir the name and the icon.
---

# $authorUrl[]

The `$authorUrl[]` function **modifier only the URL** de destination de the author of an embed. A fois définie, the name de the author devient a link hypertext cliquable.

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

Modifies the response in progress de construction. Returns nothing.

## Quand utiliser $authorUrl[]

- Vous avez déjà set the author avec `$author[name]` or `$author[name;icon]` and souhaitez le rendre cliquable.
- The URL est dynamic (dépend of a variable, d'an ID, etc.).
- Vous souhaitez séparer la définition of the name/icon de that of the link pour more than clarté.

## Examples

### Link vers le profil Discord of the user

```bdfd
$author[$username;$authorAvatar]
$authorUrl[https://discord.com/users/$authorID]
$title[Profil user]
$description[
Cliquez sur the name ci-dessus pour ouvrir le profil Discord.
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

### Auteur avec all attributes separateds

```bdfd
$author[Bot Designer for Discord]
$authorIcon[https://bdfd.com/icon.png]
$authorUrl[https://bdfd.com]
$title[Created avec BDFD]
$description[Ce bot has been created avec Bot Designer for Discord.]
$footer[Version 2.0]
$color[#5865F2]
$sendMessage[]
```

## Notes

- `$authorUrl[]` must be called **after** `$author[]`, otherwise there is no d'auteur sur lequel appliquer the URL.
- Si vous callez `$authorUrl[]` seul (without `$author[]` au préalable), the URL will be ignorée.
- The URL must be absolue (commençant par `http://` or `https://`).
