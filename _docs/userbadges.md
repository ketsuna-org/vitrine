---
layout: doc
title: $userBadges
translation_key: docs
category: "Entity Info"
function_name: userBadges
syntax: $userBadges
description: Retourne la liste des badges (flags publics) de l'utilisateur qui a déclenché la commande.
parameters: []
returns:
  - type: list/array
    description: Liste des badges publics de l'utilisateur.
related:
  - $userInfo
  - $isBot
  - $isAdmin
examples:
  - description: Obtenir les badges
    code: $userBadges
  - description: Afficher les badges dans un profil
    code: |
      $title[Profil de $userName]
      $description[
      **Badges :** $userBadges
      ]
      $color[#5865F2]
      $sendMessage[]
---

# $userBadges

La variable `$userBadges` retourne la **liste des badges publics** (public flags) de l'utilisateur. Ces badges sont visibles sur le profil Discord et indiquent divers statuts (Nitro, HypeSquad, développeur, etc.).

## Syntaxe

```
$userBadges
```

## Valeur de retour

- **Type** : Liste/tableau de chaînes
- Badges possibles : `Discord Employee`, `Partnered Server Owner`, `HypeSquad Events`, `Bug Hunter Level 1`, `House Bravery`, `House Brilliance`, `House Balance`, `Early Supporter`, `Bug Hunter Level 2`, `Early Verified Bot Developer`, `Active Developer`, `Moderator Programs Alumni`

## Comportement

- `$userBadges` ne prend **aucun argument**.
- Retourne uniquement les badges **publics** (affichés sur le profil).
- Les badges internes ou masqués ne sont pas inclus.

## Exemples

### Afficher les badges dans un embed

```bdfd
$title[Profil de $userName]
$author[$userName;$userAvatar]
$description[
**ID :** $userID
**Badges :** $userBadges
]
$color[#5865F2]
$sendMessage[]
```

### Vérifier un badge spécifique

```bdfd
$if[$checkContains[$userBadges;Early Supporter]==true]
  $sendMessage[Merci de soutenir Discord depuis le début ! 💎]
$endif
```

## Notes

- Tous les utilisateurs n'ont pas de badges — la liste peut être vide.
- Les badges sont attribués par Discord et ne peuvent pas être modifiés.
- Utilisez `$checkContains[]` pour vérifier la présence d'un badge spécifique.
