---
layout: doc
title: $threadRemoveMember
translation_key: docs
category: "Moderation"
function_name: threadRemoveMember
syntax: $threadRemoveMember[threadID;userID]
description: Retire un membre d'un fil de discussion (thread). L'utilisateur ne pourra plus voir ni participer au thread privé.
---

# $threadRemoveMember

La fonction `$threadRemoveMember[]` permet de **retirer un utilisateur d'un thread**. L'utilisateur ne pourra plus accéder au thread privé.

## Syntaxe

```
$threadRemoveMember[threadID;userID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `threadID` | L'ID du thread cible. |
| `userID` | L'ID de l'utilisateur à retirer. |

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Fonctionne principalement pour les threads privés.
- Dans un thread public, les utilisateurs ne peuvent pas être retirés (ils peuvent toujours le voir).
- Le bot doit avoir `MANAGE_THREADS` ou être le créateur du thread privé.

## Exemples

### Fermer un ticket

```bdfd
$threadRemoveMember[$threadID;$authorID]
$editThread[$threadID;[Fermé] Ticket;true;true]
$sendMessage[Ticket fermé et utilisateur retiré.]
```

### Retrait après résolution

```bdfd
$threadRemoveMember[$threadID;$mentioned[1]]
$channelSendMessage[$threadID;<$mentioned[1]> a été retiré du thread.]
```

## Notes

- Dans les threads publics, `$threadRemoveMember[]` peut ne pas avoir d'effet visible.
- L'utilisateur retiré ne reçoit pas de notification.
- Pour les threads privés, c'est la méthode appropriée pour gérer l'accès.
