---
layout: doc
title: $userBadges
translation_key: docs
category: "Entity Info"
function_name: userBadges
syntax: $userBadges
description: Returns the list badges (flags publics) of the user qui triggered the command.
---

# $userBadges

The variable `$userBadges` retourne la **list badges publics** (public flags) of the user. Ces badges sont visibles on the profil Discord and indiquent divers statuss (Nitro, HypeSquad, développeur, etc.).

## Syntax

```
$userBadges
```

## Return Value

- **Type** : List/array of strings
- Badges possibles : `Discord Employee`, `Partnered Server Owner`, `HypeSquad Events`, `Bug Hunter Level 1`, `House Bravery`, `House Brilliance`, `House Balance`, `Early Supporter`, `Bug Hunter Level 2`, `Early Verified Bot Developer`, `Active Developer`, `Moderator Programs Alumni`

## Behavior

- `$userBadges` ne prend **no argument**.
- Returns aiquement les badges **publics** (displayeds on the profil).
- Les badges internals or hiddens are not included.

## Examples

### Display les badges in a embed

```bdfd
$title[Profil of $userName]
$author[$userName;$userAvatar]
$description[
**ID :** $userID
**Badges :** $userBadges
]
$color[#5865F2]
$sendMessage[]
```

### Vérifier un badge specific

```bdfd
$if[$checkContains[$userBadges;Early Supporter]==true]
  $sendMessage[Merci of soutenir Discord dethen le début ! 💎]
$endif
```

## Notes

- Tous les users n'ont pas of badges — la list can be vide.
- Les badges sont attribués par Discord and ne can pas être modifieds.
- Utilisez `$checkContains[]` pour check the présence of un badge specific.
