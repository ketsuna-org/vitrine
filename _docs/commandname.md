---
layout: doc
title: $commandName
translation_key: docs
category: "Entity Info"
function_name: commandName
syntax: $commandName
description: Returns the name of the command in progress of execution.
---

# $commandName

The `$commandName` function **retourne the name of the command in progress of execution**, such as set in the éditeur BDFD.

## Syntax

```
$commandName
```

## Parameters

Aucun.

## Return value

- **Type** : String
- The name of the command (ex: `help`, `ban`, `ping`).

## Behavior

- Returns the name internal of the command, not the trigger.
- The name est celui set in the console BDFD.
- Utile for logs, l'aide contextuelle, la détection.

## Examples

### Log of execution

```bdfd
$log[📌 $userName ($authorID) a executed /$commandName in #$channelName on $serverName]
```

### Aide contextuelle

```bdfd
$title[❓ Aide : $commandName]
$description[
**Command :** $commandName
**Type :** $commandType
**Folder :** $commandFolder
**Trigger :** $commandTrigger
]
$footer[Utilisée par $userName]
$sendMessage[]
```

### Gestion errors custome

```bdfd
$if[$message[1]==]
  $sendMessage[❌ Usage correct : $commandTrigger <parameter>
  Tapez `!help $commandName` pour more information.]
  $stop
$endif
```

### Statistique of usage (via stockage)

```bdfd
$var[count;$getVar[usage_$commandName]]
$var[count;$math[$var[count]+1]]
$setVar[usage_$commandName;$var[count]]
$log[📊 $commandName utilisée $var[count] fois]
```

### Détection pour behavior specific

```bdfd
$if[$commandName==help]
  $sendMessage[📚 Voici la list commands...]
$elseif[$commandName==ping]
  $sendMessage[🏓 Pong ! Latency : $ping ms]
$else
  $sendMessage[Command $commandName executede.]
$endif
```

## Notes

- `$commandName` retourne the name internal, not the trigger (préfixe).
- En slash, the name correspond to celui of l'application command.
- For the type (prefix/slash), use `$commandType`.
- For the folder, use `$commandFolder`.
