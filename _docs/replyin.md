---
layout: doc
title: $replyIn[]
translation_key: docs
category: "Embed & Message"
function_name: replyIn
syntax: $replyIn[duration]
description: Programme une response différée to un message. The bot enverra le contenu défini after $replyIn as response to the message original after le delay spécifié.
---

# $replyIn[] — Response Différée

`$replyIn[]` programme l'envoi of une response to the message after un delay. The contenu défini after `$replyIn[]` sera sent like response (reply) to the message original.

## Syntax

```
$replyIn[duration]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `duration` | Yes | Delay before response. Format : number + unité. |

## Format of durée

| Format | Unité | Exemple |
|--------|-------|---------|
| `Xs` | Secondes | `3s`, `10s` |
| `Xm` | Minutes | `1m`, `5m` |
| `Xh` | Times | `1h` |

## Return Value

Programme une response différée. The contenu qui suit est sent as reply to the message déclencheur.

## Utilisation

### Response simple différée

```bdfd
$replyIn[3s]
$sendMessage[Merci of patienter, je traite votre demande...]
```

### Information after delay

```bdfd
$replyIn[5s]
$title[Informations of the server]
$description[**Nom :** $serverName\n**Members :** $membersCount]
$color[#5865F2]
$footer[Demandé par $username]
```

### Simulation of traitement

```bdfd
$replyIn[2s]
$sendMessage[🔍 Recherche in progress...]
$replyIn[5s]
$sendMessage[✅ Result found : $var[result]]
```

### Notifications planifiées

```bdfd
$replyIn[1m]
$sendMessage[⏰ Rcall : votre réunion commence in 5 minutes !]
```

### Avec embeds

```bdfd
$replyIn[4s]
$title[Analyse terminée]
$description[Voici l'analyse demandée par $username]
$addField[Status;Complété;yes]
$addField[Temps of exécution;$var[exec_time]ms;yes]
$color[#27AE60]
```

## Notes

- The message est sent as **response** (reply) to the message original.
- The duration maximale recommendede est of 15 minutes.
- Plusieurs `$replyIn[]` successifs enverront several responses différées.
- Contrairement to `$editIn[]`, un new message est created, pas une édition.
- Si the message original est deleted before le delay, the response peut échouer.
