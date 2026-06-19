---
layout: doc
title: $threadRemoveMember
translation_key: docs
category: "Moderation"
function_name: threadRemoveMember
syntax: $threadRemoveMember[threadID;userID]
description: Retire un member of un fil of discussion (thread). The user ne pourra plus voir ni participer to the thread private.
---

# $threadRemoveMember

The function `$threadRemoveMember[]` allows **retirer un user of un thread**. The user ne pourra plus accéder to the thread private.

## Syntax

```
$threadRemoveMember[threadID;userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `threadID` | The ID of the thread cible. |
| `userID` | The ID of the user to retirer. |

## Return Value

This function ne retourne pas of value.

## Behavior

- Functionne mainment for the threads privates.
- Dans un thread public, les users ne can pas être retirés (ils can toudays le voir).
- The bot doit avoir `MANAGE_THREADS` or être le créateur of the thread private.

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
$channelSendMessage[$threadID;<$mentioned[1]> was retiré of the thread.]
```

## Notes

- Dans les threads publics, `$threadRemoveMember[]` peut ne pas avoir of effet visible.
- The user retiré ne receives pas of notification.
- Pour les threads privates, it is la méthode appropriée pour gérer l'accès.
