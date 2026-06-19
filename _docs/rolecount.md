---
layout: doc
title: $roleCount
translation_key: docs
category: "Entity Info"
function_name: roleCount
syntax: $roleCount[(guildID)]
description: Returns the number total of roles on the server Discord.
---

# $roleCount

The function `$roleCount` retourne le **number total of roles** présents on the server Discord, incluant the role `@everyone`.

## Syntax

```
$roleCount[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | Optional. The ID of the server cible. Si omitted, the server courant. |

## Return Value

| Type | Description |
|---|---|
| `integer` | The namebre of roles on the server. |

## Examples

### Number of roles

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

### Vérifier la limit of roles

```bdfd
$if[$roleCount>=250]
  $sendMessage[⚠️ Warning: ce server approche of la limit of 250 roles Discord.]
$endif
```

## Notes

- Inclut the role `@everyone` in the compte.
- La limit Discord est of 250 roles par server.
- Utile pour statistiques or vérifications administratives.
