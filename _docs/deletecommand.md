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

- Deletes the message that triggered the command (`message.id` in the current channel) at the moment the function runs, before the rest of the script is executed.
- The message is deleted only if it exists: the engine fetches it first. If the command has no triggering message (for example a slash command), the error `Invalid Discord ID.` is raised.
- The bot needs `View Channel`, and `Manage Messages` in the channel to delete a message written by someone else; otherwise the error `Missing permissions for the message operation.` is raised.
- In a direct message, the bot cannot delete another user's message (error).

## Examples

### Clean command

```bdfd
$deleteCommand
$sendMessage[Result of your command...]
```

### Admin-only command

```bdfd
$deleteCommand
$if[$isAdmin[$authorID]==false]
  $sendMessage[This command is reserved for administrators.]
  $stop
$endif
$sendMessage[Admin command executed.]
```

### ModMail / confession

```bdfd
$deleteCommand
$channelSendMessage[123456789012345678;Anonymous message:
>>> $noMentionMessage]
$sendMessage[Your message has been sent to the moderation team.]
```

## Notes

- Ideal for moderation commands, confession systems, or modmails.
- Only the triggering message is deleted; use `$clear` to delete several messages.
