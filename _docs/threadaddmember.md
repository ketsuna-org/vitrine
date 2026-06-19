---
layout: doc
title: $threadAddMember
translation_key: docs
category: "Moderation"
function_name: threadAddMember
syntax: $threadAddMember[threadID;userID]
description: Adds a member à un fil de discussion (thread). Utile for the threads privates où les members must be ajoutés manually.
---

# $threadAddMember

The function `$threadAddMember[]` allows to **ajouter un user à un thread**. Particulièrement utile for the threads privates.

## Syntax

```
$threadAddMember[threadID;userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `threadID` | The ID of the thread cible. |
| `userID` | The ID of the user à ajouter. |

## Return Value

This function ne retourne pas de value.

## Behavior

- Pour les threads publics, les users peuvent rejoindre librement ; this function est rarement nécessaire.
- Pour les threads privates, seuls les members ajoutés peuvent voir and participer au thread.
- The bot doit avoir la permission `MANAGE_THREADS` or être le créateur du thread private.

## Examples

### Ajouter le créateur

```bdfd
$let[thread;$startThread[Support - $username;1440]]
$threadAddMember[$thread;$authorID]
$channelSendMessage[$thread;Votre thread de support est prêt, $username !]
```

### Ajouter des modérateurs

```bdfd
$threadAddMember[$threadID;$mentioned[1]]
$sendMessage[<$mentioned[1]> was ajouté au thread.]
```

### Ajout automatique d'équipe

```bdfd
$let[thread;$startThread[Ticket #$random[1000;9999];1440]]
$threadAddMember[$thread;$authorID]
$threadAddMember[$thread;MODERATOR_ROLE_ID_1]
$threadAddMember[$thread;MODERATOR_ROLE_ID_2]
$channelSendMessage[$thread;Bienvenue ! A member de l'équipe vous assistera.]
```

## Notes

- Dans les threads publics, les members peuvent rejoindre without invite.
- `$threadAddMember[]` n'sends pas de notification à the user ajouté.
- Pour retirer un member, utilisez `$threadRemoveMember[]`.
