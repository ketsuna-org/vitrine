---
layout: doc
title: $userBanner
translation_key: docs
category: "Entity Info"
function_name: userBanner
syntax: $userBanner
description: Retourne l'URL de la bannière de profil de l'utilisateur qui a déclenché la commande.
---

# $userBanner

La variable `$userBanner` retourne l'**URL de la bannière de profil** de l'utilisateur. La bannière est l'image d'arrière-plan qui apparaît sur les profils Discord (réservée aux abonnés Nitro).

## Syntaxe

```
$userBanner
```

## Valeur de retour

- **Type** : Chaîne de caractères (URL) ou chaîne vide
- Si l'utilisateur a une bannière Nitro, retourne son URL CDN Discord
- Si l'utilisateur n'a pas de bannière, retourne une chaîne vide

## Comportement

- `$userBanner` ne prend **aucun argument**.
- Les bannières sont une fonctionnalité réservée aux abonnés **Discord Nitro**.
- Si aucune bannière n'est définie, la variable retourne une chaîne vide.

## Exemples

### Afficher la bannière si elle existe

```bdfd
$if[$userBanner!=]
  $title[Bannière de $userName]
  $image[$userBanner]
  $color[$userBannerColor]
  $sendMessage[]
$else
  $sendMessage[$userName n'a pas de bannière de profil.]
$endif
```

### Profil complet avec bannière

```bdfd
$title[Profil de $userName]
$description[
**Nom :** $userName
**ID :** $userID
]
$image[$userBanner]
$thumbnail[$userAvatar]
$color[$userBannerColor]
$sendMessage[]
```

## Notes

- Seuls les utilisateurs avec un abonnement **Discord Nitro** peuvent définir une bannière.
- Vérifiez toujours si `$userBanner` est non vide avant de l'utiliser comme image.
- `$userBannerColor` retourne la couleur d'accent associée à la bannière.
