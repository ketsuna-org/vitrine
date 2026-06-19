---
layout: doc
title: $addMessageReactions
translation_key: docs
category: "Moderation"
function_name: addMessageReactions
syntax: $addMessageReactions[channelID;messageID;emoji1;...]
description: Adds an or multiple réactions à a message spécifique identifié par its ID de canal and de message.
---

# $addMessageReactions

The `$addMessageReactions[]` function **ajouter of reactions à n'importe which message** in the server, identifié par son canal and its ID.

## Syntax

```
$addMessageReactions[channelID;messageID;emoji1;emoji2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the canal contenant the message cible. |
| `messageID` | The ID of the message sur lequel ajouter les réactions. |
| `emoji1;emoji2;...` | List d'emojis to add, separateds par `;`. |

## Return value

Cette function does not return a value.

## Behavior

- Allows réagir à of messages olds or dans d'autres canaux.
- The bot must have accès au canal and the permission `ADD_REACTIONS`.
- The message doit exister and not avoir été deleted.

## Examples

### Réagir à a message de rules

```bdfd
$addMessageReactions[$rulesChannelID;123456789012345678;✅]
```

### Réaction à a message stocké

```bdfd
$let[msgID;$getUserVar[lastMessageID]]
$let[chanID;$getUserVar[lastChannelID]]
$addMessageReactions[$chanID;$msgID;👍;👎]
```

### Réagir à a message de giveaway

```bdfd
$addMessageReactions[$giveawayChannel;123456789;🎉]
$sendMessage[Réagissez avec 🎉 pour participer !]
```

## Notes

- `$addMessageReactions[]` est la function la plus flexible for réactions because elle cible n'importe which message.
- For the message de response of the bot, préférez `$addReactions[]`.
- For the message déclencheur, use `$addCmdReactions[]`.
