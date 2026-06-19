---
layout: doc
title: $author[]
translation_key: docs
category: "Embed & Message"
function_name: author
syntax: $author[name;(iconURL);(url);(embedIndex)]
description: Définit l'auteur d'un embed Discord. L'auteur apparaît tout en haut de l'embed, au-dessus du titre, avec une icône et un lien optionnels.
---

# $author[]

La fonction `$author[]` définit la ligne **auteur** d'un embed Discord. Cette ligne apparaît tout en haut de l'embed, au-dessus du titre, et peut inclure une petite icône ronde ainsi qu'un lien cliquable.

## Syntaxe

```
$author[name;(iconURL);(url);(embedIndex)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `name` | Le nom de l'auteur à afficher. Longueur maximale : 256 caractères. |
| `iconURL` | Optionnel. URL de l'image d'avatar (icône ronde à gauche du nom). |
| `url` | Optionnel. URL de destination. Si fournie, le nom devient un lien cliquable. |
| `embedIndex` | Optionnel. Index de l'embed ciblé (0 par défaut). |

## Valeur de retour

Modifie la réponse en cours de construction. Ne retourne rien.

## Comportement

- L'auteur est affiché en haut de l'embed, **au-dessus** du titre.
- L'icône est une petite image ronde (diamètre ~24px).
- Si `url` est fourni, le nom de l'auteur devient un lien hypertexte.
- Pour modifier l'icône ou l'URL après coup, utilisez `$authorIcon[]` et `$authorUrl[]`.

## Exemples

### Auteur simple

```bdfd
$author[$username]
$title[Message de $username]
$description[Ceci est un message embed.]
$color[#5865F2]
$sendMessage[]
```

### Auteur avec avatar

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

### Auteur avec lien cliquable

```bdfd
$author[Site officiel;https://example.com/logo.png;https://example.com]
$title[Bienvenue]
$description[Cliquez sur le nom ci-dessus pour visiter notre site !]
$color[#57F287]
$sendMessage[]
```

## Notes

- L'ordre visuel dans l'embed est : **Auteur** → Titre → Description → Fields → Image → Footer → Timestamp.
- Si vous souhaitez changer uniquement l'icône après avoir défini l'auteur, utilisez `$authorIcon[]`.
- Si vous souhaitez changer uniquement l'URL après avoir défini l'auteur, utilisez `$authorUrl[]`.
