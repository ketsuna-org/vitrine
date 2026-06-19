---
layout: doc
title: $isTimedOut
translation_key: docs
category: "Entity Info"
function_name: isTimedOut
syntax: $isTimedOut
description: Returns "true" si the user est currentlement en timeout (silencé temporaryment) on the server, "false" otherwise.
---

# $isTimedOut

The variable `$isTimedOut` retourne `"true"` si the user est currentlement en **timeout** (silence temporary) on the server.

## Syntax

```
$isTimedOut
```

## Return Value

- **Type** : String `"true"` or `"false"`
- `"true"` : the user est en timeout
- `"false"` : the user is not en timeout

## Behavior

- `$isTimedOut` ne prend **no argument**.
- Le timeout est une functionnalité Discord qui empêche temporaryment un member de parler/envoyer des messages.
- The duration du timeout est définie par les modérateurs (until 28 days).

## Examples

### Bloquer les commands pour users en timeout

```bdfd
$if[$isTimedOut==true]
  $sendMessage[⏳ Vous êtes currentlement en timeout. Veuillez patienter.]
  $stop
$endif
$sendMessage[Command executed avec success !]
```

### Vérification de modération

```bdfd
$title[Vérification timeout]
$description[
**User :** $userName
**En timeout :** $isTimedOut
]
$color[#ED4245]
$sendMessage[]
```

## Notes

- Le timeout est une sanction **temporary** (maximum 28 days).
- Un user en timeout ne peut pas envoyer de messages, rejoindre de channels vocaux, ni réagir.
- Utile pour empêcher les users sanctionnés d'utiliser les commands of the bot.
