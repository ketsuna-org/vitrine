---
layout: doc
title: $messageEditedTimestamp
translation_key: docs
category: "Entity Info"
function_name: messageEditedTimestamp
syntax: $messageEditedTimestamp
description: Returns the timestamp de la last édition of the message déclencheur, or une string vide si non édité.
---

# $messageEditedTimestamp

The function `$messageEditedTimestamp` retourne le **timestamp de la last édition** of the message déclencheur. Si the message n'a never été édité, elle retourne une string vide.

## Syntax

```
$messageEditedTimestamp
```

## Parameters

Aucun parameter.

## Return Value

| Type | Description |
|---|---|
| `integer` or `""` | Timestamp en milliseconds, or string vide si the message n'a pas été édité. |

## Examples

### Afficher la date d'édition

```bdfd
$if[$messageEditedTimestamp!=]
  $sendMessage[Message édité le $formatDate[$messageEditedTimestamp;DD/MM/YYYY à HH:mm]]
$else
  $sendMessage[Message original (non édité).]
$endif
```

### Afficher en format relatif

```bdfd
$if[$messageEditedTimestamp!=]
  $sendMessage[Édité <t:$truncate[$messageEditedTimestamp/1000]:R>]
$endif
```

### Log des éditions

```bdfd
$if[$messageEditedTimestamp!=]
  $channelSendMessage[$channelIDFromName[logs];$username a édité son message (ID: $messageID) le $formatDate[$messageEditedTimestamp;DD/MM/YYYY HH:mm]]
$endif
```

## Notes

- Returns ae string **vide** (`""`) si never édité, pas `0`.
- Utilisez `$isMessageEdited` for a test booléadditionally simple.
- Le timestamp est en milliseconds ; divisez par `1000` for the seconds.
