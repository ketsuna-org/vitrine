---
layout: doc
title: $unregisterGuildCommands
translation_key: docs
category: "Moderation"
function_name: unregisterGuildCommands
syntax: $unregisterGuildCommands[guildID]
description: Supprime all commands slash of the bot sur un server spécifique. The commands globals are not affectées.
---

# $unregisterGuildCommands

The function `$unregisterGuildCommands[]` allows **supprimer all commands slash** of the bot sur un server spécifique.

## Syntax

```
$unregisterGuildCommands[guildID]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | The ID of the server duquel supprimer les commands slash. |

## Return Value

This function ne retourne pas de value.

## Behavior

- Supprime UNIQUEMENT les commands de guilde, pas les commands globals.
- Les commands disparaissent immédiatement du menu slash.
- The bot doit avoir la permission `applications.commands`.

## Examples

### Nettoyage manuel

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $unregisterGuildCommands[$guildID]
  $sendMessage[✅ Commands slash deletedes de ce server.]
$else
  $sendMessage[❌ Permission refusée.]
$endif
```

### Réinitialisation

```bdfd
$unregisterGuildCommands[$guildID]
$wait[2]
$registerGuildCommands[$guildID]
$sendMessage[Commands slash réinitialisées avec success.]
```

### Nettoyage before départ

```bdfd
$if[$authorID==OWNER_ID]
  $unregisterGuildCommands[$message[1]]
  $botLeave[$message[1]]
  $sendMessage[Commands deletedes and bot retiré of the server $message[1].]
$endif
```

## Notes

- Les commands globals ne sont PAS affectées par this function.
- Pour ré-enregistrer, utilisez `$registerGuildCommands[]`.
- Utile before de quitter un server or pour nettoyer d'oldnes commands.
