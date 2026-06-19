---
layout: doc
title: $deleteRole
translation_key: docs
category: "Moderation"
function_name: deleteRole
syntax: $deleteRole[roleID]
description: Supprime a role of the Discord server.
---

# $deleteRole

The `$deleteRole` function **supprime permanently a role** of the Discord server. Cette action est irréversible. The bot must have the permission `ManageRoles`.

## Syntax

```
$deleteRole[roleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role to delete. Required. |

## Return value

None. The role is deleted of the server.

## Examples

### Suppression simple

```bdfd
$deleteRole[$roleID[Old Staff]]
$sendMessage[🗑️ Role "Old Staff" deleted.]
```

### Suppression with vérification of existence

```bdfd
$if[$roleExists[$roleID[VIP]]==true]
  $deleteRole[$roleID[VIP]]
  $sendMessage[Role VIP deleted.]
$else
  $sendMessage[The role VIP does not exist.]
$endif
```

### Command of suppression sécurisée

```bdfd
$if[$isAdmin==true]
  $if[$roleExists[$roleID[$message[1]]]==true]
    $deleteRole[$roleID[$message[1]]]
    $sendMessage[✅ Role deleted with success.]
  $else
    $sendMessage[Role introuvable.]
  $endif
$else
  $sendMessage[Permission refusée. Admin required.]
$endif
```

## Notes

- The bot must have the permission `ManageRoles`.
- **Action irréversible** : the role est permanently deleted.
- The bot cannot supprimer a role supérieur its own.
- Use `$roleExists` to check the existence before suppression.
- To modify a role without le supprimer, use `$modifyRole`.
