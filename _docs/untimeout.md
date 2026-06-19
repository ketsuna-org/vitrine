---
layout: doc
title: $unTimeout
translation_key: docs
category: "Moderation"
function_name: unTimeout
syntax: $unTimeout[userID]
description: Retire le timeout d'un utilisateur avant son expiration.
parameters:
  - name: userID
    description: L'ID de l'utilisateur à libérer du timeout. Obligatoire.
returns:
  - type: void
    description: Retire le timeout. Ne retourne rien.
related:
  - $timeout
  - $unmute
  - $isTimedOut
examples:
  - description: Retirer un timeout
    code: |
      $unTimeout[$mentioned[1]]
      $sendMessage[Timeout de <@$mentioned[1]> retiré.]
---

# $unTimeout

La fonction `$unTimeout` **retire le timeout** d'un utilisateur avant son expiration, restaurant sa capacité à envoyer des messages et parler en vocal. Le bot doit avoir la permission `ModerateMembers`.

## Syntaxe

```
$unTimeout[userID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur à libérer du timeout. Obligatoire. |

## Valeur de retour

Aucune. L'utilisateur est libéré du timeout.

## Exemples

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
  $sendMessage[Cet utilisateur n'est pas en timeout.]
$endif
```

### Commande de pardon

```bdfd
$unTimeout[$mentioned[1]]
$sendMessage[🙏 Pardon accordé. <@$mentioned[1]> peut de nouveau participer.]
```

## Notes

- Le bot doit avoir la permission `ModerateMembers`.
- Utilisez `$isTimedOut` pour vérifier si un utilisateur est en timeout avant d'appeler `$unTimeout`.
- N'a d'effet que si l'utilisateur est actuellement en timeout.
