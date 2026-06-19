---
layout: doc
title: $onlineMembers[]
translation_key: docs
category: "Entity Info"
function_name: onlineMembers
syntax: $onlineMembers
description: Retourne le nombre de membres actuellement en ligne sur le serveur Discord (statut "en ligne", "inactif" ou "ne pas déranger").
---

# $onlineMembers[] — Membres en Ligne

`$onlineMembers[]` retourne le nombre de membres actuellement en ligne sur le serveur. Sont considérés comme "en ligne" les membres avec les statuts En ligne, Inactif (idle) et Ne pas déranger (dnd).

## Syntaxe

```
$onlineMembers
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `integer`
- Le nombre de membres en ligne.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🟢 **$onlineMembers** membres en ligne sur $onlineMembers/$membersCount]
```

### Embed statistiques

```bdfd
$title[📊 Activité sur $serverName]
$addField[🟢 En ligne;$onlineMembers;yes]
$addField[👥 Total;$membersCount;yes]
$addField[📊 Ratio;$round[$multi[$divide[$onlineMembers;$membersCount];100]]%;yes]
$thumbnail[$serverIcon]
$color[#2ECC71]
$sendEmbedMessage
```

### Calcul du taux d'activité

```bdfd
$var[activityRate;$round[$multi[$divide[$onlineMembers;$membersCount];100]]]
$if[$var[activityRate]>=50]
$sendMessage[🔥 $var[activityRate]% des membres sont en ligne !]
$else
$sendMessage[💤 Seulement $var[activityRate]% des membres sont en ligne.]
$endif
```

### Dashboard minimal

```bdfd
$title[📋 Dashboard — $serverName]
$addField[🟢 En ligne;$onlineMembers;yes]
$addField[👥 Total;$membersCount;yes]
$addField[🤖 Bots;$botCount;yes]
$addField[🚀 Boosts;$serverBoostCount;yes]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- Inclut les statuts "en ligne", "inactif" (idle) et "ne pas déranger" (dnd).
- N'inclut pas les membres invisibles (offline/statut invisible) — Discord ne les expose pas.
- Utile pour évaluer l'activité en temps réel du serveur.
- Pour le ratio, faites `$onlineMembers / $membersCount * 100`.
