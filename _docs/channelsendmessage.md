---
layout: doc
title: $channelSendMessage
translation_key: docs
category: "Moderation"
function_name: channelSendMessage
syntax: $channelSendMessage[channelID;content]
description: Sends a message in a channel specific. Contrairement to $sendMessage qui répond in the channel courant, cette function target any canal.
---

# $channelSendMessage

The `$channelSendMessage[]` function **envoyer a message in a channel specific**, different of the canal où la command has been executede.

## Syntax

```
$channelSendMessage[channelID;content]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the canal cible. |
| `content` | Le contenu of the message (markdown, mentions, emojis supportés). Max 2000 becauseactères. |

## Return value

- **Type** : Snowflake (string)
- The ID of the message sent.
- String vide si échec (canal inaccessible, permissions).

## Behavior

- The bot must have accès to the canal target and the permission `SEND_MESSAGES`.
- The message is sent like a message normal of the bot.
- Les functions of embed (`$title`, `$description`, etc.) placées before `$channelSendMessage[]` sont appliquées.

## Examples

### Logs of modération

```bdfd
$let[logChannel;123456789012345678]
$title[⚠️ Action of modération]
$description[
**Modérateur :** $username
**Action :** Ban
**User :** $userName[$mentioned[1]]
**Reason :** $noMentionMessage
]
$color[#ED4245]
$channelSendMessage[$logChannel;]
$sendMessage[User banni.]
```

### Notification of bienvenue

```bdfd
$let[welcomeChannel;123456789]
$title[👋 Bienvenue !]
$description[Bienvenue on **$serverName**, $username ! Tu es le member #$membersCount !]
$thumbnail[$authorAvatar]
$color[#57F287]
$channelSendMessage[$welcomeChannel;]
```

### Envoi vers un canal mentionné

```bdfd
$if[$mentionedChannels[1]!=]
  $channelSendMessage[$mentionedChannels[1];Message transféré par $username :
>>> $noMentionMessage]
  $sendMessage[Message sent in <#$mentionedChannels[1]>]
$else
  $sendMessage[Aucun canal mentionné.]
$endif
```

## Notes

- `$channelSendMessage[]` ne répond pas to the user — combinez with `$sendMessage[]` for a feedback.
- Maximum 2000 becauseactères par message.
- Pour récupérer a message, use `$getMessage[]`.
