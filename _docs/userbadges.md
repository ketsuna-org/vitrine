---
layout: doc
title: $userBadges
translation_key: docs
category: "Entity Info"
function_name: userBadges
syntax: $userBadges
description: Returns the list des badges (flags publics) of the user qui a déclenché the command.
---

# $userBadges

The variable `$userBadges` retourne la **list des badges publics** (public flags) of the user. Ces badges sont visibles sur le profil Discord and indiquent divers statuss (Nitro, HypeSquad, développeur, etc.).

## Syntax

```
$userBadges
```

## Return Value

- **Type** : List/array de strings
- Badges possibles : `Discord Employee`, `Partnered Server Owner`, `HypeSquad Events`, `Bug Hunter Level 1`, `House Bravery`, `House Brilliance`, `House Balance`, `Early Supporter`, `Bug Hunter Level 2`, `Early Verified Bot Developer`, `Active Developer`, `Moderator Programs Alumni`

## Behavior

- `$userBadges` ne prend **no argument**.
- Returns aiquement les badges **publics** (displayeds sur le profil).
- Les badges internals or hiddens are not included.

## Examples

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
  $sendMessage[Merci de soutenir Discord dethen le début ! 💎]
$endif
```

## Notes

- Tous les users n'ont pas de badges — la list can be vide.
- Les badges sont attribués par Discord and ne peuvent pas être modifieds.
- Utilisez `$checkContains[]` pour vérifier la présence d'un badge spécifique.
