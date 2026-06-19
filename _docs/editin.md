---
layout: doc
title: $editIn[]
translation_key: docs
category: "Embed & Message"
function_name: editIn
syntax: $editIn[duration;(messageId)]
description: Programme l'édition of a message after a delay spécifié. The message current will be replaced par le new contenu set after le delay.
---

# $editIn[] — Édition Différée de Message

`$editIn[]` programme l'édition automatique of a message after a delay donné. This is utile to create of messages qui se mettent à day, des compteurs, or transitions d'state.

## Syntax

```
$editIn[duration;(messageId)]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `duration` | Yes | Delay before édition. Format : number + unité (`s`, `m`, `h`). |
| `messageId` | No | ID of the message cible. If omitted, the message courant. |

## Format de durée

| Format | Unité | Example |
|--------|-------|---------|
| `Xs` | Secondes | `5s`, `30s` |
| `Xm` | Minutes | `1m`, `10m` |
| `Xh` | Times | `1h`, `2h` |

## Return value

Programme l'édition différée. The new contenu est set after the call à `$editIn[]`.

## Usage

### Indicateur de chargement

```bdfd
$sendMessage[⏳ Traitement in progress...]
$editIn[3s]
$sendMessage[✅ Traitement terminé !]
```

### Counts à rebours

```bdfd
$sendMessage[Début dans 5 seconds...]
$editIn[1s]
$sendMessage[Début dans 4 seconds...]
$editIn[2s]
$sendMessage[Début dans 3 seconds...]
$editIn[3s]
$sendMessage[Début dans 2 seconds...]
$editIn[4s]
$sendMessage[Début dans 1 second...]
$editIn[5s]
$sendMessage[🚀 This is parti !]
```

### Mise à day after action

```bdfd
$sendMessage[Recherche in progress... 🔍]
$editIn[2s]
$title[Results de recherche]
$description[3 results founds pour "$var[query]"]
$color[#5865F2]
```

### Avec messageId spécifique

```bdfd
$var[msgId;$sendMessage[Status : En attente...;yes]]
$editIn[10s;$var[msgId]]
$sendMessage[Status : Complété ✅]
```

## Notes

- The duration maximale est generally de 15 minutes (limitation BDFD/Discord).
- Le contenu after `$editIn[]` remplace entièrement le contenu of the message cible.
- Si `messageId` est omis, the message in progress d'envoi est ciblé.
- Pour éditer only the embed without toucher au text, use `$editEmbedIn[]`.
