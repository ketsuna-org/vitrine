---
layout: doc
title: $creationDate
translation_key: docs
category: "Entity Info"
function_name: creationDate
syntax: $creationDate[entityID;(layout)]
description: Returns the creation date of a Discord entity (user, server, role, channel, message, etc.) from its ID, YYYY-MM-DD by default or in a Go-style layout.
---

# $creationDate

The `$creationDate[]` function **computes the creation date** of a Discord entity from its ID (Snowflake). It works for users, servers, roles, channels, messages, etc. `$userJoinedDiscord[]` is the same function under another name.

## Syntax

```
$creationDate[entityID;(layout)]
```

## Parameters

| Parameter | Description |
|---|---|
| `entityID` | The Discord ID of the entity (user, server, role, channel, message, etc.): a positive number that fits in 64 bits. Surrounding spaces are removed. Anything else raises `Expected a positive unsigned 64-bit Discord ID.` |
| `layout` | Optional. A Go-style time layout, written with the reference date `Mon Jan 2 15:04:05 MST 2006` (for example `02/01/2006` or `2006-01-02 15:04:05`). Default: `2006-01-02`. An empty layout returns an empty string. |

## Return value

- **Type**: String
- The creation date, by default in the format `YYYY-MM-DD` (for example `2016-04-30`). With a layout, the date formatted as asked.
- The date is computed from the timestamp contained in the Snowflake; no request is made to Discord.

## Behavior

- Discord IDs (Snowflakes) contain a creation timestamp; the function extracts it (millisecond precision) and formats it.
- The time is expressed in UTC, or in the timezone set earlier with `$time[timezone]`.
- Layout tokens are those of Go: `2006` year, `01` month number, `Jan`/`January` month name, `02` day, `Mon`/`Monday` weekday, `15` hour (24h), `03`/`3` hour (12h) with `PM`, `04` minute, `05` second, `MST` zone abbreviation. `YYYY`, `DD` or `MM` are **not** tokens and are printed as is.
- Probes: `$creationDate[175928847299117063]` gives `2016-04-30`, with layout `02/01/2006` gives `30/04/2016`, with `2006-01-02 15:04:05` gives `2016-04-30 11:18:25`.

## Examples

### User profile

```bdfd
$title[👤 $userName[$authorID]]
$description[
**Account created on:** $creationDate[$authorID]
**Joined on:** $userJoined[$authorID]
**ID:** $authorID
]
$thumbnail[$userAvatar[$authorID]]
```

### Server info

```bdfd
$title[📋 $serverName]
$description[
**Created on:** $creationDate[$guildID]
**Owner:** $userName[$serverOwner]
**Members:** $membersCount
]
$thumbnail[$serverIcon]
```

### Custom layout

```bdfd
Account created: $creationDate[$authorID;02/01/2006 15:04:05]
```

### Account Age

```bdfd
$var[creation;$creationDate[$authorID]]
Your Discord account was created on **$var[creation]**.
```

## Notes

- Precision is down to the millisecond (the timestamp is included in the Snowflake).
- The default format does not depend on any regional setting.
- Works only with valid Discord IDs; other values raise an error.
