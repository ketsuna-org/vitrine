---
layout: doc
title: $botID
translation_key: docs
category: "Entity Info"
function_name: botID
syntax: $botID
description: Returns the user ID of the bot.
---

# $botID

The `$botID` function **returns the Discord ID (snowflake) of the bot** that runs the command.

## Syntax

```
$botID
```

## Parameters

None (passing one is an error).

## Return value

- **Type**: String
- The Discord ID of the bot, read from the command context (`bot.id`). E.g., `1234567890123456789`.
- An empty string if the context holds no bot ID.

## Behavior

- No request is made to Discord: the value comes from the command context.
- It can be used for mentions (`<@ID>`) and as the user ID argument of functions such as `$userAvatar[]`.

## Examples

### Technical Information

```bdfd
$title[🔍 Technical Information]
$description[
**Name:** $botName
**ID:** $botID
**Owner:** $botOwnerID
**Node:** $botNode
]
$footer[Bot ID: $botID]
```

### Custom Invite Link

```bdfd
$sendMessage[🔗 **Invite me:**
https://discord.com/oauth2/authorize?client_id=$botID&permissions=8&scope=bot%20applications.commands]
```

### Identity Verification

```bdfd
$if[$authorID==$botID]
  $sendMessage[I do not reply to my own messages!]
  $stop
$endif

$sendMessage[Message received, $userName!]
```

### Mention the Bot

```bdfd
$sendMessage[🤖 <@$botID> is online!]
```

## Notes

- To get the owner's ID, use `$botOwnerID`.
- For the name, use `$botName`.
- Mentioning the bot: `<@$botID>`.
