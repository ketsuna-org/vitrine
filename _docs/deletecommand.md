---
layout: doc
title: $deleteCommand
translation_key: docs
category: "Moderation"
function_name: deleteCommand
syntax: $deleteCommand
description: Deletes the message de command of the user (the message qui a déclenché le trigger). Utile pour garder les canaux propres.
---

# $deleteCommand

The `$deleteCommand[]` function **supprimer the message de command** of the user qui a déclenché le trigger.

## Syntax

```
$deleteCommand
```

## Parameters

Cette function ne prend auca parameter.

## Return value

Cette function does not return a value.

## Behavior

- Supprime immediately the message of the user ayant déclenché la command.
- The bot must have the permission `MANAGE_MESSAGES` in the channel.
- If the message a déjà été deleted, rien ne se passe.

## Examples

### Command propre

```bdfd
$deleteCommand
$sendMessage[Result de votre command...]
```

### Sislow feedback

```bdfd
$deleteCommand
$addReactions[✅]
$ephemeral[Command executede avec success.]
```

### Protection anti-spam

```bdfd
$deleteCommand
$if[$checkContains[$userPerms;Administrator]==false]
  $sendMessage[Cette command est réservée aux administrators.]
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
$ephemeral[Votre message has been sent à l'équipe de modération.]
```

## Notes

- Functionne only if the bot a `MANAGE_MESSAGES`.
- Idéal for commands de modération, les systèmes de confession or les modmails.
- The message is deleted before only the bot n'sends sa response.
- Si combiné avec `$addCmdReactions[]`, placez `$deleteCommand` after or before selon le behavior souhaité.
