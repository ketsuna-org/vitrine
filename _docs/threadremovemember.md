---
layout: doc
title: $threadRemoveMember
translation_key: docs
category: "Moderation"
function_name: threadRemoveMember
syntax: $threadRemoveMember[threadID;userID]
description: Retire un member d'un fil de discussion (thread). The user ne pourra plus voir ni participer au thread private.
---

# $threadRemoveMember

The function `$threadRemoveMember[]` allows **retirer un user d'un thread**. The user ne pourra plus accéder au thread private.

## Syntax

```
$threadRemoveMember[threadID;userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `threadID` | The ID of the thread cible. |
| `userID` | The ID of the user à retirer. |

## Return Value

This function ne retourne pas de value.

## Behavior

- Functionne mainment for the threads privates.
- Dans un thread public, les users ne peuvent pas être retirés (ils peuvent toudays le voir).
- The bot doit avoir `MANAGE_THREADS` or être le créateur du thread private.

## Examples

### Fermer un ticket

```bdfd
$threadRemoveMember[$threadID;$authorID]
$editThread[$threadID;[Fermé] Ticket;true;true]
$sendMessage[Ticket fermé and user retiré.]
```

### Retrait after resolvedtion

```bdfd
$threadRemoveMember[$threadID;$mentioned[1]]
$channelSendMessage[$threadID;<$mentioned[1]> was retiré du thread.]
```

## Notes

- Dans les threads publics, `$threadRemoveMember[]` peut ne pas avoir d'effet visible.
- The user retiré ne receives pas de notification.
- Pour les threads privates, it is la méthode appropriée pour gérer l'accès.
