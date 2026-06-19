---
layout: doc
title: $messageURL
translation_key: docs
category: "Entity Info"
function_name: messageURL
syntax: $messageURL
description: Returns the URL of jump (link direct) vers the message déclencheur.
---

# $messageURL

The function `$messageURL` retourne l'**URL of jump** (link direct) vers the message that triggered the command. Ce link allows to accéder directly to the message in Discord.

## Syntax

```
$messageURL
```

## Parameters

Aucun parameter.

## Return Value

| Type | Description |
|---|---|
| `string` | URL to the format `https://discord.com/channels/{guildID}/{channelID}/{messageID}`. |

## Examples

### Link direct

```bdfd
$sendMessage[Message original : $messageURL]
```

### Dans un embed

```bdfd
$title[Message signalé]
$description[
**Auteur :** $username
**Contenu :** $message
**Link :** [Cliquez ici]($messageURL)
]
$color[#ED4245]
$sendMessage[]
```

### Log with link

```bdfd
$channelSendMessage[$channelIDFromName[logs];Message of $username : $messageURL]
```

## Notes

- Format : `https://discord.com/channels/{guildID}/{channelID}/{messageID}`.
- En DM, le format utilise the ID of the channel DM.
- Le link ne functionne que si the user a accès to the channel.
