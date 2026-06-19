---
layout: doc
title: $noMentionMessage
translation_key: docs
category: "Context & Commands"
function_name: noMentionMessage
syntax: $noMentionMessage
description: Gets the contenu of the message without thes mentions. Remplace les mentions d'users, roles and canaux par leurs noms textuels.
---
# $noMentionMessage

The function `$noMentionMessage` retourne le **contenu of the message** en remplaçant all mentions par leurs noms textuels.

## Syntax

```
$noMentionMessage
```

## Parameters

Aucun.

## Return Value

- **Type** : String
- The message with thes mentions convertedes.

## Behavior

- `<@userID>` → `@username`
- `<#channelID>` → `#channel-name`
- `<@&roleID>` → `@role-name`
- Empêche les pings intempestifs in thes logs or messages relayés.

## Examples

### Log without ping

```bdfd
$let[logChannel;123456789]
$title[📋 New message]
$description[
**Auteur :** $username
**Contenu :** $noMentionMessage
]
$channelSendMessage[$logChannel;]
```

### Command say sécurisée

```bdfd
$sendMessage[$noMentionMessage]
```

### Relayer un message

```bdfd
$title[Message relayé de $username]
$description[$noMentionMessage]
$footer[Dethen <#$channelID>]
$channelSendMessage[123456789;]
```

## Notes

- `$noMentionMessage` évite que the bot ne pingue accidentellement des users.
- Contrairement à `$message`, les mentions sont resolvedes en noms.
- Pour désactiver completement les mentions, combinez avec `$suppressMentions`.
