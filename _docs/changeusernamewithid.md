---
layout: doc
title: $changeUsernameWithID
translation_key: docs
category: "Moderation"
function_name: changeUsernameWithID
syntax: $changeUsernameWithID[userID;newName]
description: Change the name of user of a user specific (requires of permissions élevées).
---

# $changeUsernameWithID

The `$changeUsernameWithID` function **modifie the name of user global** of a user Discord specific. Cette function requires of permissions élevées (generally réservée to the bots with a token user or of permissions speciales).

## Syntax

```
$changeUsernameWithID[userID;newName]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user cible. Required. |
| `newName` | Le new nom of user. Required. |

## Return value

None. The name of user est modified globalment.

## Examples

### Changement pour a user mentionné

```bdfd
$changeUsernameWithID[$mentioned[1];Nom Corrigé]
$sendMessage[✅ Nom of <@$mentioned[1]> modified en "Nom Corrigé".]
```

### Command administrative

```bdfd
$if[$isAdmin==true]
  $changeUsernameWithID[$findUser[$message[1]];$message[2]]
  $sendMessage[Nom of user of $message[1] changé.]
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

- **Permissions speciales requiredes** — cette function peut not functionner with a token of bot standard.
- **Rate limit Discord** : 2 changements of nom par hour par compte.
- Pour changer the name of the bot lui-même, use `$changeUsername`.
- Pour changer le pseudo on the server only, préférez `$setNickname`.
- Le changement est global and visible on all servers Discord.
