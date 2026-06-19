---
layout: doc
title: $roleCount
translation_key: docs
category: "Entity Info"
function_name: roleCount
syntax: $roleCount[(guildID)]
description: Returns the number total de roles on the server Discord.
---

# $roleCount

The function `$roleCount` retourne le **number total de roles** présents on the server Discord, incluant the role `@everyone`.

## Syntax

```
$roleCount[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | Optional. The ID of the server cible. Si omis, the server courant. |

## Return Value

| Type | Description |
|---|---|
| `integer` | The namebre de roles on the server. |

## Examples

### Number de roles

```bdfd
$sendMessage[Ce server a $roleCount roles.]
```

### Statistiques of the server

```bdfd
$sendMessage[
**Stats of the server :**
Members : $memberCount
Roles : $roleCount
Channels : $channelCount
]
```

### Vérifier la limit de roles

```bdfd
$if[$roleCount>=250]
  $sendMessage[⚠️ Warning: ce server approche de la limit de 250 roles Discord.]
$endif
```

## Notes

- Inclut the role `@everyone` in the compte.
- La limit Discord est de 250 roles par server.
- Utile pour des statistiques or des vérifications administratives.
