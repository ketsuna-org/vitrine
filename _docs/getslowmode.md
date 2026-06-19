---
layout: doc
title: $getSlowmode
translation_key: docs
category: "Server & Channels"
function_name: getSlowmode
syntax: $getSlowmode[(channelID)]
description: Gets the value of the mode slow (slowmode) of un canal, en seconds. Returns the delay minimum between two messages.
---
# $getSlowmode

The function `$getSlowmode[]` retourne la **value of the mode slow** (slowmode) of un canal, en seconds.

## Syntax

```
$getSlowmode[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | *(Optional)* ID of the canal. Default: canal courant. |

## Return Value

- **Type** : Number (string)
- Le slowmode en seconds (`0`, `5`, `10`, `15`, `30`, `60`, `120`, `300`, `600`, `900`, `1800`, `3600`, `7200`, `21600`).

## Examples

### Vérification simple

```bdfd
$sendMessage[Slowmode current : $getSlowmode seconds]
```

### Compareason

```bdfd
$if[$getSlowmode==0]
  $sendMessage[Ce canal n'a pas of slowmode.]
$else
  $sendMessage[Ce canal a un slowmode of $getSlowmode seconds.]
$endif
```

### Vérifier un autre canal

```bdfd
$sendMessage[Slowmode of the canal of logs : $getSlowmode[123456789]s]
```

### Alerte si slowmode actif

```bdfd
$if[$getSlowmode>0]
  $title[⏱️ Canal en slowmode]
  $description[Le canal <#$channelID> a un slowmode of **$getSlowmode seconds**.]
  $color[#FEE75C]
  $sendMessage[]
$endif
```

## Notes

- `0` signifie slowmode désenabled.
- Les values possibles sont limitées par Discord (5s, 10s, 15s, 30s, 1m, 2m, 5m, 10m, 15m, 30m, 1h, 2h, 6h).
- Pour modifier le slowmode, utilisez `$modifyChannel[]`.
