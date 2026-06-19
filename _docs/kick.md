---
layout: doc
title: $kick
translation_key: docs
category: "Moderation"
function_name: kick
syntax: $kick[userID;(reason)]
description: Expulse un user of the server Discord.
---

# $kick

The function `$kick` **expulse (kick) un user** of the server Discord. Contrairement au ban, the user peut revenir with ae new invite. The bot doit avoir la permission `KickMembers`.

## Syntax

```
$kick[userID;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user à expulser. Required. |
| `reason` | Optional. The reason de l'expulsion. |

## Return Value

Aucune. The user est expulsé of the server.

## Examples

### Expulsion simple

```bdfd
$kick[$mentioned[1];Non-respect des règles]
$sendMessage[<@$mentioned[1]> was expulsé.]
```

### Command d'expulsion avec confirmation

```bdfd
$if[$argsCount<1]
  $sendMessage[Usage: !kick <@mention> <reason>]
  $stop
$endif

$kick[$mentioned[1];$replaceText[$message;-;$mentioned[1];]]
$sendMessage[✅ Expulsion effectuée.]
```

### Vérification before expulsion

```bdfd
$if[$isAdmin==true]
  $kick[$mentioned[1];Abus]
  $sendMessage[Member expulsé.]
$else
  $sendMessage[Permission refusée. Admin required.]
$endif
```

## Notes

- The bot doit avoir la permission `KickMembers`.
- The user expulsé can be réinvité.
- Utilisez `$ban` for ae kick permanent.
- Pour expulser the user mentionné without spécifier the ID, utilisez `$kickMention`.
