---
layout: doc
title: $shardID[]
translation_key: docs
category: "Entity Info"
function_name: shardID
syntax: $shardID
description: Retourne l'identifiant du shard actuel sur lequel la commande est exécutée. Les shards sont utilisés pour répartir la charge des bots sur de nombreux serveurs.
---

# $shardID[] — Identifiant du Shard

`$shardID[]` retourne l'identifiant du shard Discord sur lequel le bot exécute la commande. Le sharding est une technique utilisée par Discord pour répartir la charge des bots populaires sur plusieurs processus.

## Syntaxe

```
$shardID
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `integer`
- L'ID du shard courant, commençant à 0.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🔢 Shard : **$shardID**]
```

### Statistiques du bot

```bdfd
$title[📊 Statistiques du Bot]
$addField[🔢 Shard;$shardID;yes]
$addField[🌐 Serveurs (ce shard);$serverCount;yes]
$addField[📶 Ping;$ping ms;yes]
$color[#2ECC71]
$sendEmbedMessage
```

### Log avec shard

```bdfd
$log[Shard $shardID — Commande exécutée sur $serverName]
```

### Debug

```bdfd
$title[🐛 Debug Info]
$addField[Shard;$shardID;yes]
$addField[Serveur;$serverName ($serverID);yes]
$addField[Salon;$channelID;yes]
$addField[Utilisateur;$username ($authorID);yes]
$color[#E74C3C]
$sendEmbedMessage
```

## Notes

- Si votre bot n'est pas shardé (moins de ~2500 serveurs), `$shardID[]` retournera probablement `0`.
- Le sharding devient nécessaire lorsque le bot atteint un grand nombre de serveurs (plus de 2500).
- Chaque shard gère un sous-ensemble des serveurs du bot.
- L'ID de shard est utile pour le débogage et l'identification de problèmes sur des shards spécifiques.
- Les commandes sont toujours exécutées dans le contexte d'un seul shard.
