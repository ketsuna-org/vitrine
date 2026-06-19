---
layout: doc
title: $slowmode
translation_key: docs
category: "Entity Info"
function_name: slowmode
syntax: $slowmode[(channelID)]
description: Returns the delay of slowmode (mode slow) current of a channel Discord, en seconds. Function en lecture seule (getter).
---

# $slowmode

The function `$slowmode` retourne le **delay of slowmode** (mode slow) current of a channel Discord, exprimé en seconds. C'est une function en **lecture seule** (getter).

## Syntax

```
$slowmode[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the channel cible. Si omitted, the channel courant is used. |

## Return Value

| Type | Description |
|---|---|
| `integer` | Le delay en seconds. `0` signifie pas of slowmode. |

## Values possibles

Discord autorise les slowmodes nexts (en seconds) : `0`, `5`, `10`, `15`, `30`, `60`, `120`, `300`, `600`, `900`, `1800`, `3600`, `7200`, `21600`.

## Examples

### Display le slowmode

```bdfd
$sendMessage[Mode slow current : $slowmode second(s)]
```

### Vérifier if the slowmode est actif

```bdfd
$if[$slowmode>0]
  $sendMessage[⏳ Ce channel a un mode slow of $slowmode second(s).]
$else
  $sendMessage[Pas of mode slow in ce channel.]
$endif
```

### Alerter si slowmode élevé

```bdfd
$if[$slowmode>=300]
  $sendMessage[⚠️ Attention, ce channel a un slowmode très élevé ($slowmode seconds).]
$endif
```

## Notes

- `$slowmode` est un **getter** : il ne modifie pas le slowmode.
- Returns `0` si the channel n'a pas of slowmode.
- Ne functionne que on the channels textuels.
