---
layout: doc
title: $getUserSelectUserID
translation_key: docs
category: "Entity Info"
function_name: getUserSelectUserID
syntax: $getUserSelectUserID[(index)]
description: Gets the ID of the user selected via un menu of sélection of users (user select).
---

# $getUserSelectUserID

The function `$getUserSelectUserID[]` allows **récupérer the ID of the user** choisi via un menu of sélection of users (user select menu).

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

- Utilisé in thes interactions with a menu of type `user` created via `$addUserSelectMenu[]`.
- The user selected can be n'importe quel member of the server.
- Pour les sélections multiple, use `$getUserSelectUserIDs[]`.

## Examples

### Vérification of user

```bdfd
$nominalTrigger
$addUserSelectMenu[user_select;1;Sélectionnez un user]
$sendMessage[Choisissez un user to check :]

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
$sendDM[$target;⚠️ Vous avez received un avertissement on **$serverName**.]
$title[✅ Avertissement sent]
$description[Un DM was sent to **$userName[$target]**.]
$sendMessage[]
```

## Notes

- L'index commence to 1.
- Pour récupérer all users of une sélection multiple, use `$getUserSelectUserIDs[]`.
- The user must be member of the server pour être sélectionnable.
