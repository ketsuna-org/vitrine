---
layout: doc
title: $replyIn[]
translation_key: docs
category: "Embed & Message"
function_name: replyIn
syntax: $replyIn[duration]
description: Programme une réponse différée à un message. Le bot enverra le contenu défini après $replyIn en tant que réponse au message original après le délai spécifié.
parameters:
  - name: duration
    type: string
    required: true
    description: "Délai avant la réponse. Format : \"5s\", \"1m\", \"2h\"."
returns:
  type: void
  description: Programme l'envoi différé d'une réponse au message.
related:
  - editIn
  - deleteIn
  - editEmbedIn
  - $reply
examples:
  - description: Répondre après 5 secondes
    code: |
      $replyIn[5s]
      $sendMessage[Voici les informations demandées]
  - description: Réponse différée avec embed
    code: |
      $replyIn[10s]
      $title[Résultat]
      $description[Analyse terminée]
      $color[#5865F2]
---

# $replyIn[] — Réponse Différée

`$replyIn[]` programme l'envoi d'une réponse au message après un délai. Le contenu défini après `$replyIn[]` sera envoyé comme réponse (reply) au message original.

## Syntaxe

```
$replyIn[duration]
```

## Paramètres

| Paramètre | Obligatoire | Description |
|-----------|-------------|-------------|
| `duration` | Oui | Délai avant réponse. Format : nombre + unité. |

## Format de durée

| Format | Unité | Exemple |
|--------|-------|---------|
| `Xs` | Secondes | `3s`, `10s` |
| `Xm` | Minutes | `1m`, `5m` |
| `Xh` | Heures | `1h` |

## Valeur de retour

Programme une réponse différée. Le contenu qui suit est envoyé en tant que reply au message déclencheur.

## Utilisation

### Réponse simple différée

```bdfd
$replyIn[3s]
$sendMessage[Merci de patienter, je traite votre demande...]
```

### Information après délai

```bdfd
$replyIn[5s]
$title[Informations du serveur]
$description[**Nom :** $serverName\n**Membres :** $membersCount]
$color[#5865F2]
$footer[Demandé par $username]
```

### Simulation de traitement

```bdfd
$replyIn[2s]
$sendMessage[🔍 Recherche en cours...]
$replyIn[5s]
$sendMessage[✅ Résultat trouvé : $var[result]]
```

### Notifications planifiées

```bdfd
$replyIn[1m]
$sendMessage[⏰ Rappel : votre réunion commence dans 5 minutes !]
```

### Avec embeds

```bdfd
$replyIn[4s]
$title[Analyse terminée]
$description[Voici l'analyse demandée par $username]
$addField[Statut;Complété;yes]
$addField[Temps d'exécution;$var[exec_time]ms;yes]
$color[#27AE60]
```

## Notes

- Le message est envoyé en tant que **réponse** (reply) au message original.
- La durée maximale recommandée est de 15 minutes.
- Plusieurs `$replyIn[]` successifs enverront plusieurs réponses différées.
- Contrairement à `$editIn[]`, un nouveau message est créé, pas une édition.
- Si le message original est supprimé avant le délai, la réponse peut échouer.
