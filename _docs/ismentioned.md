---
layout: doc
title: $isMentioned
translation_key: docs
category: "Entity Info"
function_name: isMentioned
syntax: $isMentioned
description: Returns "true" si the user qui triggered the command was mentionné in the message, "false" otherwise.
---

# $isMentioned

The variable `$isMentioned` retourne `"true"` si the user qui triggered the command was **mentionné** in the message (via `@mention`).

## Syntax

```
$isMentioned
```

## Return Value

- **Type** : String `"true"` or `"false"`
- `"true"` : the user déclencheur est mentionné in the message
- `"false"` : the user déclencheur is not mentionné

## Behavior

- `$isMentioned` ne prend **no argument**.
- Checks if l'**user déclencheur** fait partie mentions of the message.
- Détecte les mentions directes (`@user`), pas les `@everyone`/`@here`.

## Examples

### Réagir to une mention

```bdfd
$if[$isMentioned==true]
  $sendMessage[Hé <@$userID>, vous avez été mentionné !]
$endif
```

### Command with mention required

```bdfd
$if[$isMentioned==true]
  $sendMessage[Que then-je faire pour vous, $userName ?]
$else
  $sendMessage[Mentionnez-moi pour attirer mon attention !]
$endif
```

## Notes

- `$isMentioned` vérifie si the user **déclencheur** est mentionné, pas si the bot est mentionné.
- Pour savoir qui was mentionné, utilisez `$mentioned` (first mention) or `$mentions` (all mentions).
- Ne détecte pas les mentions `@everyone` or `@here`.
