---
layout: doc
title: $botLeave
translation_key: docs
category: "Moderation"
function_name: botLeave
syntax: $botLeave[(guildID)]
description: Fait quitter the bot of a server. If no ID n'is provided, the bot quitte the server où la command est executede.
---

# $botLeave

The `$botLeave[]` function **faire quitter the bot of a server**. Action irréversible qui deletes the bot of the server cible.

## Syntax

```
$botLeave[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | Optional - The ID of the server to quitter. Par default, the server courant. |

## Return value

Cette function does not return a value.

## Behavior

- The bot quitte immediately the server spécifié.
- **Action irréversible** : all the data of the bot on ce server sont perdues.
- Si executed without guildID, the bot quitte the server où la command est lancée.

## Examples

### Quitter the server courant

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $sendMessage[Au revoir ! The bot quitte ce server.]
  $botLeave
$else
  $sendMessage[Seuls les administrators can use cette command.]
$endif
```

### Quitter a server specific (owner only)

```bdfd
$if[$authorID==OWNER_ID]
  $let[targetGuild;$message[1]]
  $if[$targetGuild!=]
    $botLeave[$targetGuild]
    $sendMessage[Bot retiré of the server $targetGuild.]
  $else
    $sendMessage[Usage : !leave <guildID>]
  $endif
$else
  $sendMessage[Réservé to the owner of the bot.]
$endif
```

### Nettoyage automatique

```bdfd
$if[$membersCount<5]
  $channelSendMessage[$channelID;Ce server a less than 5 members. The bot va quitter.]
  $botLeave
$endif
```

## Notes

- **Action irréversible** : use with a extrême prudence.
- Protégez cette command par vérifications of permissions strictes.
- Toutes the data user liées to ce server deviennent inaccessibles.
- The bot cannot rejoindre a server via command (requires a link of invite).
