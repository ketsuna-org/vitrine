---
layout: doc
title: $footer[]
translation_key: docs
category: "Embed & Message"
function_name: footer
syntax: $footer[text;(iconURL);(embedIndex)]
description: Définit le pied de page (footer) d'un embed Discord, avec optionnellement une icône. Le footer apparaît en bas de l'embed.
parameters:
  - name: text
    description: Texte du footer. Généralement utilisé pour des informations secondaires comme un timestamp ou une signature.
  - name: iconURL
    description: "Optionnel. URL de l'icône à afficher à gauche du texte du footer. L'URL doit être valide et accessible."
  - name: embedIndex
    description: "Optionnel. Index de l'embed ciblé (défaut : 0)."
returns:
  - type: void
    description: Modifie la réponse en cours de construction.
related:
  - $footerIcon[]
  - $addTimestamp[]
  - $author[]
  - $sendMessage[]
examples:
  - description: Footer simple avec texte
    code: |
      $title[Profil]
      $description[Informations sur l'utilisateur.]
      $footer[Demandé par $username]
      $color[#5865F2]
  - description: Footer avec texte et icône
    code: $footer[Bot créé avec BDFD;https://example.com/icon.png]
  - description: Footer avec avatar de l'utilisateur comme icône
    code: $footer[Demandé par $username;$authorAvatar]
---

# $footer[]

La fonction `$footer[]` définit le **pied de page** (footer) d'un embed Discord. Le footer apparaît tout en bas de l'embed et peut inclure une petite icône à gauche du texte.

## Syntaxe

```
$footer[text;(iconURL);(embedIndex)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `text` | Texte du footer. Longueur maximale : 2048 caractères. |
| `iconURL` | Optionnel. URL de l'icône du footer. Doit être une URL valide pointant vers une image. |
| `embedIndex` | Optionnel. Index de l'embed ciblé (0 par défaut). |

## Valeur de retour

Modifie la réponse en cours de construction. Ne retourne rien directement.

## Comportement

- Le footer est affiché en bas de l'embed, dans une police plus petite.
- Si une `iconURL` est fournie, une petite icône carrée apparaît à gauche du texte.
- Pour modifier uniquement l'icône après avoir défini le footer, utilisez `$footerIcon[]`.

## Exemples

### Footer simple

```bdfd
$title[Profil utilisateur]
$description[
**Nom :** $username
**ID :** $authorID
]
$footer[Demandé par $username]
$color[#5865F2]
$sendMessage[]
```

### Footer avec icône personnalisée

```bdfd
$title[Information]
$description[Ce bot a été créé avec BDFD.]
$footer[Propulsé par Bot Designer for Discord;https://bdfd.com/logo.png]
$color[#5865F2]
$sendMessage[]
```

### Footer avec avatar dynamique

```bdfd
$title[Commande exécutée]
$description[La commande a été traitée avec succès.]
$footer[Exécuté par $username;$authorAvatar]
$addTimestamp
$color[#57F287]
$sendMessage[]
```

## Notes

- Le footer est souvent combiné avec `$addTimestamp[]` pour afficher la date en bas d'un embed.
- Si vous souhaitez changer l'icône sans modifier le texte du footer, utilisez `$footerIcon[]`.
- L'URL de l'icône doit être une image accessible publiquement (PNG, JPG, GIF, WebP).
