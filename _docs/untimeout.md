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

The function `$unTimeout` **retire le timeout** of a user before son expiration, restaurant sa capacité to envoyer messages and parler en vocal. The bot doit avoir la permission `ModerateMembers`.

## Syntax

```
$unTimeout[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user to libérer of the timeout. Required. |

## Return Value

Aucune. The user est libéré of the timeout.

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

### Command of pardon

```bdfd
$unTimeout[$mentioned[1]]
$sendMessage[🙏 Pardon accordé. <@$mentioned[1]> peut of new participer.]
```

## Notes

- The bot doit avoir la permission `ModerateMembers`.
- Utilisez `$isTimedOut` pour check if a user est en timeout before of caller `$unTimeout`.
- N'a of effet que si the user est currentlement en timeout.
