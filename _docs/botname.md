---
layout: doc
title: $botName
translation_key: docs
category: "Entity Info"
function_name: botName
syntax: $botName
description: Returns the username of the bot (`Bot` when the context does not provide it).
---

# $botName

The `$botName` function **returns the username of the bot** as known to the command context.

## Syntax

```
$botName
```

## Parameters

None (passing one is an error).

## Return value

- **Type**: String
- The username of the bot (e.g., `MySuperBot`), read from the context variable `bot.username` (filled from the bot account known to the gateway cache), otherwise `bot.name`.
- If neither is available, the text `Bot`.

## Behavior

- Returns the username of the bot, not the server display name (nickname).
- No request is made to Discord by the function itself.

## Examples

### Welcome message

```bdfd
$title[👋 Welcome to $serverName!]
$description[
I am **$botName**, your assistant.
Type `!help` to see my commands.
]
$thumbnail[$userAvatar[$botID]]
$color[#5865F2]
```

### About page

```bdfd
$title[🤖 About $botName]
$addField[Name;$botName;yes]
$addField[ID;$botID;yes]
$addField[Owner;<@$botOwnerID>;yes]
$addField[Commands;$commandsCount;yes]
$addField[Node;$botNode;yes]
$thumbnail[$userAvatar[$botID]]
$color[#57F287]
```

### Introduction

```bdfd
$sendMessage[Hello! I am $botName, a versatile bot created with BDFD. 💪]
```

## Notes

- `$botName` is read-only. (`$changeUsername[]` does not rename the bot: it changes the server nickname of a user.)
- To get the ID of the bot, use `$botID`.
- For the avatar, use `$userAvatar[$botID]`.
