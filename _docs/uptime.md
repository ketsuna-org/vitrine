---
layout: doc
title: $uptime[]
translation_key: docs
category: "Misc"
function_name: uptime
syntax: $uptime
description: Retourne la durée écoulée depuis le démarrage du bot.
---

# $uptime[]

La fonction `$uptime[]` retourne la durée écoulée depuis le dernier démarrage (ou redémarrage) du bot.

## Syntaxe

```
$uptime
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Valeur de retour

Une chaîne de caractères formatée indiquant la durée de fonctionnement, par exemple :

- `2 heures, 15 minutes, 30 secondes`
- `3 jours, 5 heures, 42 minutes`
- `45 secondes`

Le format exact peut varier selon la durée.

## Exemples

### Uptime simple

```bdfd
Le bot est en ligne depuis $uptime.
```

### Embed de statut

```bdfd
$title[📊 Statut du Bot]
$addField[⏱️ Uptime;$uptime]
$addField[🏓 Ping;$ping ms]
$color[#5865F2]
```

### Commande info complète

```bdfd
$title[🤖 Informations]
$description[
**Uptime :** $uptime
**Ping :** $ping ms
**Serveurs :** $guildCount
**Utilisateurs :** $allMembersCount
]
```

## Notes

- L'uptime est réinitialisé à chaque redémarrage du bot.
- Le format de sortie est automatiquement adapté à la durée (secondes, minutes, heures, jours).
- Pour la latence du bot, utilisez `$ping[]`.
