---
layout: doc
title: $noMentionMessage
translation_key: docs
category: "Context & Commands"
function_name: noMentionMessage
syntax: $noMentionMessage
description: Récupère le contenu du message sans les mentions. Remplace les mentions d'utilisateurs, rôles et canaux par leurs noms textuels.
---
# $noMentionMessage

La fonction `$noMentionMessage` retourne le **contenu du message** en remplaçant toutes les mentions par leurs noms textuels.

## Syntaxe

```
$noMentionMessage
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : Chaîne
- Le message avec les mentions converties.

## Comportement

- `<@userID>` → `@username`
- `<#channelID>` → `#channel-name`
- `<@&roleID>` → `@role-name`
- Empêche les pings intempestifs dans les logs ou messages relayés.

## Exemples

### Log sans ping

```bdfd
$let[logChannel;123456789]
$title[📋 Nouveau message]
$description[
**Auteur :** $username
**Contenu :** $noMentionMessage
]
$channelSendMessage[$logChannel;]
```

### Commande say sécurisée

```bdfd
$sendMessage[$noMentionMessage]
```

### Relayer un message

```bdfd
$title[Message relayé de $username]
$description[$noMentionMessage]
$footer[Depuis <#$channelID>]
$channelSendMessage[123456789;]
```

## Notes

- `$noMentionMessage` évite que le bot ne pingue accidentellement des utilisateurs.
- Contrairement à `$message`, les mentions sont résolues en noms.
- Pour désactiver complètement les mentions, combinez avec `$suppressMentions`.
