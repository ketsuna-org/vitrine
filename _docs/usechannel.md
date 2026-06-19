---
layout: doc
title: $useChannel
translation_key: docs
category: "Context & Commands"
function_name: useChannel
syntax: $useChannel[channelID]
description: Change le context of canal for the command in progress. The functions nextes (comme $sendMessage) s'exécuteront in ce canal.
---
# $useChannel

The function `$useChannel[]` **change le context of the canal** for the reste of l'exécution of the command. Toutes les functions qui interagissent with "le canal courant" (comme `$sendMessage`) utiliseront alors le canal spécifié.

## Syntax

```
$useChannel[channelID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the canal cible. |

## Return Value

Aucune. The context est modified.

## Behavior

- Change le canal courant pour **toute la suite** of the command.
- Affecte `$sendMessage`, `$title`, `$description`, etc.
- Le changement est local at execution of the command in progress.

## Examples

### Rediriger les logs

```bdfd
$let[logChannel;123456789012345678]
$useChannel[$logChannel]
$title[📋 Log of command]
$description[
**User :** $username
**Command :** $message
**Canal :** <#$channelID>
**Date :** $day/$month/$year
]
$color[#5865F2]
$sendMessage[]
```

### Envoyer une notification croisée

```bdfd
$useChannel[$dmChannelID[$authorID]]
$sendMessage[Votre ticket was created ! A staff vous contactera bientôt.]
```

### Response in a canal of annonce

```bdfd
$if[$hasPerms[$authorID;Administrator]==true]
  $useChannel[123456789]
  $sendMessage[@everyone Annonce importante : $noMentionMessage]
$else
  $sendMessage[Permission refusée.]
$endif
```

## Notes

- `$channelSendMessage[]` est oftadditionally sûr pour envois ponctuels without changer tout le context.
- Utilisez `$useChannel[]` when several functions doivent s'exécuter in the même canal cible.
- Le canal original est "oublié" for the reste of the command.
