---
layout: doc
title: $creationDate
translation_key: docs
category: "Entity Info"
function_name: creationDate
syntax: $creationDate[entityID]
description: Returns the date of création of une entité Discord (user, server, role, channel, etc.) from its ID.
---

# $creationDate

The `$creationDate[]` function **récupérer the date of création** of une entité Discord from its ID (Snowflake). Functionne for users, servers, roles, channels, etc.

## Syntax

```
$creationDate[entityID]
```

## Parameters

| Parameter | Description |
|---|---|
| `entityID` | The ID Discord of l'entité (user, server, role, channel, message...). |

## Return value

- **Type** : String
- La date of création in the format `JJ/MM/AAAA`.
- Extractede of the timestamp contenu in the Snowflake ID Discord.

## Behavior

- Les IDs Discord (Snowflakes) contiennent un timestamp of création.
- The function extracted ce timestamp and the formate en date lisible.
- Functionne pour tout type of entité Discord disposant of an ID.

## Examples

### Fiche user

```bdfd
$title[👤 $userName[$authorID]]
$description[
**Counts created le :** $creationDate[$authorID]
**A rejoint le :** $memberJoinDate[$authorID]
**ID :** $authorID
]
$thumbnail[$userAvatar[$authorID]]
$sendMessage[]
```

### Info server

```bdfd
$title[📋 $serverName]
$description[
**Created le :** $creationDate[$guildID]
**Owner :** $userName[$ownerID]
**Members :** $membersCount
]
$thumbnail[$serverIcon]
$sendMessage[]
```

### Compareason of oldneté

```bdfd
$let[creation;$creationDate[$authorID]]
Votre compte Discord has been created le **$creation**.
```

## Notes

- La précision est to la millisecond près (le timestamp est included in the Snowflake).
- Le format peut varier according to les parameters régionaux of the bot.
- Functionne only with of IDs Discord valids.
