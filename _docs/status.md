---
layout: doc
title: $status[]
translation_key: docs
category: "Entity Info"
function_name: status
syntax: $status[(guildID);(userID)]
description: "Presence status (online, idle, dnd, offline) of the user who ran the command. Empty for another user: presences are not shared."
---
# $status — Presence status (online, idle, dnd, offline) of the user who ran the command. Empty for another user: presences are not shared.

## Syntax

```
$status[(guildID);(userID)]
```

## Parameters

- **guildID** *(String, optional)* — Server ID (ignored)
- **userID** *(String, optional)* — User ID (empty: the author)

## Return Value

- String.

## Usage

```
$status[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$status[guildID;userID]]
```
