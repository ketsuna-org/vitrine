---
layout: doc
title: $isBot
translation_key: docs
category: "Entity Info"
function_name: isBot
syntax: $isBot
description: Retourne "true" si l'utilisateur qui a déclenché la commande est un bot, "false" sinon.
parameters: []
returns:
  - type: boolean (string)
    description: '"true" si l''utilisateur est un bot, "false" sinon.'
related:
  - $userID
  - $isAdmin
  - $isBooster
  - $userInfo
examples:
  - description: Vérifier si l'utilisateur est un bot
    code: $isBot
  - description: Condition bot ou humain
    code: |
      $if[$isBot==true]
        $sendMessage[Tu es un bot ! 🤖]
      $else
        $sendMessage[Tu es un humain ! 👤]
      $endif
---

# $isBot

La variable `$isBot` permet de savoir si l'utilisateur qui a déclenché la commande est un **compte bot** ou un compte utilisateur normal.

## Syntaxe

```
$isBot
```

## Valeur de retour

- **Type** : Chaîne `"true"` ou `"false"`
- `"true"` : le compte est un bot
- `"false"` : le compte est un utilisateur normal

## Comportement

- `$isBot` ne prend **aucun argument**.
- La détection se base sur la propriété `bot` de l'objet utilisateur Discord.
- Les webhooks retournent `"true"` dans certains contextes.

## Exemples

### Détection simple

```bdfd
$if[$isBot==true]
  $sendMessage[🤖 Détection : vous êtes un bot !]
$else
  $sendMessage[👤 Vous êtes un utilisateur humain.]
$endif
```

### Ignorer les bots

```bdfd
$if[$isBot==true]
  $stop
$endif
$sendMessage[Bienvenue $userName !] 
```

### Log conditionnel

```bdfd
$if[$isBot==true]
  $log[Commande exécutée par le bot $userName (ID: $userID)]
$else
  $log[Commande exécutée par l'utilisateur $userName (ID: $userID)]
$endif
```

## Notes

- Très utile pour empêcher les bots d'exécuter certaines commandes (anti-boucle).
- Typiquement utilisé avec `$stop` pour ignorer silencieusement les déclenchements par d'autres bots.
- `$isBot` est insensible à la casse dans les comparaisons (`==true` / `==True` / `==TRUE`).
