---
layout: doc
title: $addMessageReactions
translation_key: docs
category: "Moderation"
function_name: addMessageReactions
syntax: $addMessageReactions[channelID;messageID;emoji1;...]
description: Adds one or more reactions to a message specific identifié par its ID of canal and of message.
---

# $addMessageReactions

The `$addMessageReactions[]` function **ajouter of reactions to n'importe which message** in the server, identifié par son canal and its ID.

## Syntax

```
$addMessageReactions[channelID;messageID;emoji1;emoji2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the canal contenant the message cible. |
| `messageID` | The ID of the message on lequel ajouter les réactions. |
| `emoji1;emoji2;...` | List of emojis to add, separateds par `;`. |

## Return value

Cette function does not return a value.

## Behavior

- Allows réagir to of messages olds or in of autres canaux.
- The bot must have accès to the canal and the permission `ADD_REACTIONS`.
- The message doit exister and not avoir été deleted.

## Examples

### Réagir to a message of rules

```bdfd
$addMessageReactions[$rulesChannelID;123456789012345678;✅]
```

### Réaction to a message stocké

```bdfd
$let[msgID;$getUserVar[lastMessageID]]
$let[chanID;$getUserVar[lastChannelID]]
$addMessageReactions[$chanID;$msgID;👍;👎]
```

### Réagir to a message of giveaway

```bdfd
$addMessageReactions[$giveawayChannel;123456789;🎉]
$sendMessage[Réagissez with 🎉 pour participer !]
```

## Notes

- `$addMessageReactions[]` est la function la plus flexible for réactions because elle target n'importe which message.
- For the message of response of the bot, préférez `$addReactions[]`.
- For the message déclencheur, use `$addCmdReactions[]`.
