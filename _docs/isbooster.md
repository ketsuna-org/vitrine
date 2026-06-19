---
layout: doc
title: $isBooster
translation_key: docs
category: "Entity Info"
function_name: isBooster
syntax: $isBooster
description: Returns "true" si the user est un booster of the server (Nitro Boost), "false" otherwise.
---

# $isBooster

The variable `$isBooster` retourne `"true"` si the user est un **Nitro Booster** of the server current.

## Syntax

```
$isBooster
```

## Return Value

- **Type** : String `"true"` or `"false"`
- `"true"` : the user booste the server
- `"false"` : the user ne booste pas the server

## Behavior

- `$isBooster` ne prend **no argument**.
- La détection se base sur les roles de booster or le status de boost du member.
- Un user peut booster several servers simultanément (selon son abonnement Nitro).

## Examples

### Remerciement automatique

```bdfd
$if[$isBooster==true]
  $title[Merci for the boost ! 🚀]
  $description[
  Grâce à vous, the server bénéficie de :
  - Plus d'emojis
  - Meilleure qualité audio
  - Banner server
  - Et plus encore !
  ]
  $color[#F47FFF]
  $sendMessage[]
$endif
```

### Channel excludedsif boosters

```bdfd
$if[$isBooster==true]
  $sendMessage[Bienvenue in the channel excludedsif boosters !]
$else
  $sendMessage[Ce channel est réservé aux boosters of the server.]
  $stop
$endif
```

## Notes

- The color classique du boost Nitro est `#F47FFF` (rose/magenta).
- Les boosters ont often un badge special (visible avec `$userBadges`).
- Utile pour créer des beforeages excludedsifs aux boosters (channels, roles, commands).
