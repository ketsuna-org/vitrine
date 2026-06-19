---
layout: doc
title: $messageType
translation_key: docs
category: "Entity Info"
function_name: messageType
syntax: $messageType
description: Returns the type of the message déclencheur sous forme of integer (0 = message normal, 1 = ajout member, etc.).
---

# $messageType

The function `$messageType` retourne le **type** of the message déclencheur sous forme of integer. The type `0` correspond to un message user normal, les autres types correspondent to messages système Discord.

## Syntax

```
$messageType
```

## Parameters

Aucun parameter.

## Return Value

| Type | Description |
|---|---|
| `integer` | The type of the message. |

## Types courants

| Type | Signification |
|---|---|
| `0` | Message normal (DEFAULT) |
| `1` | Ajout of un member to the group DM (RECIPIENT_ADD) |
| `2` | Retrait of un member of the group DM (RECIPIENT_REMOVE) |
| `3` | Message of call vocal (CALL) |
| `4` | Changement of nom of channel (CHANNEL_NAME_CHANGE) |
| `5` | Changement of icon of channel (CHANNEL_ICON_CHANGE) |
| `6` | Message épinglé (CHANNEL_PINNED_MESSAGE) |
| `7` | New member (GUILD_MEMBER_JOIN) |
| `8` | Boost server (USER_PREMIUM_GUILD_SUBSCRIPTION) |
| `9` | Boost level 1 (GUILD_TIER_1) |
| `10` | Boost level 2 (GUILD_TIER_2) |
| `11` | Boost level 3 (GUILD_TIER_3) |

## Examples

### Display the type

```bdfd
$sendMessage[Type of message : $messageType]
```

### Ignorer les messages système

```bdfd
$if[$messageType!=0]
  $stop
$endif
$sendMessage[Message user traité.]
```

### Réagir to the arrivées

```bdfd
$if[$messageType==7]
  $sendMessage[Bienvenue $username !]
$endif
```

## Notes

- Utile pour filter thes messages système and ne traiter que les messages users.
- Returns a integer, pas une string descriptive.
