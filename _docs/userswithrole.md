---
layout: doc
title: $usersWithRole
translation_key: docs
category: "Entity Info"
function_name: usersWithRole
syntax: $usersWithRole[roleID;(separator);(guildID)]
description: Returns the list des members ayant un role spécifique, separateds par un délimitur.
---

# $usersWithRole

The function `$usersWithRole` retourne la **list des members** possédant un role spécifique on the server.

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
| `string` | List des members ayant the role (format dépend de la configuration). |

## Examples

### List des admins

```bdfd
$sendMessage[**Administrators :** $usersWithRole[$roleID[Admin]]]
```

### List avec retours à la ligne

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

- Les members sont generally retournés sous forme de mentions.
- Le format exact peut varier selon la version de BDFD.
- Utile for the annonces ciblées or la gestion de communauté.
