---
layout: doc
title: $creationDate
translation_key: docs
category: "Entity Info"
function_name: creationDate
syntax: $creationDate[entityID]
description: Returns the creation date of a Discord entity (user, server, role, channel, etc.) from its ID.
---

# $creationDate

The `$creationDate[]` function **retrieves the creation date** of a Discord entity from its ID (Snowflake). It works for users, servers, roles, channels, etc.

## Syntax

```
$creationDate[entityID]
```

## Parameters

| Parameter | Description |
|---|---|
| `entityID` | The Discord ID of the entity (user, server, role, channel, message, etc.). |

## Return value

- **Type**: String
- The creation date in the format `DD/MM/YYYY`.
- Extracted from the timestamp contained within the Discord Snowflake ID.

## Behavior

- Discord IDs (Snowflakes) contain a creation timestamp.
- The function extracts this timestamp and formats it into a readable date.
- Works for any type of Discord entity that has an ID.

## Examples

### User profile

```bdfd
$title[👤 $userName[$authorID]]
$description[
**Account created on:** $creationDate[$authorID]
**Joined on:** $memberJoinDate[$authorID]
**ID:** $authorID
]
$thumbnail[$userAvatar[$authorID]]
$sendMessage[]
```

### Server info

```bdfd
$title[📋 $serverName]
$description[
**Created on:** $creationDate[$guildID]
**Owner:** $userName[$ownerID]
**Members:** $membersCount
]
$thumbnail[$serverIcon]
$sendMessage[]
```

### Account Age

```bdfd
$let[creation;$creationDate[$authorID]]
Your Discord account was created on **$creation**.
```

## Notes

- Precision is down to the millisecond (the timestamp is included in the Snowflake).
- The format may vary depending on the bot's regional settings.
- Works only with valid Discord IDs.
