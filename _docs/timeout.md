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

The function `$timeout` **met un user en timeout** on Discord. Pendant the duration spécifiée, the user ne peut ni envoyer of messages, ni parler en vocal, ni réagir. The bot doit avoir la permission `ModerateMembers`.

## Syntax

```
$timeout[userID;duration;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user. Required. |
| `duration` | Duration of the timeout. Required. Formats acceptés : `s` (seconds), `m` (minutes), `h` (hours), `d` (days). Examples: `"60s"`, `"5m"`, `"1h"`, `"7d"`. |
| `reason` | Optional. The reason of the timeout. |

## Return Value

Aucune. The user est mis en timeout for the durée spécifiée.

## Examples

### Timeout of 5 minutes

```bdfd
$timeout[$mentioned[1];5m;Spam in the chat]
$sendMessage[⏳ <@$mentioned[1]> est en timeout pour 5 minutes.]
```

### Timeout of une hour

```bdfd
$timeout[$mentioned[1];1h;Comportement toxique]
$sendMessage[⏳ Timeout of 1 hour appliqué.]
```

### Timeout of 7 days

```bdfd
$timeout[$mentioned[1];7d;Non-respect répété règles]
$sendMessage[⏳ Timeout of 7 days appliqué. Prochaine infraction = ban.]
```

### Command of timeout modulable

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
- The duration maximale est of 28 days (limit Discord).
- Formats of durée : `s` seconds, `m` minutes, `h` hours, `d` days.
- Pour retirer le timeout before la fin, utilisez `$unTimeout`.
- Contrairement to the mute, le timeout empêche also l'envoi of messages textuels.
