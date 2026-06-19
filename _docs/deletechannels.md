---
layout: doc
title: $deleteChannels
translation_key: docs
category: "Moderation"
function_name: deleteChannels
syntax: $deleteChannels[channelID1;channelID2;...]
description: "Deletes a or multiple canaux par their ID. Alias : $deleteChannelsByName for the suppression by name."
---

# $deleteChannels

The `$deleteChannels[]` function **supprimer un or multiple canaux** par their ID. A alias `$deleteChannelsByName[]` existe for the suppression by name.

## Syntax

```
$deleteChannels[channelID1;channelID2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID1;channelID2;...` | IDs des canaux to delete, separateds par `;`. |

## Return value

Cette function does not return a value.

## Behavior

- The bot must have the permission `MANAGE_CHANNELS`.
- La suppression est **irréversible**.
- If a ID est invalid, les autres canaux valids sont when même deleteds.

## Examples

### Suppression simple

```bdfd
$deleteChannels[$channelID]
$sendMessage[Canal deleted.]
```

### Nettoyage de tickets

```bdfd
$deleteChannels[$ticketID]
$sendMessage[Ticket fermé and canal deleted.]
```

### Suppression conditionnelle

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $deleteChannels[$mentionedChannels[1]]
  $sendMessage[Canaux deleteds.]
$else
  $sendMessage[Permission refusée.]
$endif
```

### Suppression by name (alias)

```bdfd
$deleteChannelsByName[ticket-*]
$sendMessage[All canaux de ticket deleteds.]
```

## Notes

- **Action irréversible** : use avec précaution.
- Les canaux deleteds ne peuvent PAS être restaurés via the API.
- For catégories, la suppression supprime also all canaux enfants.
- L'alias `$deleteChannelsByName[]` accepte des wildbecauseds (`*`).
