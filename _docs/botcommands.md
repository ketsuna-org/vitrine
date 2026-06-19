---
layout: doc
title: $botCommands
translation_key: docs
category: "Entity Info"
function_name: botCommands
syntax: $botCommands
description: Retourne une liste des commandes disponibles sur le bot.
parameters: []
returns:
  - type: string
    description: Liste textuelle des commandes du bot, une par ligne.
related:
  - $commandsCount
  - $slashCommandsCount
  - $commandName
examples:
  - description: Lister les commandes
    code: |
      $sendMessage[Commandes disponibles : 
      $botCommands]
  - description: Compter les commandes
    code: |
      $sendMessage[Le bot a $commandsCount commandes !]
---

# $botCommands

La fonction `$botCommands` **retourne la liste des noms de toutes les commandes** enregistrées sur le bot, séparées par des retours à la ligne.

## Syntaxe

```
$botCommands
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : String
- Liste des commandes, une par ligne (ex: `help`, `ping`, `ban`...).

## Comportement

- Retourne les commandes prefix ET slash.
- Chaque commande apparaît sur une nouvelle ligne.
- L'ordre correspond à l'organisation dans la console BDFD.

## Exemples

### Commande help basique

```bdfd
$title[📚 Commandes de $botName]
$description[
Voici toutes mes commandes :
```
$botCommands
```
]
$footer[Total : $commandsCount commandes]
$color[#5865F2]
$sendMessage[]
```

### Aide paginée

```bdfd
$var[cmds;$botCommands]
$var[lines;$textSplit[$var[cmds];\n]]
$var[pages;$math[$arrayLength[$var[lines]]/10]]
$var[page;$message[1]]
$if[$isInteger[$var[page]]==false]
  $var[page;1]
$endif

$title[📚 Commandes (page $var[page]/$var[pages])]
$description[
$arraySlice[$var[lines];$math[($var[page]-1)*10];10]
]
$footer[Total : $commandsCount commandes]
$sendMessage[]
```

### Recherche de commande

```bdfd
$var[search;$message[1]]
$if[$var[search]==]
  $sendMessage[❌ Usage: !search <nom>]
  $stop
$endif

$var[results;$advancedTextSplit[$botCommands;\n;$var[search]]]
$if[$arrayLength[$var[results]]==0]
  $sendMessage[❌ Aucune commande trouvée pour "$var[search]".]
$else
  $title[🔍 Résultats pour "$var[search]"]
  $description[$arraySlice[$var[results];0;20]]
  $sendMessage[]
$endif
```

## Notes

- Les commandes sont retournées sous forme de texte brut (une par ligne).
- Pour le nombre total, utilisez `$commandsCount`.
- Pour le nombre de commandes slash uniquement, utilisez `$slashCommandsCount`.
- `$botCommands` peut être volumineux sur les bots ayant beaucoup de commandes.
