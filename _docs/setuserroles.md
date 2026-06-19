---
layout: doc
title: $setUserRoles
translation_key: docs
category: "Moderation"
function_name: setUserRoles
syntax: $setUserRoles[userID;role1;role2;...]
description: Définit la liste exacte des rôles d'un utilisateur, remplaçant tous ses rôles actuels.
---

# $setUserRoles

La fonction `$setUserRoles` **remplace tous les rôles d'un utilisateur** par une nouvelle liste. Contrairement à `$giveRoles` qui ajoute des rôles, `$setUserRoles` retire d'abord tous les rôles existants avant d'attribuer ceux spécifiés. Le bot doit avoir la permission `ManageRoles`.

## Syntaxe

```
$setUserRoles[userID;role1;role2;...]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur cible. Obligatoire. |
| `role1;role2;...` | Liste des IDs de rôles à définir, séparés par `;`. |

## Valeur de retour

Aucune. Les rôles de l'utilisateur sont remplacés.

## Exemples

### Réinitialisation des rôles

```bdfd
$setUserRoles[$mentioned[1];$roleID[Membre]]
$sendMessage[<@$mentioned[1]> n'a plus que le rôle Membre.]
```

### Définition d'un set de rôles

```bdfd
$setUserRoles[$mentioned[1];$roleID[Membre];$roleID[VIP];$roleID[Actif]]
$sendMessage[Rôles de <@$mentioned[1]> mis à jour.]
```

### Promotion d'un membre

```bdfd
$if[$isAdmin==true]
  $setUserRoles[$mentioned[1];$roleID[Modérateur];$roleID[Staff]]
  $sendMessage[<@$mentioned[1]> est maintenant Modérateur !]
$else
  $sendMessage[Permission refusée.]
$endif
```

### Nettoyage complet

```bdfd
$setUserRoles[$mentioned[1]]
$sendMessage[Tous les rôles de <@$mentioned[1]> ont été retirés.]
```

## Notes

- Le bot doit avoir la permission `ManageRoles`.
- **Tous les rôles existants sont retirés** avant d'appliquer les nouveaux.
- Pour simplement ajouter des rôles, préférez `$giveRoles`.
- Pour retirer des rôles spécifiques, préférez `$takeRoles`.
- Laisser la liste de rôles vide retire tous les rôles (sauf le rôle @everyone).
- Le rôle @everyone ne peut pas être retiré.
