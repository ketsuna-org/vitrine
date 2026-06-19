---
layout: doc
title: $memberCount[]
translation_key: docs
category: "Entity Info"
function_name: memberCount
syntax: $memberCount
description: Retourne le nombre total de membres (utilisateurs + bots) sur le serveur Discord.
parameters: []
returns:
  type: integer
  description: Le nombre total de membres sur le serveur.
related:
  - $membersCount
  - $onlineMembers
  - $botCount
  - $serverInfo
examples:
  - description: Afficher le nombre de membres
    code: |
      $sendMessage[Il y a $memberCount membres sur ce serveur !]
  - description: Embed info serveur
    code: |
      $title[$serverName]
      $addField[Membres;$memberCount;yes]
      $addField[En ligne;$onlineMembers;yes]
      $color[#5865F2]
      $sendEmbedMessage
---

# $memberCount[] — Nombre de Membres

`$memberCount[]` retourne le nombre total de membres présents sur le serveur Discord, incluant à la fois les utilisateurs humains et les bots.

## Syntaxe

```
$memberCount
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `integer`
- Le nombre total de membres (utilisateurs + bots).

## Utilisation

### Affichage simple

```bdfd
$sendMessage[👥 **$memberCount** membres sur ce serveur !]
```

### Embed statistiques

```bdfd
$title[📊 Statistiques de $serverName]
$addField[👥 Total membres;$memberCount;yes]
$addField[🟢 En ligne;$onlineMembers;yes]
$addField[🤖 Bots;$botCount;yes]
$addField[👤 Humains;$sub[$memberCount;$botCount];yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Message de bienvenue personnalisé

```bdfd
$sendMessage[Bienvenue $username ! Tu es le **$memberCount**ème membre ! 🎉]
```

### Condition de taille

```bdfd
$if[$memberCount>=1000]
$sendMessage[🌟 Ce serveur a plus de 1000 membres !]
$elseIf[$memberCount>=100]
$sendMessage[👍 Ce serveur a plus de 100 membres.]
$else
$sendMessage[🌱 Ce serveur est encore petit mais en croissance !]
$endif
```

### Jalon (milestone)

```bdfd
$if[$memberCount==100]
$sendMessage[🎉 **100 MEMBRES !** Félicitations à toute la communauté !]
$elseIf[$memberCount==500]
$sendMessage[🚀 **500 MEMBRES !** Merci à tous pour votre soutien !]
$elseIf[$memberCount==1000]
$sendMessage[🌟 **1000 MEMBRES !** Quel cap incroyable !]
$endif
```

## Notes

- `$memberCount[]` et `$membersCount[]` sont identiques.
- Le compte inclut tous les membres, y compris les bots.
- Pour obtenir uniquement le nombre d'humains, faites `$sub[$memberCount;$botCount]`.
- Pour obtenir le nombre de membres en ligne, utilisez `$onlineMembers[]`.
