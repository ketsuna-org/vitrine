---
layout: doc
title: $isBooster
translation_key: docs
category: "Entity Info"
function_name: isBooster
syntax: $isBooster
description: Retourne "true" si l'utilisateur est un booster du serveur (Nitro Boost), "false" sinon.
---

# $isBooster

La variable `$isBooster` retourne `"true"` si l'utilisateur est un **Nitro Booster** du serveur actuel.

## Syntaxe

```
$isBooster
```

## Valeur de retour

- **Type** : Chaîne `"true"` ou `"false"`
- `"true"` : l'utilisateur booste le serveur
- `"false"` : l'utilisateur ne booste pas le serveur

## Comportement

- `$isBooster` ne prend **aucun argument**.
- La détection se base sur les rôles de booster ou le statut de boost du membre.
- Un utilisateur peut booster plusieurs serveurs simultanément (selon son abonnement Nitro).

## Exemples

### Remerciement automatique

```bdfd
$if[$isBooster==true]
  $title[Merci pour le boost ! 🚀]
  $description[
  Grâce à vous, le serveur bénéficie de :
  - Plus d'emojis
  - Meilleure qualité audio
  - Bannière serveur
  - Et plus encore !
  ]
  $color[#F47FFF]
  $sendMessage[]
$endif
```

### Salon exclusif boosters

```bdfd
$if[$isBooster==true]
  $sendMessage[Bienvenue dans le salon exclusif boosters !]
$else
  $sendMessage[Ce salon est réservé aux boosters du serveur.]
  $stop
$endif
```

## Notes

- La couleur classique du boost Nitro est `#F47FFF` (rose/magenta).
- Les boosters ont souvent un badge spécial (visible avec `$userBadges`).
- Utile pour créer des avantages exclusifs aux boosters (salons, rôles, commandes).
