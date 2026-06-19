---
layout: doc
title: $isBanned
translation_key: docs
category: "Math & Text"
function_name: isBanned
syntax: $isBanned[userID]
description: Checks if un user est banni of the server courant.
---

# $isBanned

The function `$isBanned[userID]` **vérifie if a user est currentlement banni** of the server où the command est executed. The bot doit avoir la permission `BanMembers`.

## Syntax

```
$isBanned[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user to vérifier. |

## Return Value

- **Type** : Boolean
- `true` si the user est banni of the server.
- `false` si the user is not banni or n'existe pas.

## Behavior

- The bot needs la permission `BanMembers` pour consulter la list bannis.
- Functionne even if the user a quitté the server.
- Checks only the server courant.

## Examples

### Vérification before command

```bdfd
$if[$isBanned[$mentioned[1]]==true]
  $sendMessage[⚠️ <@$mentioned[1]> est déjà banni of ce server.]
$else
  $ban[$mentioned[1];Reason fournie par $userName]
  $sendMessage[🔨 <@$mentioned[1]> was banni.]
$endif
```

### Débannir un user

```bdfd
$if[$isBanned[$message[1]]==true]
  $unban[$message[1]]
  $sendMessage[✅ The user $message[1] was débanni.]
$else
  $sendMessage[❌ Cet ID is not banni.]
$endif
```

### Log of vérification

```bdfd
$var[userID;$message[1]]
$if[$isBanned[$var[userID]]==true]
  $var[reason;$getBanReason[$var[userID]]]
  $sendMessage[📋 **Ban found :**
  > ID : $var[userID]
  > Reason : $var[reason]]
$else
  $sendMessage[✅ Aucun ban pour $var[userID].]
$endif
```

## Notes

- The bot doit avoir `BanMembers` pour que this function retourne un result fiable.
- Pour obtenir la ban reason, utilisez `$getBanReason[]`.
- Pour bannir/débannir, utilisez `$ban[]` / `$unban[]`.
- Functionne only in a context of server (pas en DM).
