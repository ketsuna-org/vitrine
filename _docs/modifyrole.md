---
layout: doc
title: $modifyRole
translation_key: docs
category: "Moderation"
function_name: modifyRole
syntax: $modifyRole[roleID;name;(color);(hoist);(mentionable)]
description: Modifies thes propertys of a role existing.
---

# $modifyRole

The function `$modifyRole` **modifie les propertys of a role existing** (nom, couleur, affichage, mentionnabilité). The bot doit avoir la permission `ManageRoles`.

## Syntax

```
$modifyRole[roleID;name;(color);(hoist);(mentionable)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role à modifier. Required. |
| `name` | Le new nom of the role. Required. |
| `color` | Optional. New couleur hexadecimale. |
| `hoist` | Optional. `"yes"` or `"no"` for the affichage separated. |
| `mentionable` | Optional. `"yes"` or `"no"` for the mentionnabilité. |

## Return Value

Aucune. The propertys of the role sont mises à day.

## Examples

### Renommer un role

```bdfd
$modifyRole[$roleID[VIP];Super VIP]
$sendMessage[✅ Role renommé en "Super VIP".]
```

### Changer the color

```bdfd
$modifyRole[$roleID[Staff];Staff;#FFD700]
$sendMessage[✅ Couleur of the role Staff changée en or.]
```

### Modification complete

```bdfd
$modifyRole[$roleID[Modérateur];Modérateur;#E74C3C;yes;yes]
$sendMessage[✅ Role Modérateur entièrement mis à day.]
```

### Command de modification

```bdfd
$if[$isAdmin==true]
  $modifyRole[$roleID[$message[1]];$message[2];$message[3]]
  $sendMessage[Role modified.]
$else
  $sendMessage[Permission refusée.]
$endif
```

## Notes

- The bot doit avoir la permission `ManageRoles`.
- The parameter `name` est required even if vous ne changez pas the name.
- Pour modifier only les permissions, utilisez `$modifyRolePerms`.
- Pour créer un new role, utilisez `$createRole`.
- Pour supprimer un role, utilisez `$deleteRole`.
