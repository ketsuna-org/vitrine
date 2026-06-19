---
layout: doc
title: $executionTime
translation_key: docs
category: "Entity Info"
function_name: executionTime
syntax: $executionTime
description: Returns the time d'execution of the current command in milliseconds. Allows mesurer les performance of the BDFD code.
---

# $executionTime

The `$executionTime` function **mesurer the time d'execution** total of the command in progress, in milliseconds.

## Syntax

```
$executionTime
```

## Parameters

No parameters.

## Return value

- **Type** : String (number)
- Le temps d'execution in milliseconds (ms).
- Inclut the time de traitement de the whole of the command (parsing + execution).

## Behavior

- Mesure the time écoulé since the beginning of the processing of the command up to the call de la function.
- Utile for the debugging and the optimization of performance.
- La value est an integer representing les milliseconds.

## Examples

### Simple display

```bdfd
$title[⚡ Performance]
$description[
**Temps d'execution :** $executionTime ms
**Ping API :** $botPing ms
]
$color[#5865F2]
$sendMessage[]
```

### Dynamic footer

```bdfd
$title[📊 Statistiques]
$description[Command complex avec beaucoup de datas...]
$footer[⏱️ Executed en $executionTime ms]
$color[#57F287]
$sendMessage[]
```

### Slowness condition

```bdfd
$if[$executionTime>1000]
  $sendMessage[⚠️ Cette command est slowe (>1s). Optimization recommendede.]
$else
  $sendMessage[✅ Performance normale : $executionTime ms]
$endif
```

## Notes

- Le temps measured dépend de la complexité of the command and de la latency network.
- `$executionTime` mesure the time côté bot, not the latency user.
- For the latency WebSocket/API, use `$botPing` or `$ping`.
