---
layout: doc
title: $userJoined
translation_key: docs
category: "Entity Info"
function_name: userJoined
syntax: $userJoined[userID;(format)]
description: Returns the date when a user joined the current Discord server, formatted with a Go time layout.
---

# $userJoined

The `$userJoined` function returns the **join date** of the given user on the Discord server where the command is executed.

## Syntax

```
$userJoined[userID;(format)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Required - The ID of the user. An invalid ID raises an error. |
| `format` | Optional - A Go time layout (e.g. `2006-01-02 15:04:05`). Default: `2006-01-02`. |

## Return Value

- **Type**: String
- The join date formatted with `format` (default `2006-01-02`), in the timezone set with `$time[]`.
- An error is raised if the user is not a member of the server or if the join date is unavailable.

## Behavior

- `$userJoined` requires at least the user ID: used without argument it is invalid.
- Returns the date when the user joined the **current server**.
- Requires the user to be a member of the server.

## Examples

### Welcome message

```bdfd
$title[New member!]
$author[$userName;$authorAvatar]
$description[
Welcome to the server **$serverName**!
You joined on **$userJoined[$authorID]**.
]
$color[#57F287]
$sendMessage[Welcome!]
```

### Member tenure

```bdfd
$title[Your Join Date]
$description[
You have been a member since **$userJoined[$authorID]**.
]
$color[#5865F2]
$sendMessage[Join date]
```

## Notes

- `$userJoined` gives the join date on the **server**.
- For the creation date of the Discord account, use `$userJoinedDiscord`.
- Useful for member information commands and welcome messages.
