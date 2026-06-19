---
layout: doc
title: $serverName[]
translation_key: docs
category: "Entity Info"
function_name: serverName
syntax: $serverName
description: Retourne le nom du serveur (guild) dans lequel la commande est exécutée.
parameters: []
returns:
  type: string
  description: Le nom du serveur Discord.
related:
  - $guildName
  - $serverID
  - $guildID
  - $serverInfo
examples:
  - description: Afficher le nom du serveur
    code: |
      $sendMessage[Nous sommes sur le serveur **$serverName** !]
  - description: Utiliser dans un embed
    code: |
      $title[$serverName]
      $description[Bienvenue sur le serveur !]
      $color[#5865F2]
      $sendEmbedMessage
---

# $serverName[] — Nom du Serveur

`$serverName[]` retourne le nom du serveur Discord dans lequel la commande est exécutée.

## Syntaxe

```
$serverName
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- Le nom actuel du serveur.

## Utilisation

### Message de bienvenue

```bdfd
$sendMessage[Bienvenue sur **$serverName** ! Nous sommes heureux de vous compter parmi nous.]
```

### Embed avec le nom du serveur

```bdfd
$title[$serverName — Règlement]
$description[Merci de lire attentivement le règlement de $serverName.]
$color[#E74C3C]
$sendEmbedMessage
```

### Logs

```bdfd
$log[La commande a été exécutée sur le serveur : $serverName]
```

### Condition sur le nom

```bdfd
$if[$serverName==Mon Serveur]
$sendMessage[Bienvenue sur le serveur principal !]
$else
$sendMessage[Bienvenue sur $serverName !]
$endif
```

## Notes

- `$serverName[]` est un alias de `$guildName[]`.
- La valeur retournée est dynamique : elle reflète le nom actuel du serveur, même s'il a été changé récemment.
- Utile pour personnaliser les messages en fonction du serveur.
