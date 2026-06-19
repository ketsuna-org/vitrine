---
layout: doc
title: $guildExists[]
translation_key: docs
category: "Entity Info"
function_name: guildExists
syntax: $guildExists[guildId]
description: Checks if un server (guild) with the ID donné existe and si the bot y a accès. Returns "true" or "false".
---

# $guildExists[] — Vérifier l'Existence d'un Server

`$guildExists[]` détermine if a server Discord identifié par son ID existe and si the bot y est currentlement présent.

## Syntax

```
$guildExists[guildId]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `guildId` | Yes | The ID of the server à vérifier. |

## Return Value

- **Type** : `string`
- `"true"` si the bot est présent on the server, `"false"` otherwise.

> **Attention** : The value de retour est une **string** (`"true"` / `"false"`), pas un boolean. Pour les conditions, comparez avec `==true` or `==false`.

## Utilisation

### Vérification simple

```bdfd
$sendMessage[Présence on the server 123456789 : $guildExists[123456789]]
```

### Condition before action

```bdfd
$if[$guildExists[$message[1]]==true]
$sendMessage[✅ The bot est bien présent sur ce server.]
$else
$sendMessage[❌ The bot is not sur ce server, or the ID est invalid.]
$stop
$endif
```

### Vérification multi-servers

```bdfd
$var[guild1;123456789012345678]
$var[guild2;987654321098765432]
$if[$guildExists[$var[guild1]]==true]
$sendMessage[Server 1 : ✅ Présent]
$else
$sendMessage[Server 1 : ❌ Absent]
$endif
$if[$guildExists[$var[guild2]]==true]
$sendMessage[Server 2 : ✅ Présent]
$else
$sendMessage[Server 2 : ❌ Absent]
$endif
```

### Log de disponibilité

```bdfd
$if[$guildExists[$var[targetGuild]]==true]
$log[Action executed : server $var[targetGuild] found]
$else
$log[Action bloquée : server $var[targetGuild] non found]
$endif
```

## Notes

- The function vérifie only si the bot est présent on the server, pas si the server existe on Discord.
- Un server peut exister without que the bot y soit — in this case, `$guildExists[]` retourne `"false"`.
- The ID must be une string numérique valid (Snowflake 18-19 chiffres).
- Pour obtenir the ID of the server courant, utilisez `$guildID[]` or `$serverID[]`.
