---
layout: doc
title: $ping[]
translation_key: docs
category: "Misc"
function_name: ping
syntax: $ping
description: Retourne la latence WebSocket du bot en millisecondes.
parameters: []
returns:
  - type: number (string)
    description: La latence WebSocket du bot en millisecondes (ms).
related:
  - $uptime[]
examples:
  - description: Afficher le ping du bot
    code: $ping
  - description: Embed affichant la latence
    code: |
      $title[🏓 Pong !]
      $description[Latence : **$ping ms**]
      $color[#00FF00]
  - description: Message conditionnel selon la latence
    code: |
      $if[$ping<100]
      🟢 Excellente connexion ($ping ms)
      $elseif[$ping<200]
      🟡 Connexion correcte ($ping ms)
      $else
      🔴 Latence élevée ($ping ms)
      $endif
---

# $ping[]

La fonction `$ping[]` retourne la latence WebSocket actuelle du bot, exprimée en millisecondes (ms). Cette valeur représente le temps de communication entre le bot et les serveurs Discord.

## Syntaxe

```
$ping
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Valeur de retour

Un nombre représentant la latence WebSocket en millisecondes.

## Interprétation

| Latence | État |
|---------|------|
| < 100 ms | Excellente |
| 100-200 ms | Bonne |
| 200-400 ms | Moyenne |
| > 400 ms | Élevée |

## Exemples

### Commande ping simple

```bdfd
🏓 Pong ! Latence : $ping ms
```

### Embed détaillé

```bdfd
$title[🏓 Pong !]
$description[Latence WebSocket : **$ping ms**]
$color[$if[$ping<100]#00FF00$elseif[$ping<200]#FFFF00$else#FF0000$endif]
$footer[🤖 $username]
```

### Indicateur visuel

```bdfd
$if[$ping<100]
🟢 | $ping ms
$elseif[$ping<200]
🟡 | $ping ms
$else
🔴 | $ping ms
$endif
```

## Notes

- Il s'agit de la latence **WebSocket** (connexion temps réel), pas du temps de réponse HTTP.
- La latence peut varier selon la charge des serveurs Discord et la localisation du serveur hébergeant le bot.
- Pour connaître la durée de fonctionnement du bot, utilisez `$uptime[]`.
