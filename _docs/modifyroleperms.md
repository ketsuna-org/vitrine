---
layout: doc
title: $modifyRolePerms
translation_key: docs
category: "Moderation"
function_name: modifyRolePerms
syntax: $modifyRolePerms[roleID;permissions]
description: Modifies thes permissions of a role existing.
---

# $modifyRolePerms

The function `$modifyRolePerms` **modifie les permissions** of a role existing on the server Discord. The bot doit avoir la permission `ManageRoles`.

## Syntax

```
$modifyRolePerms[roleID;permissions]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role to modifier. Required. |
| `permissions` | List permissions to the format `permission=value`, separatedes par `;`. Required. |

## Return Value

Aucune. The permissions of the role sont mises to day.

## Examples

### Désenable the envoi of messages

```bdfd
$modifyRolePerms[$roleID[Muet];sendmessages=no;sendmessagesinthreads=no]
$sendMessage[✅ The role Muet ne peut plus envoyer of messages.]
```

### Activer permissions of modération

```bdfd
$modifyRolePerms[$roleID[Modo];banmembers=yes;kickmembers=yes;managemessages=yes]
$sendMessage[✅ Permissions of modération enabledes for the role Modo.]
```

### Restrict un role

```bdfd
$modifyRolePerms[$roleID[Restreint];sendmessages=no;connect=no;speak=no]
$sendMessage[✅ Role Restreint configured.]
```

### Command of gestion permissions

```bdfd
$if[$isAdmin==true]
  $modifyRolePerms[$roleID[$message[1]];$message[2]]
  $sendMessage[Permissions mises to day.]
$else
  $sendMessage[Permission refusée.]
$endif
```

## Notes

- The bot doit avoir la permission `ManageRoles`.
- Format permissions : `permission=yes` or `permission=no`.
- Les permissions sont separatedes par `;`.
- Pour modifier les propertys of the role (nom, couleur), utilisez `$modifyRole`.
- Pour voir les permissions currentles of a role, utilisez `$rolePerms`.
- Les permissions non spécifiées restent inchangées.
