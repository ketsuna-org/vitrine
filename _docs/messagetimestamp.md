---
layout: doc
title: $messageTimestamp
translation_key: docs
category: "Entity Info"
function_name: messageTimestamp
syntax: $messageTimestamp
description: Returns the timestamp (timestamp) of création of the message déclencheur.
---

# $messageTimestamp

The function `$messageTimestamp` retourne le **timestamp** (timestamp) of création of the message déclencheur, en milliseconds dethen l'époque Unix.

## Syntax

```
$messageTimestamp
```

## Parameters

Aucun parameter.

## Return Value

| Type | Description |
|---|---|
| `integer` | Timestamp Unix en milliseconds. |

## Examples

### Display le timestamp brut

```bdfd
$sendMessage[Timestamp of the message : $messageTimestamp]
```

### Formater la date

```bdfd
$sendMessage[Message sent le $formatDate[$messageTimestamp;DD/MM/YYYY to HH:mm:ss]]
```

### Calculer l'âge of the message

```bdfd
$sendMessage[Âge of the message : $truncate[$sub[$dateNow;$messageTimestamp]/1000] seconds.]
```

### Display en format relatif Discord

```bdfd
$sendMessage[Message sent <t:$truncate[$messageTimestamp/1000]:R>]
```

## Notes

- Le timestamp est retourné en **milliseconds**. Divisez par `1000` pour obtenir seconds.
- À use with `$formatDate` for a affichage lisible.
- `$dateNow` retourne le timestamp current, utile pour calculer durées.
- Pour le timestamp of édition, utilisez `$messageEditedTimestamp`.
