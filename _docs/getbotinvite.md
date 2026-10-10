---
layout: doc
title: $getBotInvite
translation_key: docs
category: "Moderation"
function_name: getBotInvite
syntax: $getBotInvite
description: Returns the bot's invite link (scopes bot and applications.commands, with the configured permissions). Takes no argument.
---

# $getBotInvite

The `$getBotInvite[]` function allows you to **generate the invite link of the bot**. It takes no argument.

## Syntax

```
$getBotInvite
```

## Parameters

None. Any argument is refused ("Invalid argument count"); there is no `guildID` parameter. `$getBotInvite` and `$getBotInvite[]` are both valid.

## Return Value

- **Type**: String (URL)
- The complete invite URL of the bot.
- Format: `https://discord.com/api/oauth2/authorize?client_id=ID&scope=bot+applications.commands&permissions=N`

## Behavior

- The `permissions` value of the link is the invite permissions configured in the engine (default `8`, i.e. Administrator).
- The link always includes the `bot` and `applications.commands` scopes.
- The function raises an error if the application ID is unavailable or the configured permissions are invalid.

## Examples

### Invite command

```bdfd
$title[📨 Invite the bot]
$description[
Click on the link below to invite the bot to your server:

[$getBotInvite]

The link grants the permissions encoded in its `permissions` parameter.
]
$color[#5865F2]
```

### Link in a code block

```bdfd
$title[🔗 Invite Link]
$description[
Share this link to invite the bot:

`$getBotInvite`
]
```

### Info + Invite command

```bdfd
$title[🤖 Bot Info]
$description[
**Name:** $botName
**Servers:** $guildCount
**Users:** $membersCount

[🔗 Invite the bot]($getBotInvite)
]
$thumbnail[$userAvatar[$botID]]
$color[#57F287]
```

## Notes

- The permissions in the link come from the engine's invite permission setting (default `8`), not from the Discord application page.
- For a server invite (not the bot's invite), use `$getServerInvite[]`.
