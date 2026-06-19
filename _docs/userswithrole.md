---
layout: doc
title: $usersWithRole
translation_key: docs
category: "Entity Info"
function_name: usersWithRole
syntax: $usersWithRole[roleID;(separator);(guildID)]
description: Returns the list members ayant un role specific, separateds par un délimitur.
---

# $usersWithRole

The function `$usersWithRole` retourne la **list members** possédant un role specific on the server.

## Syntax

```
$usersWithRole[roleID;(separator);(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role. Required. |
| `separator` | Optional. Separator between thes members. Par default: `, `. |
| `guildID` | Optional. The ID of the server cible. |

## Return Value

| Type | Description |
|---|---|
| `string` | List members ayant the role (format dépend of la configuration). |

## Examples

### List admins

```bdfd
$sendMessage[**Administrators :** $usersWithRole[$roleID[Admin]]]
```

### List with retours to la ligne

```bdfd
$sendMessage[
**Members with the role VIP :**
$usersWithRole[$roleID[VIP];
]]
```

### Compter les members

```bdfd
$sendMessage[Il y a $length[$usersWithRole[$roleID[Member];,]] members with the role Member.]
```

### Vérifier if a role est vide

```bdfd
$if[$usersWithRole[$roleID[Old]]==]
  $sendMessage[Aucun member n'a the role Old.]
$endif
```

### Notifier les admins

```bdfd
$sendMessage[$usersWithRole[$roleID[Admin]] New alerte importante !]
```

## Notes

- Les members sont generally retournés sous forme of mentions.
- Le format exact peut varier according to the version of BDFD.
- Utile for the annonces ciblées or la gestion of communauté.
