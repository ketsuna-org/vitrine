---
layout: doc
title: $slashCommandsCount
translation_key: docs
category: "Entity Info"
function_name: slashCommandsCount
syntax: $slashCommandsCount
description: Retourne le nombre de commandes slash enregistrées sur le bot.
parameters: []
returns:
  - type: integer
    description: Nombre de commandes slash.
related:
  - $commandsCount
  - $botCommands
  - $slashID
examples:
  - description: Afficher le nombre
    code: |
      $sendMessage[Commandes slash : $slashCommandsCount]
  - description: Comparaison prefix/slash
    code: |
      $sendMessage[Slash: $slashCommandsCount | Prefix: $math[$commandsCount-$slashCommandsCount]]
---

# $slashCommandsCount

La fonction `$slashCommandsCount` **retourne le nombre de commandes slash** enregistrées sur le bot (exclut les commandes prefix).

## Syntaxe

```
$slashCommandsCount
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : Integer
- Le nombre de commandes slash (ex: `25`).

## Comportement

- Compte uniquement les commandes de type slash.
- Ne compte pas les commandes prefix.
- Utile pour vérifier les limites Discord (100 commandes slash par application).

## Exemples

### Dashboard statistique

```bdfd
$title[📊 Commandes]
$addField[🔹 Slash;$slashCommandsCount;yes]
$addField[🔸 Prefix;$math[$commandsCount-$slashCommandsCount];yes]
$addField[📦 Total;$commandsCount;yes]
$footer[Limite Discord : 100 slash commands]
$color[#5865F2]
$sendMessage[]
```

### Vérification de limite Discord

```bdfd
$if[$slashCommandsCount>=100]
  $sendMessage[⚠️ **Attention :** Vous avez atteint la limite de 100 commandes slash Discord.
  Les nouvelles commandes slash pourraient ne pas s'enregistrer.]
$else
  $var[restant;$math[100-$slashCommandsCount]]
  $sendMessage[✅ $slashCommandsCount/100 commandes slash utilisées ($var[restant] restantes).]
$endif
```

### Information bot

```bdfd
$title[🤖 $botName - Statistiques]
$description[
**Total commandes :** $commandsCount
**Slash :** $slashCommandsCount
**Prefix :** $math[$commandsCount-$slashCommandsCount]
**Serveurs :** $guildCount
**Utilisateurs :** $membersCount
]
$thumbnail[$botAvatar]
$color[#57F287]
$sendMessage[]
```

## Notes

- Compte uniquement les commandes slash.
- Pour le total (prefix + slash), utilisez `$commandsCount`.
- Discord limite à 100 commandes slash par application.
- Pour l'ID d'une commande slash, utilisez `$slashID`.
