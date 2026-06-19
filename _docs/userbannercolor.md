---
layout: doc
title: $userBannerColor
translation_key: docs
category: "Entity Info"
function_name: userBannerColor
syntax: $userBannerColor
description: Retourne la couleur d'accent de la bannière de profil de l'utilisateur au format hexadécimal.
parameters: []
returns:
  - type: string
    description: "Couleur hexadécimale (ex: \"#5865F2\"), ou chaîne vide si pas de bannière."
related:
  - $userBanner
  - $userAvatar
  - $color
examples:
  - description: Obtenir la couleur d'accent
    code: $userBannerColor
  - description: Utiliser la couleur dans un embed
    code: |
      $title[Profil de $userName]
      $description[Thème personnalisé !]
      $color[$userBannerColor]
      $sendMessage[]
---

# $userBannerColor

La variable `$userBannerColor` retourne la **couleur d'accent** associée à la bannière de profil de l'utilisateur. Cette couleur est automatiquement extraite par Discord à partir de la bannière.

## Syntaxe

```
$userBannerColor
```

## Valeur de retour

- **Type** : Chaîne de caractères (hexadécimal)
- Format : `#RRGGBB` (ex: `#5865F2`)
- Si l'utilisateur n'a pas de bannière, retourne une chaîne vide

## Comportement

- `$userBannerColor` ne prend **aucun argument**.
- La couleur est déterminée par Discord à partir de la bannière Nitro de l'utilisateur.
- Utilisable directement dans `$color[]` pour assortir visuellement l'embed au thème du profil.

## Exemples

### Embed thématique

```bdfd
$if[$userBannerColor!=]
  $title[Profil de $userName]
  $description[Les couleurs de cet embed correspondent à votre bannière !]
  $color[$userBannerColor]
  $author[$userName;$userAvatar]
  $sendMessage[]
$else
  $title[Profil de $userName]
  $description[Vous n'avez pas de bannière.]
  $color[#5865F2]
  $sendMessage[]
$endif
```

## Notes

- Couplé avec `$userBanner`, permet de créer des embeds au thème personnalisé pour chaque utilisateur.
- Si l'utilisateur n'a pas de bannière, prévoyez une couleur de fallback.
