---
layout: doc
title: $userServerAvatar
translation_key: docs
category: "Entity Info"
function_name: userServerAvatar
syntax: $userServerAvatar
description: Retourne l'URL de l'avatar spécifique au serveur de l'utilisateur (avatar par serveur pour les abonnés Nitro).
parameters: []
returns:
  - type: string (URL)
    description: L'URL de l'avatar serveur, ou l'avatar global si aucun avatar serveur n'est défini.
related:
  - $userAvatar
  - $userBanner
  - $nickname
examples:
  - description: Obtenir l'avatar serveur
    code: $userServerAvatar
  - description: Afficher l'avatar serveur
    code: |
      $title[Avatar serveur de $userName]
      $image[$userServerAvatar]
      $color[#5865F2]
      $sendMessage[]
---

# $userServerAvatar

La variable `$userServerAvatar` retourne l'**URL de l'avatar spécifique au serveur** de l'utilisateur. Les abonnés Discord Nitro peuvent définir un avatar différent pour chaque serveur.

## Syntaxe

```
$userServerAvatar
```

## Valeur de retour

- **Type** : Chaîne de caractères (URL)
- L'URL de l'avatar spécifique au serveur, ou l'avatar global si l'utilisateur n'a pas défini d'avatar par serveur

## Comportement

- `$userServerAvatar` ne prend **aucun argument**.
- Si l'utilisateur a défini un avatar spécifique pour ce serveur (fonctionnalité Nitro), cette URL est retournée.
- Sinon, retourne l'avatar global (identique à `$userAvatar`).

## Exemples

### Comparer avatar global et serveur

```bdfd
$title[Avatars de $userName]
$description[
**Avatar global :**
**Avatar serveur :**
]
$thumbnail[$userAvatar]
$image[$userServerAvatar]
$color[#5865F2]
$sendMessage[]
```

### Détecter un avatar serveur personnalisé

```bdfd
$if[$userServerAvatar!=$userAvatar]
  $sendMessage[Vous avez un avatar personnalisé pour ce serveur !]
$else
  $sendMessage[Vous utilisez votre avatar global.]
$endif
```

## Notes

- La personnalisation d'avatar par serveur est une fonctionnalité **Discord Nitro**.
- Si l'utilisateur n'a pas Nitro ou n'a pas défini d'avatar serveur, `$userServerAvatar` est identique à `$userAvatar`.
- Utile pour les logs et les commandes de modération où l'apparence par serveur est pertinente.
