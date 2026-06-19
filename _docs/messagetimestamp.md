---
layout: doc
title: $messageTimestamp
translation_key: docs
category: "Entity Info"
function_name: messageTimestamp
syntax: $messageTimestamp
description: Returns the timestamp (timestamp) de création of the message déclencheur.
---

# $messageTimestamp

The function `$messageTimestamp` retourne le **timestamp** (timestamp) de création of the message déclencheur, en milliseconds dethen l'époque Unix.

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

### Afficher le timestamp brut

```bdfd
$sendMessage[Timestamp of the message : $messageTimestamp]
```

### Formater la date

```bdfd
$sendMessage[Message sent le $formatDate[$messageTimestamp;DD/MM/YYYY à HH:mm:ss]]
```

### Calculer l'âge of the message

```bdfd
$sendMessage[Âge of the message : $truncate[$sub[$dateNow;$messageTimestamp]/1000] seconds.]
```

### Afficher en format relatif Discord

```bdfd
$sendMessage[Message sent <t:$truncate[$messageTimestamp/1000]:R>]
```

## Notes

- Le timestamp est retourné en **milliseconds**. Divisez par `1000` pour obtenir des seconds.
- À utiliser avec `$formatDate` for a affichage lisible.
- `$dateNow` retourne le timestamp current, utile pour calculer des durées.
- Pour le timestamp d'édition, utilisez `$messageEditedTimestamp`.
