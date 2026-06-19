---
layout: doc
title: $deleteCommand
translation_key: docs
category: "Moderation"
function_name: deleteCommand
syntax: $deleteCommand
description: Deletes the user's command message (the message that triggered le trigger). Utile pour garder les canaux propres.
---

# $deleteCommand

The `$deleteCommand[]` function **supprimer the command message** of the user qui triggered le trigger.

## Syntax

```
$deleteCommand
```

## Parameters

Cette function ne prend auca parameter.

## Return value

Cette function does not return a value.

## Behavior

- Supprime immediately the user's message ayant triggered la command.
- The bot must have the permission `MANAGE_MESSAGES` in the channel.
- If the message a déjà été deleted, rien ne se passe.

## Examples

### Command propre

```bdfd
$deleteCommand
$sendMessage[Result of votre command...]
```

### Sislow feedback

```bdfd
$deleteCommand
$addReactions[✅]
$ephemeral[Command executede with success.]
```

### Protection anti-spam

```bdfd
$deleteCommand
$if[$checkContains[$userPerms;Administrator]==false]
  $sendMessage[Cette command est réservée to the administrators.]
  $suppressErrors[]
$else
  $sendMessage[Command admin executede.]
$endif
```

### ModMail / confession

```bdfd
$deleteCommand
$channelSendMessage[$modChannel;Message anonyme :
>>> $noMentionMessage]
$ephemeral[Votre message has been sent to l'équipe of modération.]
```

## Notes

- Functionne only if the bot a `MANAGE_MESSAGES`.
- Idéal for commands of modération, les systèmes of confession or les modmails.
- The message is deleted before only the bot n'sends sa response.
- Si combiné with `$addCmdReactions[]`, placez `$deleteCommand` after or before according to the behavior souhaité.
