---
layout: doc
title: $isBot
translation_key: docs
category: "Entity Info"
function_name: isBot
syntax: $isBot
description: Returns "true" si the user qui a déclenché the command est un bot, "false" otherwise.
---

# $isBot

The variable `$isBot` allows savoir si the user qui a déclenché the command est un **compte bot** or un compte user normal.

## Syntax

```
$isBot
```

## Return Value

- **Type** : String `"true"` or `"false"`
- `"true"` : le compte est un bot
- `"false"` : le compte est un user normal

## Behavior

- `$isBot` ne prend **no argument**.
- La détection se base sur la property `bot` de l'object user Discord.
- Les webhooks retournent `"true"` dans certains contexts.

## Examples

### Détection simple

```bdfd
$if[$isBot==true]
  $sendMessage[🤖 Détection : vous êtes un bot !]
$else
  $sendMessage[👤 Vous êtes un user humain.]
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
  $log[Command executed par the bot $userName (ID: $userID)]
$else
  $log[Command executed par the user $userName (ID: $userID)]
$endif
```

## Notes

- Très utile pour empêcher les bots d'exécuter certaines commands (anti-boucle).
- Typiquement utilisé avec `$stop` pour ignorer silencieusement les déclenchements par d'autres bots.
- `$isBot` est insensible à la casse in thes compareasons (`==true` / `==True` / `==TRUE`).
