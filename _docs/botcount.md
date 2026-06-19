---
layout: doc
title: $botCount[]
translation_key: docs
category: "Entity Info"
function_name: botCount
syntax: $botCount
description: Retourne le nombre de bots présents sur le serveur Discord.
---

# $botCount[] — Nombre de Bots

`$botCount[]` retourne le nombre de comptes bots présents sur le serveur Discord.

## Syntaxe

```
$botCount
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `integer`
- Le nombre de bots sur le serveur.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🤖 **$botCount** bots sur ce serveur.]
```

### Ratio humains/bots

```bdfd
$var[humans;$sub[$membersCount;$botCount]]
$title[📊 Composition de $serverName]
$addField[👤 Humains;$var[humans];yes]
$addField[🤖 Bots;$botCount;yes]
$addField[👥 Total;$membersCount;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Alerte si trop de bots

```bdfd
$if[$botCount>$var[humans]]
$sendMessage[⚠️ Il y a plus de bots ($botCount) que d'humains ($var[humans]) !]
$endif
```

### Embed statistiques complet

```bdfd
$title[📊 Statistiques de $serverName]
$addField[👥 Total;$membersCount;yes]
$addField[👤 Humains;$sub[$membersCount;$botCount];yes]
$addField[🤖 Bots;$botCount;yes]
$addField[🟢 En ligne;$onlineMembers;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- Un "bot" est déterminé par le flag `bot` défini sur le compte utilisateur Discord.
- Pour obtenir le nombre d'humains, soustrayez `$botCount` du total : `$sub[$membersCount;$botCount]`.
- Le bot comptant lui-même est inclus dans ce total.
