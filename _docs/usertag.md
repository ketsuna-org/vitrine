---
layout: doc
title: $userTag
translation_key: docs
category: "Entity Info"
function_name: userTag
syntax: $userTag
description: Retourne le tag complet de l'utilisateur sous la forme "nom#discriminator" (format legacy). Depuis la migration vers les noms uniques, retourne le nom d'utilisateur sans discriminateur.
parameters: []
returns:
  - type: string
    description: Le tag de l'utilisateur au format "nom#0000" ou simplement le nom d'utilisateur.
related:
  - $userName
  - $discriminator
  - $displayName
examples:
  - description: Obtenir le tag utilisateur
    code: $userTag
  - description: Afficher le tag dans un embed
    code: |
      $title[Profil]
      $description[Tag : **$userTag**]
      $color[#5865F2]
      $sendMessage[]
---

# $userTag

La variable `$userTag` retourne le **tag complet** de l'utilisateur. Historiquement, Discord utilisait le format `nom#discriminator` (ex: "JeanDupont#1234"). Depuis la migration vers les noms d'utilisateur uniques (système "pomme"), le tag est simplement le nom d'utilisateur.

## Syntaxe

```
$userTag
```

## Valeur de retour

- **Type** : Chaîne de caractères
- Ancien format : `nom#discriminator` (ex: `JeanDupont#1234`)
- Nouveau format (utilisateurs pompom) : simplement le nom d'utilisateur

## Comportement

- `$userTag` ne prend **aucun argument**.
- Pour les comptes créés avant la migration pompom, le tag peut encore inclure le discriminateur à 4 chiffres.
- Pour les nouveaux comptes, le retour est identique à `$userName`.

## Exemples

### Afficher le tag

```bdfd
$title[Profil de $userTag]
$description[
**Nom :** $userName
**Tag :** $userTag
**ID :** $userID
]
$color[#5865F2]
$sendMessage[]
```

### Vérifier si l'utilisateur a un discriminateur legacy

```bdfd
$if[$discriminator!=0]
  $sendMessage[Vous avez un compte legacy : $userTag]
$else
  $sendMessage[Vous avez un compte pompom : $userTag]
$endif
```

## Notes

- Le format legacy `nom#discriminator` est progressivement abandonné par Discord.
- Pour les nouveaux utilisateurs, `$userTag` est équivalent à `$userName`.
- Préférez `$userName` ou `$displayName` pour une compatibilité future.
