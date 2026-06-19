---
layout: doc
title: $modifyRole
translation_key: docs
category: "Moderation"
function_name: modifyRole
syntax: $modifyRole[roleID;name;(color);(hoist);(mentionable)]
description: Modifie les propriétés d'un rôle existant.
---

# $modifyRole

La fonction `$modifyRole` **modifie les propriétés d'un rôle existant** (nom, couleur, affichage, mentionnabilité). Le bot doit avoir la permission `ManageRoles`.

## Syntaxe

```
$modifyRole[roleID;name;(color);(hoist);(mentionable)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `roleID` | L'ID du rôle à modifier. Obligatoire. |
| `name` | Le nouveau nom du rôle. Obligatoire. |
| `color` | Optionnel. Nouvelle couleur hexadécimale. |
| `hoist` | Optionnel. `"yes"` ou `"no"` pour l'affichage séparé. |
| `mentionable` | Optionnel. `"yes"` ou `"no"` pour la mentionnabilité. |

## Valeur de retour

Aucune. Les propriétés du rôle sont mises à jour.

## Exemples

### Renommer un rôle

```bdfd
$modifyRole[$roleID[VIP];Super VIP]
$sendMessage[✅ Rôle renommé en "Super VIP".]
```

### Changer la couleur

```bdfd
$modifyRole[$roleID[Staff];Staff;#FFD700]
$sendMessage[✅ Couleur du rôle Staff changée en or.]
```

### Modification complète

```bdfd
$modifyRole[$roleID[Modérateur];Modérateur;#E74C3C;yes;yes]
$sendMessage[✅ Rôle Modérateur entièrement mis à jour.]
```

### Commande de modification

```bdfd
$if[$isAdmin==true]
  $modifyRole[$roleID[$message[1]];$message[2];$message[3]]
  $sendMessage[Rôle modifié.]
$else
  $sendMessage[Permission refusée.]
$endif
```

## Notes

- Le bot doit avoir la permission `ManageRoles`.
- Le paramètre `name` est obligatoire même si vous ne changez pas le nom.
- Pour modifier uniquement les permissions, utilisez `$modifyRolePerms`.
- Pour créer un nouveau rôle, utilisez `$createRole`.
- Pour supprimer un rôle, utilisez `$deleteRole`.
