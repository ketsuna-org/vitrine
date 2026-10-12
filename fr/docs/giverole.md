---
layout: doc
title: "$giveRole — fonction BDScript"
category: "Modération"
function_name: giveRole
syntax: $giveRole[(userID);roleID]
description: "Attribue un rôle à un utilisateur sur le serveur."
locale: fr
lang: fr
content_language: fr
translation_key: doc-giverole
permalink: /fr/docs/giverole/
sidebar_context: docs_fr
category_key: "Moderation"
---

# $giveRole

La fonction `$giveRole` attribue un rôle à un utilisateur sur le serveur Discord. Le bot doit avoir la permission `ManageRoles`.

## Syntaxe

```
$giveRole[userID;roleID]
```

Ou avec un seul paramètre (ciblant les utilisateurs mentionnés dans le message) :

```
$giveRole[roleID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | Optionnel. L'ID de l'utilisateur cible. Avec un seul paramètre, le rôle est donné aux utilisateurs mentionnés dans le message (jamais à l'auteur). |
| `roleID` | L'ID du rôle à attribuer. Obligatoire, doit être un ID valide. |

## Valeur de retour

Aucune. Le rôle est attribué.

Une erreur est levée si l'ID du rôle ou de l'utilisateur est invalide, ou si la forme à un seul paramètre est utilisée et que le message ne mentionne personne.

## Exemples

### Attribution simple

```bdfd
$giveRole[$mentioned[1];$roleID[Confirmed]]
$sendMessage[<@$mentioned[1]> has received the Confirmed role!]
```

### Attribution à l'auteur

```bdfd
$giveRole[$authorID;$roleID[Member]]
$sendMessage[$userName, you now have the Member role.]
```

### Commande d'attribution avec vérification

```bdfd
$if[$roleExists[$roleID[$message[2]]]==true]
  $giveRole[$mentioned[1];$roleID[$message[2]]]
  $sendMessage[Role assigned successfully.]
$else
  $sendMessage[This role does not exist.]
$endif
```

### Attribution après vérification de la hiérarchie

```bdfd
$if[$rolePosition[$getRole[$authorID;1]]<$rolePosition[$roleID[Staff]]]
  $giveRole[$mentioned[1];$roleID[Staff]]
  $sendMessage[<@$mentioned[1]> is now Staff!]
$else
  $sendMessage[You do not have permission to promote members.]
$endif
```

## Remarques

- Le bot doit avoir la permission `ManageRoles`.
- Le bot doit avoir `Manage Roles` ; le rôle doit être situé sous le rôle le plus élevé du bot, et `@everyone` ainsi que les rôles gérés (bot, intégration, booster) ne peuvent être ni attribués ni retirés.
- Avec la forme à un seul paramètre, le rôle est donné à chaque utilisateur mentionné dans le message (les doublons une seule fois) ; tous les IDs sont validés avant qu'un rôle ne soit attribué.
- Pour attribuer plusieurs rôles à la fois, utilisez `$giveRoles`.
- Pour remplacer tous les rôles d'un utilisateur, utilisez `$setUserRoles`.
- Pour ajouter ou retirer plusieurs rôles en un seul appel, utilisez `$roleGrant`.
