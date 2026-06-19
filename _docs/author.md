---
layout: doc
title: $author[]
translation_key: docs
category: "Embed & Message"
function_name: author
syntax: $author[name;(iconURL);(url);(embedIndex)]
description: Sets the author of a Discord embed. The author apparaît tout at the top of the embed, above of the title, with a icon and a link optionals.
---

# $author[]

The `$author[]` function définit la ligne **auteur** of a Discord embed. Cette ligne apparaît tout at the top of the embed, above of the title, and can include une petite icon ronde as well as a link cliquable.

## Syntax

```
$author[name;(iconURL);(url);(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The author name to display. Maximum length: 256 characters. |
| `iconURL` | Optional. URL of the image of avatar (icon ronde to the left of the name). |
| `url` | Optional. Destination URL. If providede, the name devient a link cliquable. |
| `embedIndex` | Optional. Index of the embed ciblé (0 by default). |

## Return value

Modifies the response in progress of construction. Returns nothing.

## Behavior

- The author is displayed at the top of the embed, **above** of the title.
- L'icon est une petite image ronde (diamètre ~24px).
- Si `url` is provided, the name of the author devient a link hypertext.
- To modify the icon or the URL afterwards, use `$authorIcon[]` and `$authorUrl[]`.

## Examples

### Simple author

```bdfd
$author[$username]
$title[Message of $username]
$description[This is a message embed.]
$color[#5865F2]
$sendMessage[]
```

### Author with avatar

```bdfd
$author[$username;$authorAvatar]
$title[Profil]
$description[
**Nom :** $username
**ID :** $authorID
]
$color[#5865F2]
$sendMessage[]
```

### Author with clickable link

```bdfd
$author[Site officiel;https://example.com/logo.png;https://example.com]
$title[Bienvenue]
$description[Cliquez on the name ci-dessus pour visiter notre site !]
$color[#57F287]
$sendMessage[]
```

## Notes

- L'ordre visual in the embed est : **Auteur** → Titre → Description → Fields → Image → Footer → Timestamp.
- Si vous souhaitez changer only the icon after set the author, use `$authorIcon[]`.
- Si vous souhaitez changer only the URL after set the author, use `$authorUrl[]`.
