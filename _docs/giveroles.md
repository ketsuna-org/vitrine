---
layout: doc
title: $giveRoles
translation_key: docs
category: "Moderation"
function_name: giveRoles
syntax: $giveRoles[userID;role1;role2;...]
description: Donne plusieurs rôles à un utilisateur en une seule opération.
parameters:
  - name: userID
    description: L'ID de l'utilisateur cible. Obligatoire.
  - name: role1;role2;...
    description: Liste des IDs de rôles à attribuer, séparés par des point-virgules. Obligatoire.
returns:
  - type: void
    description: Attribue tous les rôles spécifiés. Ne retourne rien.
related:
  - $giveRole
  - $takeRoles
  - $setUserRoles
examples:
  - description: Donner plusieurs rôles
    code: |
      $giveRoles[$mentioned[1];$roleID[Membre];$roleID[Actif]]
      $sendMessage[Rôles attribués !]
---

# $giveRoles

La fonction `$giveRoles` **attribue plusieurs rôles en une fois** à un utilisateur. C'est la version multi-rôles de `$giveRole`. Le bot doit avoir la permission `ManageRoles`.

## Syntaxe

```
$giveRoles[userID;role1;role2;...]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur cible. Obligatoire. |
| `role1;role2;...` | Les IDs des rôles à attribuer, séparés par des `;`. Obligatoire. |

## Valeur de retour

Aucune. Tous les rôles spécifiés sont attribués.

## Exemples

### Attribution multiple simple

```bdfd
$giveRoles[$mentioned[1];$roleID[Membre];$roleID[Notifications]]
$sendMessage[<@$mentioned[1]> a reçu les rôles Membre et Notifications.]
```

### Attribution groupée avec condition

```bdfd
$if[$isAdmin==true]
  $giveRoles[$mentioned[1];$roleID[Modo];$roleID[Staff];$roleID[VIP]]
  $sendMessage[Tous les rôles de staff attribués à <@$mentioned[1]>.]
$else
  $sendMessage[Permission refusée.]
$endif
```

### Commande de bienvenue

```bdfd
$giveRoles[$authorID;$roleID[Membre];$roleID[Nouveau];$roleID[Auto]]
$sendMessage[Bienvenue $userName ! Rôles par défaut attribués.]
```

## Notes

- Le bot doit avoir la permission `ManageRoles`.
- Les rôles sont séparés par `;` dans la syntaxe.
- Pour attribuer un seul rôle, `$giveRole` est plus simple.
- Pour remplacer tous les rôles existants, utilisez `$setUserRoles`.
- Les rôles déjà possédés par l'utilisateur sont ignorés.
