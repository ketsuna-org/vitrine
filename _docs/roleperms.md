---
layout: doc
title: $rolePerms
translation_key: docs
category: "Entity Info"
function_name: rolePerms
syntax: $rolePerms[roleID;(guildID)]
description: Returns thes permissions of a role Discord sous forme de list textuelle or de value brute.
---

# $rolePerms

The function `$rolePerms` retourne les **permissions** of a role Discord, soit sous forme de list textuelle, soit sous forme de value entière brute.

## Syntax

```
$rolePerms[roleID;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role. Required. |
| `guildID` | Optional. The ID of the server cible. |

## Return Value

| Type | Description |
|---|---|
| `string` | La list des permissions of the role. |

## Permissions courantes

| Permission | Description |
|---|---|
| `Administrator` | Toutes les permissions |
| `ManageGuild` | Gérer the server |
| `ManageRoles` | Gérer les roles |
| `ManageChannels` | Gérer les channels |
| `KickMembers` | Expulser des members |
| `BanMembers` | Bannir des members |
| `ManageMessages` | Gérer les messages |
| `MentionEveryone` | Mentionner @everyone |
| `SendMessages` | Envoyer des messages |
| `ReadMessages` | Voir les channels |
| `Connect` | Se connecter en vocal |

## Examples

### Afficher les permissions

```bdfd
$sendMessage[Permissions of the role Admin : $rolePerms[$roleID[Admin]]]
```

### Vérifier une permission

```bdfd
$if[$checkContains[$rolePerms[$roleID[Member]];Administrator]]
  $sendMessage[⚠️ The role Member a la permission Administrator !]
$else
  $sendMessage[Permissions standards.]
$endif
```

### Vérifier if a role peut gérer les messages

```bdfd
$if[$checkContains[$rolePerms[$roleID[Modo]];ManageMessages]]
  $sendMessage[Les modérateurs peuvent gérer les messages.]
$endif
```

### List formattede

```bdfd
$sendMessage[**Permissions de $roleName[$roleID[Admin]] :**
$rolePerms[$roleID[Admin]]]
```

## Notes

- Le format exact peut varier selon la version de BDFD.
- Pour obtenir the value entière brute, utilisez `$roleInfo[ID;permissions]`.
- À utiliser avec `$checkContains` pour tester des permissions spécifiques.
