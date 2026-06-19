---
layout: doc
title: $serverNames[]
translation_key: docs
category: "Entity Info"
function_name: serverNames
syntax: $serverNames
description: Retourne la liste des noms de tous les serveurs dans lesquels le bot est présent, séparés par des virgules.
parameters: []
returns:
  type: string (liste)
  description: Une chaîne contenant les noms de tous les serveurs du bot, séparés par des virgules.
related:
  - $serverCount
  - $guildCount
  - $serverName
  - $guildName
examples:
  - description: Afficher tous les noms de serveurs
    code: |
      $sendMessage[Serveurs : $serverNames]
  - description: Vérifier si le bot est sur un serveur spécifique
    code: |
      $if[$serverNames$contains[Mon Serveur]]
      $sendMessage[Le bot est sur Mon Serveur !]
      $endif
---

# $serverNames[] — Noms de Tous les Serveurs

`$serverNames[]` retourne la liste complète des noms de tous les serveurs Discord sur lesquels le bot est installé.

## Syntaxe

```
$serverNames
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- Une chaîne contenant tous les noms de serveurs, séparés par des virgules (ex: `"Serveur A, Serveur B, Serveur C"`).

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🌐 Mes serveurs : $serverNames]
```

### Embed liste des serveurs

```bdfd
$title[🌐 Serveurs du Bot]
$description[$serverNames]
$footer[Total : $serverCount serveurs]
$color[#5865F2]
$sendEmbedMessage
```

### Vérifier la présence sur un serveur

```bdfd
$if[$serverNames$contains[Communauté Gaming]]
$sendMessage[✅ Le bot est bien sur la Communauté Gaming !]
$else
$sendMessage[❌ Le bot n'est pas sur la Communauté Gaming.]
$endif
```

### Statistiques avec liste

```bdfd
$title[📊 Bot Statistics]
$addField[🌐 Total serveurs;$serverCount;yes]
$addField[📋 Liste;$serverNames;no]
$addField[🔢 Shard;$shardID;yes]
$color[#2ECC71]
$sendEmbedMessage
```

## Notes

- La liste peut être très longue si le bot est sur de nombreux serveurs — attention à la limite de 2000 caractères par message Discord.
- Les noms sont séparés par `", "` (virgule + espace).
- Pour le nombre total sans la liste, utilisez `$serverCount[]`.
- Utilisez `$contains[]` pour vérifier la présence d'un nom spécifique, mais attention aux noms partiels.
- Les noms peuvent contenir des caractères spéciaux et des emojis.
