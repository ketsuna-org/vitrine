---
layout: doc
title: $guildCount[]
translation_key: docs
category: "Entity Info"
function_name: guildCount
syntax: $guildCount
description: Alias de $serverCount. Retourne le nombre total de serveurs dans lesquels le bot est présent.
---

# $guildCount[] — Nombre de Serveurs (Alias)

`$guildCount[]` est un alias de `$serverCount[]`. Il retourne le nombre total de serveurs Discord sur lesquels le bot est installé.

## Syntaxe

```
$guildCount
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `integer`
- Le nombre de serveurs auxquels le bot appartient.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🤖 Présent sur **$guildCount** serveurs !]
```

### Statistiques du bot

```bdfd
$title[📊 Statistiques du Bot]
$addField[🌐 Guildes;$guildCount;yes]
$addField[🔢 Shard;$shardID;yes]
$addField[📶 Ping;$ping ms;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Condition de popularité

```bdfd
$if[$guildCount>=50]
$sendMessage[🎉 +$guildCount serveurs ! Merci à tous !]
$else
$sendMessage[Bot présent sur $guildCount serveurs.]
$endif
```

## Notes

- `$guildCount[]` et `$serverCount[]` sont strictement identiques.
- Le compte est global (tous les shards confondus).
- Se met à jour automatiquement lors des joins/leaves du bot.
