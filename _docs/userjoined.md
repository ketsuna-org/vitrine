---
layout: doc
title: $userJoined
translation_key: docs
category: "Entity Info"
function_name: userJoined
syntax: $userJoined
description: Returns the date when the user joined the current Discord server.
---

# $userJoined

The `$userJoined` function returns the **join date** of the user on the Discord server where the command is executed.

## Syntax

```
$userJoined
```

## Return Value

- **Type**: Date/String
- Format: depends on the context (readable date or timestamp)

## Behavior

- `$userJoined` takes **no arguments**.
- Returns the date when the user joined the **current server**.
- Requires the user to be a member of the server.

## Examples

### Welcome message

```bdfd
$title[New member!]
$author[$userName;$userAvatar]
$description[
Welcome to the server **$serverName**!
You joined on **$userJoined**.
]
$color[#57F287]
$sendMessage[]
```

### Member tenure

```bdfd
$title[Your Join Date]
$description[
You have been a member since **$userJoined**.
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- `$userJoined` gives the join date on the **server**.
- For the creation date of the Discord account, use `$userJoinedDiscord`.
- Useful for member information commands and welcome messages.
