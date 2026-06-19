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
- La détection se base on the roles of booster or le status of boost of the member.
- Un user peut booster several servers simultanément (selon son abonnement Nitro).

## Examples

### Remerciement automatique

```bdfd
$if[$isBooster==true]
  $title[Merci for the boost ! 🚀]
  $description[
  Grâce to vous, the server bénéficie of :
  - Plus of emojis
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
  $sendMessage[Ce channel est réservé to the boosters of the server.]
  $stop
$endif
```

## Notes

- The color classique of the boost Nitro est `#F47FFF` (rose/magenta).
- Les boosters ont often un badge special (visible with `$userBadges`).
- Utile pour create beforeages excludedsifs to the boosters (channels, roles, commands).
