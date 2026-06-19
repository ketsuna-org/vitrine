---
layout: doc
title: $changeUsernameWithID
translation_key: docs
category: "Moderation"
function_name: changeUsernameWithID
syntax: $changeUsernameWithID[userID;newName]
description: Change the name d'user of a user spécifique (requires of permissions élevées).
---

# $changeUsernameWithID

The `$changeUsernameWithID` function **modifie the name d'user global** of a user Discord spécifique. Cette function requires of permissions élevées (generally réservée aux bots with a token user or of permissions speciales).

## Syntax

```
$changeUsernameWithID[userID;newName]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user cible. Required. |
| `newName` | Le new nom d'user. Required. |

## Return value

None. The name d'user est modified globalment.

## Examples

### Changement pour a user mentionné

```bdfd
$changeUsernameWithID[$mentioned[1];Nom Corrigé]
$sendMessage[✅ Nom de <@$mentioned[1]> modified en "Nom Corrigé".]
```

### Command administrative

```bdfd
$if[$isAdmin==true]
  $changeUsernameWithID[$findUser[$message[1]];$message[2]]
  $sendMessage[Nom d'user de $message[1] changé.]
$else
  $sendMessage[Permission refusée.]
$endif
```

### Changement for the auteur

```bdfd
$changeUsernameWithID[$authorID;$message[1]]
$sendMessage[$userName, votre nom has been changé.]
```

## Notes

- **Permissions speciales requiredes** — cette function peut not functionner with a token de bot standard.
- **Rate limit Discord** : 2 changements de nom par hour par compte.
- Pour changer the name of the bot lui-même, use `$changeUsername`.
- Pour changer le pseudo on the server only, préférez `$setNickname`.
- Le changement est global and visible sur all servers Discord.
