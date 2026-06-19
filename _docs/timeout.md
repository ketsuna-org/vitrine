---
layout: doc
title: $timeout
translation_key: docs
category: "Moderation"
function_name: timeout
syntax: $timeout[userID;duration;(reason)]
description: Met un user en timeout (silence temporary).
---

# $timeout

The function `$timeout` **met un user en timeout** on Discord. Pendant the duration spécifiée, the user ne peut ni envoyer de messages, ni parler en vocal, ni réagir. The bot doit avoir la permission `ModerateMembers`.

## Syntax

```
$timeout[userID;duration;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user. Required. |
| `duration` | Duration of the timeout. Required. Formats acceptés : `s` (seconds), `m` (minutes), `h` (hours), `d` (days). Examples: `"60s"`, `"5m"`, `"1h"`, `"7d"`. |
| `reason` | Optional. The reason du timeout. |

## Return Value

Aucune. The user est mis en timeout for the durée spécifiée.

## Examples

### Timeout de 5 minutes

```bdfd
$timeout[$mentioned[1];5m;Spam in the chat]
$sendMessage[⏳ <@$mentioned[1]> est en timeout pour 5 minutes.]
```

### Timeout d'une hour

```bdfd
$timeout[$mentioned[1];1h;Comportement toxique]
$sendMessage[⏳ Timeout d'1 hour appliqué.]
```

### Timeout de 7 days

```bdfd
$timeout[$mentioned[1];7d;Non-respect répété des règles]
$sendMessage[⏳ Timeout de 7 days appliqué. Prochaine infraction = ban.]
```

### Command de timeout modulable

```bdfd
$if[$argsCount<2]
  $sendMessage[Usage: !timeout <@mention> <durée> <reason>]
  $stop
$endif

$timeout[$mentioned[1];$message[2];$message[3]]
$sendMessage[Timeout appliqué.]
```

## Notes

- The bot doit avoir la permission `ModerateMembers`.
- The duration maximale est de 28 days (limit Discord).
- Formats de durée : `s` seconds, `m` minutes, `h` hours, `d` days.
- Pour retirer le timeout before la fin, utilisez `$unTimeout`.
- Contrairement au mute, le timeout empêche also l'envoi de messages textuels.
