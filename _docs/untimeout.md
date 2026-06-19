---
layout: doc
title: $unTimeout
translation_key: docs
category: "Moderation"
function_name: unTimeout
syntax: $unTimeout[userID]
description: Retire le timeout of a user before son expiration.
---

# $unTimeout

The function `$unTimeout` **retire le timeout** of a user before son expiration, restaurant sa capacité à envoyer des messages and parler en vocal. The bot doit avoir la permission `ModerateMembers`.

## Syntax

```
$unTimeout[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user à libérer du timeout. Required. |

## Return Value

Aucune. The user est libéré du timeout.

## Examples

### Retrait simple

```bdfd
$unTimeout[$mentioned[1]]
$sendMessage[✅ <@$mentioned[1]> n'est plus en timeout.]
```

### Retrait conditionnel

```bdfd
$if[$isTimedOut[$mentioned[1]]==true]
  $unTimeout[$mentioned[1]]
  $sendMessage[Timeout retiré.]
$else
  $sendMessage[Cet user is not en timeout.]
$endif
```

### Command de pardon

```bdfd
$unTimeout[$mentioned[1]]
$sendMessage[🙏 Pardon accordé. <@$mentioned[1]> peut de new participer.]
```

## Notes

- The bot doit avoir la permission `ModerateMembers`.
- Utilisez `$isTimedOut` pour vérifier if a user est en timeout before d'caller `$unTimeout`.
- N'a d'effet que si the user est currentlement en timeout.
