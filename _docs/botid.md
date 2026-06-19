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

The `$botID` function **returns the Discord ID (snowflake) of the bot**. This identifier is unique and permanent.

## Syntax

```
$botID
```

## Parameters

None.

## Return value

- **Type**: String
- The Discord ID of the bot (17-20 digits). E.g., `1234567890123456789`.

## Behavior

- The ID is assigned by Discord upon the creation of the application.
- It never changes, even if the bot is renamed.
- It can be used for mentions (`<@ID>`), invites, and APIs.

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
$sendMessage[]
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

- `$botID` is constant and never changes.
- To get the owner's ID, use `$botOwnerID`.
- For the name, use `$botName`.
- Mentioning the bot: `<@$botID>`.
