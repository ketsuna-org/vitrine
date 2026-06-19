---
layout: doc
title: $userAvatar
translation_key: docs
category: "Entity Info"
function_name: userAvatar
syntax: $userAvatar
description: Retourne l'URL de l'avatar global de l'utilisateur qui a déclenché la commande.
parameters: []
returns:
  - type: string (URL)
    description: L'URL de l'avatar global de l'utilisateur, ou l'avatar par défaut Discord.
related:
  - $userServerAvatar
  - $userBanner
  - $authorAvatar
examples:
  - description: Obtenir l'URL de l'avatar
    code: $userAvatar
  - description: Afficher l'avatar dans un embed
    code: |
      $title[Avatar de $userName]
      $image[$userAvatar]
      $color[#5865F2]
      $sendMessage[]
  - description: Utiliser l'avatar comme miniature
    code: |
      $title[Profil]
      $thumbnail[$userAvatar]
      $description[Profil de $userName]
      $color[#5865F2]
      $sendMessage[]
---

# $userAvatar

La variable `$userAvatar` retourne l'**URL de l'avatar global** de l'utilisateur qui a déclenché la commande.

## Syntaxe

```
$userAvatar
```

## Valeur de retour

- **Type** : Chaîne de caractères (URL)
- URL de l'image d'avatar Discord au format PNG ou WebP
- Si l'utilisateur n'a pas d'avatar personnalisé, retourne l'avatar par défaut Discord (couleur basée sur le discriminateur/ID)

## Comportement

- `$userAvatar` ne prend **aucun argument**.
- L'URL retournée pointe vers les CDN Discord (`cdn.discordapp.com`).
- L'avatar est l'image **globale** de l'utilisateur, pas celle spécifique au serveur (voir `$userServerAvatar`).

## Exemples

### Afficher l'avatar en grand

```bdfd
$title[Avatar de $userName]
$image[$userAvatar]
$color[#5865F2]
$sendMessage[]
```

### Afficher l'avatar en miniature dans un profil

```bdfd
$author[$userName;$userAvatar]
$title[Profil utilisateur]
$thumbnail[$userAvatar]
$description[
**Nom :** $userName
**ID :** $userID
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Les URLs d'avatar Discord peuvent être modifiées en ajoutant `?size=256` ou `?size=1024` pour changer la résolution.
- Pour l'avatar spécifique au serveur (si défini), utilisez `$userServerAvatar`.
- L'utilisateur peut changer son avatar à tout moment.
