---
layout: doc
title: $getUserSelectUserID
translation_key: docs
category: "Entity Info"
function_name: getUserSelectUserID
syntax: $getUserSelectUserID[(index)]
description: Récupère l'ID de l'utilisateur sélectionné via un menu de sélection d'utilisateurs (user select).
parameters:
  - name: index
    description: (Optionnel) L'index de l'utilisateur sélectionné. Par défaut 1 (premier utilisateur).
returns:
  - type: string
    description: L'ID de l'utilisateur sélectionné, ou une chaîne vide si aucun utilisateur n'a été choisi.
related:
  - $getUserSelectUserIDs
  - $getRoleSelectRoleID
  - $getChannelSelectChannelID
  - $getMentionableSelectUserID
examples:
  - description: Récupérer le premier utilisateur
    code: $getUserSelectUserID
  - description: Récupérer le 3ème utilisateur
    code: $getUserSelectUserID[3]
---

# $getUserSelectUserID

La fonction `$getUserSelectUserID[]` permet de **récupérer l'ID de l'utilisateur** choisi via un menu de sélection d'utilisateurs (user select menu).

## Syntaxe

```
$getUserSelectUserID[(index)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `index` | Optionnel - L'index de l'utilisateur dans la sélection (1 = premier). Par défaut 1. |

## Valeur de retour

- **Type** : String (Snowflake ID)
- L'ID Discord de l'utilisateur sélectionné.
- Chaîne vide si aucun utilisateur n'a été sélectionné.

## Comportement

- Utilisé dans les interactions avec un menu de type `user` créé via `$addUserSelectMenu[]`.
- L'utilisateur sélectionné peut être n'importe quel membre du serveur.
- Pour les sélections multiples, utiliser `$getUserSelectUserIDs[]`.

## Exemples

### Vérification d'utilisateur

```bdfd
$nominalTrigger
$addUserSelectMenu[user_select;1;Sélectionnez un utilisateur]
$sendMessage[Choisissez un utilisateur à vérifier :]

$onInteraction[user_select]
$let[userID;$getUserSelectUserID]
$title[👤 Fiche utilisateur]
$description[
**Nom :** $userName[$userID]
**ID :** $userID
**A rejoint le :** $memberJoinDate[$userID]
**Rôles :** $userRoles[$userID]
]
$thumbnail[$userAvatar[$userID]]
$color[#5865F2]
$sendMessage[]
```

### Avertissement via sélection

```bdfd
$onInteraction[user_select]
$let[target;$getUserSelectUserID]
$sendDM[$target;⚠️ Vous avez reçu un avertissement sur **$serverName**.]
$title[✅ Avertissement envoyé]
$description[Un DM a été envoyé à **$userName[$target]**.]
$sendMessage[]
```

## Notes

- L'index commence à 1.
- Pour récupérer tous les utilisateurs d'une sélection multiple, utiliser `$getUserSelectUserIDs[]`.
- L'utilisateur doit être membre du serveur pour être sélectionnable.
