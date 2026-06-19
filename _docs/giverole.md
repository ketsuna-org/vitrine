---
layout: doc
title: $giveRole
translation_key: docs
category: "Moderation"
function_name: giveRole
syntax: $giveRole[userID;roleID]
description: Donne un rôle à un utilisateur sur le serveur.
---

# $giveRole

La fonction `$giveRole` **attribue un rôle** à un utilisateur sur le serveur Discord. Le bot doit avoir la permission `ManageRoles`.

## Syntaxe

```
$giveRole[userID;roleID]
```

Ou avec un seul paramètre (l'utilisateur mentionné est visé) :

```
$giveRole[roleID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur cible. Si omis, vise l'utilisateur mentionné. |
| `roleID` | L'ID du rôle à attribuer. Obligatoire. |

## Valeur de retour

Aucune. Le rôle est attribué.

## Exemples

### Attribution simple

```bdfd
$giveRole[$mentioned[1];$roleID[Confirmé]]
$sendMessage[<@$mentioned[1]> a reçu le rôle Confirmé !]
```

### Auto-attribution pour l'auteur

```bdfd
$giveRole[$roleID[Membre]]
$sendMessage[$userName, vous avez maintenant le rôle Membre.]
```

### Commande d'attribution avec vérification

```bdfd
$if[$roleExists[$roleID[$message[2]]]==true]
  $giveRole[$mentioned[1];$roleID[$message[2]]]
  $sendMessage[Rôle attribué avec succès.]
$else
  $sendMessage[Ce rôle n'existe pas.]
$endif
```

### Attribution après vérification de hiérarchie

```bdfd
$if[$rolePosition[$getRole[$authorID;1]]>$rolePosition[$roleID[Staff]]]
  $giveRole[$mentioned[1];$roleID[Staff]]
  $sendMessage[<@$mentioned[1]> est maintenant Staff !]
$else
  $sendMessage[Vous n'avez pas la permission de promouvoir des membres.]
$endif
```

## Notes

- Le bot doit avoir la permission `ManageRoles`.
- Le bot ne peut pas attribuer un rôle supérieur à son propre rôle le plus haut.
- Pour attribuer plusieurs rôles à la fois, utilisez `$giveRoles`.
- Pour remplacer tous les rôles d'un utilisateur, utilisez `$setUserRoles`.
- Équivalent fonctionnel à `$roleGrant`.
