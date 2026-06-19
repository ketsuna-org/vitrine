---
layout: doc
title: $userTag
translation_key: docs
category: "Entity Info"
function_name: userTag
syntax: $userTag
description: Returns the tag complete of the user sous la forme "nom#discriminator" (format legacy). Dethen la migration vers les noms unique, retourne the name d'user without discriminateur.
---

# $userTag

The variable `$userTag` retourne le **tag complete** of the user. Historiquement, Discord utilisait le format `nom#discriminator` (ex: "JeanDupont#1234"). Dethen la migration vers les noms d'user unique (système "pomme"), le tag est simplement the name d'user.

## Syntax

```
$userTag
```

## Return Value

- **Type** : String de becauseactères
- Old format : `nom#discriminator` (ex: `JeanDupont#1234`)
- New format (users pompom) : simplement the name d'user

## Behavior

- `$userTag` ne prend **no argument**.
- Pour les comptes createds before la migration pompom, le tag peut encore inclure le discriminateur à 4 chiffres.
- Pour les newx comptes, le retour est identical à `$userName`.

## Examples

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

### Vérifier si the user a un discriminateur legacy

```bdfd
$if[$discriminator!=0]
  $sendMessage[Vous avez un compte legacy : $userTag]
$else
  $sendMessage[Vous avez un compte pompom : $userTag]
$endif
```

## Notes

- Le format legacy `nom#discriminator` est progressivement abandonné par Discord.
- Pour les newx users, `$userTag` est équivaslow à `$userName`.
- Préférez `$userName` or `$displayName` for ae compatibilité future.
