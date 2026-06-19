---
layout: doc
title: $deleteCommand
translation_key: docs
category: "Moderation"
function_name: deleteCommand
syntax: $deleteCommand
description: Deletes the user's command message (the message that triggered the command). Useful for keeping channels clean.
---

# $deleteCommand

The `$deleteCommand` function **deletes the command message** of the user who triggered the command.

## Syntax

```
$deleteCommand
```

## Parameters

None.

## Return value

This function does not return a value.

## Behavior

- Immediately deletes the user's message that triggered the command.
- The bot must have the `MANAGE_MESSAGES` permission in the channel.
- If the message has already been deleted, nothing happens.

## Examples

### Clean command

```bdfd
$deleteCommand
$sendMessage[Result of your command...]
```

### Silent feedback

```bdfd
$deleteCommand
$addReactions[✅]
$ephemeral[Command executed successfully.]
```

### Anti-spam protection

```bdfd
$deleteCommand
$if[$checkContains[$userPerms;Administrator]==false]
  $sendMessage[This command is reserved for administrators.]
  $suppressErrors[]
$else
  $sendMessage[Admin command executed.]
$endif
```

### ModMail / confession

```bdfd
$deleteCommand
$channelSendMessage[$modChannel;Anonymous message:
>>> $noMentionMessage]
$ephemeral[Your message has been sent to the moderation team.]
```

## Notes

- Only works if the bot has the `MANAGE_MESSAGES` permission.
- Ideal for moderation commands, confession systems, or modmails.
- The message is deleted before the bot sends its response.
- If combined with `$addCmdReactions[]`, place `$deleteCommand` before or after depending on the desired behavior.
