---
layout: doc
title: $authorBanner
translation_key: docs
category: "Entity Info"
function_name: authorBanner
syntax: $authorBanner
description: Retourne l'URL de la bannière de profil de l'auteur du message. Réservé aux abonnés Nitro.
parameters: []
returns:
  - type: string (URL)
    description: L'URL de la bannière de l'auteur, ou chaîne vide si pas de bannière.
related:
  - $authorAvatar
  - $userBanner
  - $userBannerColor
  - $authorID
examples:
  - description: Obtenir la bannière de l'auteur
    code: $authorBanner
  - description: Afficher la bannière si présente
    code: |
      $if[$authorBanner!=]
        $title[Bannière de $authorUsername]
        $image[$authorBanner]
        $color[$userBannerColor]
        $sendMessage[]
      $else
        $sendMessage[Pas de bannière.]
      $endif
---

# $authorBanner

La variable `$authorBanner` retourne l'**URL de la bannière de profil** de l'auteur du message. Les bannières sont réservées aux abonnés Discord Nitro.

## Syntaxe

```
$authorBanner
```

## Valeur de retour

- **Type** : Chaîne de caractères (URL) ou chaîne vide
- URL CDN Discord si l'auteur a une bannière Nitro
- Chaîne vide si l'auteur n'a pas de bannière

## Comportement

- `$authorBanner` ne prend **aucun argument**.
- Équivalent à `$userBanner` pour les commandes textuelles.
- Seuls les abonnés Nitro peuvent définir une bannière.

## Exemples

### Afficher la bannière

```bdfd
$if[$authorBanner!=]
  $title[Bannière de $authorUsername]
  $image[$authorBanner]
  $color[$userBannerColor]
  $sendMessage[]
$else
  $sendMessage[$authorUsername n'a pas de bannière Nitro.]
$endif
```

### Profil complet

```bdfd
$author[$authorUsername;$authorAvatar]
$title[Profil de $authorUsername]
$description[**ID :** $authorID]
$image[$authorBanner]
$thumbnail[$authorAvatar]
$color[$userBannerColor]
$sendMessage[]
```

## Notes

- Vérifiez toujours si `$authorBanner` est non vide avant de l'utiliser comme image d'embed.
- Pour la couleur d'accent de la bannière, utilisez `$userBannerColor`.
