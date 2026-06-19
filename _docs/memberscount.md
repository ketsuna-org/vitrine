---
layout: doc
title: $membersCount[]
translation_key: docs
category: "Entity Info"
function_name: membersCount
syntax: $membersCount
description: Retourne le nombre total de membres sur le serveur Discord. Identique à $memberCount.
parameters: []
returns:
  type: integer
  description: Le nombre total de membres (utilisateurs + bots).
related:
  - $memberCount
  - $onlineMembers
  - $botCount
examples:
  - description: Afficher le nombre de membres
    code: |
      $sendMessage[$membersCount membres sur ce serveur !]
  - description: Embed statistiques
    code: |
      $title[$serverName]
      $addField[Membres;$membersCount;yes]
      $color[#5865F2]
      $sendEmbedMessage
---

# $membersCount[] — Nombre de Membres

`$membersCount[]` retourne le nombre total de membres sur le serveur Discord. Cette fonction est strictement identique à `$memberCount[]`.

## Syntaxe

```
$membersCount
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `integer`
- Le nombre total de membres.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[👥 **$membersCount** membres !]
```

### Embed statistiques

```bdfd
$title[📊 $serverName]
$addField[👥 Membres;$membersCount;yes]
$addField[🟢 En ligne;$onlineMembers;yes]
$addField[🤖 Bots;$botCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Comparaison

```bdfd
$if[$membersCount>$var[previousCount]]
$sendMessage[📈 Le serveur a gagné des membres !]
$endif
```

## Notes

- `$membersCount[]` et `$memberCount[]` sont interchangeables.
- Inclut à la fois les humains et les bots.
- Pour le décompte humains seuls, utilisez `$sub[$membersCount;$botCount]`.
