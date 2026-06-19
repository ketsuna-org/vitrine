---
layout: doc
title: $executionTime
translation_key: docs
category: "Entity Info"
function_name: executionTime
syntax: $executionTime
description: Returns the time of execution of the current command in milliseconds. Allows mesurer les performance of the BDFD code.
---

# $executionTime

The `$executionTime` function **mesurer the time of execution** total of the command in progress, in milliseconds.

## Syntax

```
$executionTime
```

## Parameters

No parameters.

## Return value

- **Type** : String (number)
- Le temps of execution in milliseconds (ms).
- Inclut the time of traitement of the whole of the command (parsing + execution).

## Behavior

- Mesure the time écoulé since the beginning of the processing of the command up to the call of la function.
- Utile for the debugging and the optimization of performance.
- La value est an integer representing les milliseconds.

## Examples

### Simple display

```bdfd
$title[⚡ Performance]
$description[
**Temps of execution :** $executionTime ms
**Ping API :** $botPing ms
]
$color[#5865F2]
$sendMessage[]
```

### Dynamic footer

```bdfd
$title[📊 Statistiques]
$description[Command complex with beaucoup of datas...]
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

- Le temps measured dépend of la complexité of the command and of la latency network.
- `$executionTime` mesure the time côté bot, not the latency user.
- For the latency WebSocket/API, use `$botPing` or `$ping`.
