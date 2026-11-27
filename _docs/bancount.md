---
layout: doc
title: $banCount
translation_key: docs
category: "Moderation"
function_name: banCount
syntax: $banCount[(guildID)]
description: Returns the number of users banned from a server. Bot Creator function, not in BDFD.
---

# $banCount

The function `$banCount` **returns the number of users banned** from a server. It is useful for server information commands and moderation statistics. This function does not exist in BDFD: it is specific to Bot Creator.

## Syntax

```
$banCount[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | Optional. The ID of a server where the bot is present. Empty or absent: the current server. An invalid ID raises `Invalid guild ID.` |

## Return value

- **Type**: Number
- The number of bans of the server, `0` when there is none.

## Examples

```bdfd
$sendMessage[This server has banned $banCount users.]
```

```bdfd
$title[Moderation]
$description[Bans: **$banCount**]
```

## Notes

- The bot needs the `Ban Members` permission, as for `$isBanned`; otherwise an error is raised.
- Discord has no count of bans: the bot reads the list of bans 1000 at a time, so on a server with a very large ban list the call takes a few requests. Store the result in a variable if the command runs often.
- To know if one user is banned, use `$isBanned[userID]`.
- JavaScript: `(await guild.bans.fetch()).size`.
