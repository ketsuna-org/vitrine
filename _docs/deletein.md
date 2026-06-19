---
layout: doc
title: $deleteIn[]
translation_key: docs
category: "Embed & Message"
function_name: deleteIn
syntax: $deleteIn[duration]
description: Programme la suppression automatique of a message after a delay spécifié. The message is deleted par the bot once le delay écoulé.
---

# $deleteIn[] — Suppression Différée de Message

`$deleteIn[]` programme la suppression automatique of the message after a delay donné. Idéal for notifications temporarys, messages éphémères, or nettoyage automatique.

## Syntax

```
$deleteIn[duration]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `duration` | Yes | Delay before suppression. Format : number + unité. |

## Format de durée

| Format | Unité | Example |
|--------|-------|---------|
| `Xs` | Secondes | `5s`, `30s`, `60s` |
| `Xm` | Minutes | `1m`, `5m`, `15m` |
| `Xh` | Times | `1h`, `2h` |

## Return value

Programme la suppression différée of the message. The message is deleted automatically à l'échéance.

## Usage

### Notification temporary

```bdfd
$sendMessage[✅ Command executede avec success]
$deleteIn[5s]
```

### Message error éphémère

```bdfd
$sendMessage[❌ Error : Vous n'avez pas the permission requirede]
$deleteIn[10s]
```

### Alerte qui s'efface

```bdfd
$sendMessage[🔔 New mise à day available !]
$deleteIn[30s]
```

### Avec embeds

```bdfd
$title[Message temporary]
$description[Ce contenu disparaîtra dans 10 seconds]
$color[#E74C3C]
$footer[Auto-suppression...]
$deleteIn[10s]
```

### Bienvenue éphémère

```bdfd
$sendMessage[Bienvenue $username ! Pensez à lire le règlement.]
$deleteIn[1m]
```

## Notes

- `$deleteIn[]` deletes the message **courant** (celui qui vient d'être sent).
- The duration maximale est generally de 15 minutes.
- Une fois programmée, la suppression cannot être annulée.
- La suppression échoue silencieusement if the bot does not have the permission `MANAGE_MESSAGES`.
- Combinez avec `$sendMessage` for messages auto-destructeurs.
