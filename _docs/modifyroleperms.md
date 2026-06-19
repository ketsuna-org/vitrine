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
| `roleID` | The ID of the role à modifier. Required. |
| `permissions` | List des permissions au format `permission=value`, separatedes par `;`. Required. |

## Return Value

Aucune. The permissions of the role sont mises à day.

## Examples

### Désactiver l'envoi de messages

```bdfd
$modifyRolePerms[$roleID[Muet];sendmessages=no;sendmessagesinthreads=no]
$sendMessage[✅ The role Muet ne peut plus envoyer de messages.]
```

### Activer des permissions de modération

```bdfd
$modifyRolePerms[$roleID[Modo];banmembers=yes;kickmembers=yes;managemessages=yes]
$sendMessage[✅ Permissions de modération enabledes for the role Modo.]
```

### Restreindre un role

```bdfd
$modifyRolePerms[$roleID[Restreint];sendmessages=no;connect=no;speak=no]
$sendMessage[✅ Role Restreint configured.]
```

### Command de gestion des permissions

```bdfd
$if[$isAdmin==true]
  $modifyRolePerms[$roleID[$message[1]];$message[2]]
  $sendMessage[Permissions mises à day.]
$else
  $sendMessage[Permission refusée.]
$endif
```

## Notes

- The bot doit avoir la permission `ManageRoles`.
- Format des permissions : `permission=yes` or `permission=no`.
- Les permissions sont separatedes par des `;`.
- Pour modifier les propertys of the role (nom, couleur), utilisez `$modifyRole`.
- Pour voir les permissions currentles of a role, utilisez `$rolePerms`.
- Les permissions non spécifiées restent inchangées.
