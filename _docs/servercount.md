---
layout: doc
title: $serverCount[]
translation_key: docs
category: "Entity Info"
function_name: serverCount
syntax: $serverCount
description: Retourne le nombre total de serveurs dans lesquels le bot est présent.
---

# $serverCount[] — Nombre de Serveurs du Bot

`$serverCount[]` retourne le nombre total de serveurs Discord sur lesquels le bot est installé.

## Syntaxe

```
$serverCount
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `integer`
- Le nombre de serveurs auxquels le bot appartient.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🤖 Je suis actuellement sur **$serverCount** serveurs !]
```

### Statistiques du bot

```bdfd
$title[📊 Statistiques du Bot]
$addField[🌐 Serveurs;$serverCount;yes]
$addField[🔢 Shard;$shardID;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Message de statut personnalisé

```bdfd
$title[🤖 Mon Bot]
$description[Merci de m'utiliser !]
$addField[Serveurs;$serverCount;yes]
$addField[Latence;$ping ms;yes]
$footer[Développé avec BDFD]
$color[#2ECC71]
$sendEmbedMessage
```

### Condition sur la popularité

```bdfd
$if[$serverCount>=100]
$sendMessage[🎉 Merci aux $serverCount serveurs qui me font confiance !]
$else
$sendMessage[Je suis sur $serverCount serveurs. Aidez-moi à grandir !]
$endif
```

## Notes

- `$serverCount[]` est un alias de `$guildCount[]`.
- Le compte inclut tous les serveurs où le bot est présent, quel que soit le shard.
- Le nombre est mis à jour automatiquement lorsque le bot rejoint ou quitte un serveur.
- Utile pour les commandes de statistiques et les pages "À propos" du bot.
