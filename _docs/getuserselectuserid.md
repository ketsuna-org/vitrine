---
layout: doc
title: $getUserSelectUserID
translation_key: docs
category: "Entity Info"
function_name: getUserSelectUserID
syntax: $getUserSelectUserID[(index)]
description: Gets the ID of the user selected via un menu de sélection d'users (user select).
---

# $getUserSelectUserID

The function `$getUserSelectUserID[]` allows **récupérer the ID of the user** choisi via un menu de sélection d'users (user select menu).

## Syntax

```
$getUserSelectUserID[(index)]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Optional - L'index of the user in the sélection (1 = first). Par default 1. |

## Return Value

- **Type** : String (Snowflake ID)
- The ID Discord of the user selected.
- String vide si no user n'was selected.

## Behavior

- Utilisé in thes interactions with a menu de type `user` created via `$addUserSelectMenu[]`.
- The user selected can be n'importe quel member of the server.
- Pour les sélections multiple, utiliser `$getUserSelectUserIDs[]`.

## Examples

### Vérification d'user

```bdfd
$nominalTrigger
$addUserSelectMenu[user_select;1;Sélectionnez un user]
$sendMessage[Choisissez un user à vérifier :]

$onInteraction[user_select]
$let[userID;$getUserSelectUserID]
$title[👤 Fiche user]
$description[
**Nom :** $userName[$userID]
**ID :** $userID
**A rejoint le :** $memberJoinDate[$userID]
**Roles :** $userRoles[$userID]
]
$thumbnail[$userAvatar[$userID]]
$color[#5865F2]
$sendMessage[]
```

### Avertissement via sélection

```bdfd
$onInteraction[user_select]
$let[target;$getUserSelectUserID]
$sendDM[$target;⚠️ Vous avez received un avertissement sur **$serverName**.]
$title[✅ Avertissement sent]
$description[Un DM was sent à **$userName[$target]**.]
$sendMessage[]
```

## Notes

- L'index commence à 1.
- Pour récupérer all users d'une sélection multiple, utiliser `$getUserSelectUserIDs[]`.
- The user must be member of the server pour être sélectionnable.
