---
layout: doc
title: $takeRoles
translation_key: docs
category: "Moderation"
function_name: takeRoles
syntax: $takeRoles[userID;role1;role2;...]
description: Retire plusieurs rôles à un utilisateur en une seule opération.
parameters:
  - name: userID
    description: L'ID de l'utilisateur cible. Obligatoire.
  - name: role1;role2;...
    description: Liste des IDs de rôles à retirer, séparés par des point-virgules. Obligatoire.
returns:
  - type: void
    description: Retire tous les rôles spécifiés. Ne retourne rien.
related:
  - $takeRole
  - $giveRoles
  - $setUserRoles
examples:
  - description: Retirer plusieurs rôles
    code: |
      $takeRoles[$mentioned[1];$roleID[Muet];$roleID[Averti]]
      $sendMessage[Rôles retirés !]
---

# $takeRoles

La fonction `$takeRoles` **retire plusieurs rôles en une fois** à un utilisateur sur le serveur Discord. Le bot doit avoir la permission `ManageRoles`.

## Syntaxe

```
$takeRoles[userID;role1;role2;...]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur cible. Obligatoire. |
| `role1;role2;...` | Les IDs des rôles à retirer, séparés par des `;`. Obligatoire. |

## Valeur de retour

Aucune. Tous les rôles spécifiés sont retirés.

## Exemples

### Retrait multiple simple

```bdfd
$takeRoles[$mentioned[1];$roleID[Muet];$roleID[Averti];$roleID[Surveillance]]
$sendMessage[Toutes les sanctions de <@$mentioned[1]> ont été levées.]
```

### Nettoyage de rôles

```bdfd
$if[$isAdmin==true]
  $takeRoles[$mentioned[1];$roleID[VIP];$roleID[Staff];$roleID[Modo]]
  $sendMessage[Tous les rôles spéciaux retirés de <@$mentioned[1]>.]
$endif
```

### Retrait conditionnel

```bdfd
$takeRoles[$authorID;$roleID[Ancien];$roleID[Inactif]]
$giveRole[$authorID;$roleID[Actif]]
$sendMessage[Rôles mis à jour !]
```

## Notes

- Le bot doit avoir la permission `ManageRoles`.
- Les rôles sont séparés par `;`.
- Pour retirer un seul rôle, `$takeRole` est plus simple.
- Les rôles non possédés par l'utilisateur sont ignorés silencieusement.
- Pour redéfinir complètement les rôles, utilisez `$setUserRoles`.
