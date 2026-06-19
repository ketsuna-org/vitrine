---
layout: doc
title: $slashID
translation_key: docs
category: "Entity Info"
function_name: slashID
syntax: $slashID
description: Returns the ID Discord of the command slash in progress of exécution.
---

# $slashID

The function `$slashID` **retourne the ID Discord (snowflake) of the command slash** in progress of exécution. Si the command is not une command slash, retourne une string vide.

## Syntax

```
$slashID
```

## Parameters

Aucun.

## Return Value

- **Type** : String
- The ID Discord of the command slash (ex: `1234567890123456789`).
- String vide si the command in progress est une command prefix.

## Behavior

- The ID est attribué par Discord during l'enregistrement of the command.
- Utile for the logging, le debugging, or l'identification unique.
- Returns vide for the commands prefix.

## Examples

### Log détaillé

```bdfd
$if[$slashID!=]
  $log[🔹 SLASH | ID: $slashID | Name: $commandName | User: $userName ($authorID) | Server: $serverName]
$else
  $log[🔸 PREFIX | Name: $commandName | Trigger: $commandTrigger | User: $userName]
$endif
```

### Debug command

```bdfd
$if[$authorID!=$botOwnerID]
  $stop
$endif

$title[🔍 Debug Command]
$description[
**Nom :** $commandName
**Trigger :** $commandTrigger
**Type :** $commandType
**Folder :** $commandFolder
**Slash ID :** $if[$slashID!=]$slashID$elseN/A (prefix)$endif
**Auteur :** $userName ($authorID)
**Server :** $serverName ($guildID)
**Canal :** $channelName ($channelID)
]
$color[#5865F2]
$sendMessage[]
```

### Behavior conditionnel

```bdfd
$if[$slashID!=]
  $var[mode;slash]
  $var[args;$slashOption[1]]
$else
  $var[mode;prefix]
  $var[args;$message[1]]
$endif

$sendMessage[📌 Mode : $var[mode] | Args : $var[args]]
```

### Information command pour support

```bdfd
$if[$slashID!=]
  $sendMessage[🆔 **Slash Command ID :** $slashID
  ┗ Nom : $commandName]
$else
  $sendMessage[📝 **Prefix Command**
  ┗ Trigger : $commandTrigger]
$endif
```

## Notes

- Returns ae string vide for the commands prefix.
- The ID est unique and attribué par Discord.
- Utile for the support technique (provide the ID en cas of bug).
- Pour check if ae command est slash, utilisez `$isSlash` or `$commandType`.
