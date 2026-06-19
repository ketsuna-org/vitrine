---
layout: doc
title: $botName
translation_key: docs
category: "Entity Info"
function_name: botName
syntax: $botName
description: Returns the username of the bot.
---

# $botName

The `$botName` function **returns the current username of the bot** as it appears on Discord.

## Syntax

```
$botName
```

## Parameters

None.

## Return value

- **Type**: String
- The username of the bot (e.g., `MySuperBot`).

## Behavior

- Returns the username of the bot, not the server display name (nickname).
- The name is the one configured in the Discord Developer Portal.
- Updates automatically if the bot is renamed.

## Examples

### Welcome message

```bdfd
$title[👋 Welcome to $serverName!]
$description[
I am **$botName**, your assistant.
Type `!help` to see my commands.
]
$thumbnail[$botAvatar]
$color[#5865F2]
$sendMessage[]
```

### About page

```bdfd
$title[🤖 About $botName]
$addField[Name;$botName;yes]
$addField[ID;$botID;yes]
$addField[Owner;<@$botOwnerID>;yes]
$addField[Commands;$commandsCount;yes]
$addField[Node;$botNode;yes]
$thumbnail[$botAvatar]
$color[#57F287]
$sendMessage[]
```

### Introduction

```bdfd
$sendMessage[Hello! I am $botName, a versatile bot created with BDFD. 💪]
```

## Notes

- `$botName` is read-only.
- To change the name of the bot, use `$changeUsername[]`.
- To get the ID of the bot, use `$botID`.
- For the avatar, use `$botAvatar`.
