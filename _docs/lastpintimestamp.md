---
layout: doc
title: $lastPinTimestamp
translation_key: docs
category: "Entity Info"
function_name: lastPinTimestamp
syntax: $lastPinTimestamp[(channelID)]
description: Returns the timestamp du last message épinglé in the channel courant or spécifié.
---

# $lastPinTimestamp

The function `$lastPinTimestamp` retourne le **timestamp du last message épinglé** dans un channel Discord. Si no message n'est épinglé, elle retourne une string vide.

## Syntax

```
$lastPinTimestamp[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the channel cible. Si omis, the channel courant is used. |

## Return Value

| Type | Description |
|---|---|
| `integer` or `""` | Timestamp en milliseconds du last pin, or string vide si no. |

## Examples

### Afficher la date du last pin

```bdfd
$if[$lastPinTimestamp!=]
  $sendMessage[Dernier message épinglé le $formatDate[$lastPinTimestamp;DD/MM/YYYY à HH:mm]]
$else
  $sendMessage[Aucun message épinglé dans ce channel.]
$endif
```

### Format relatif Discord

```bdfd
$if[$lastPinTimestamp!=]
  $sendMessage[Dernier pin <t:$truncate[$lastPinTimestamp/1000]:R>]
$endif
```

### Vérifier un autre channel

```bdfd
$if[$lastPinTimestamp[123456789012345678]!=]
  $sendMessage[The channel a des messages épinglés.]
$endif
```

## Notes

- Le timestamp est en **milliseconds** (divisez par 1000 for the seconds).
- Returns ae string vide (`""`) si no message n'est épinglé.
- Utile pour vérifier l'activité d'épinglage dans un channel.
