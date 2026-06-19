---
layout: doc
title: $botCommands
translation_key: docs
category: "Entity Info"
function_name: botCommands
syntax: $botCommands
description: Returns a list commands availables on the bot.
---

# $botCommands

The `$botCommands` function **returns the list noms of all commands** enregistrées on the bot, separatedes par retours to la ligne.

## Syntax

```
$botCommands
```

## Parameters

Aucun.

## Return value

- **Type** : String
- List commands, une par ligne (ex: `help`, `ping`, `ban`...).

## Behavior

- Returns thes commands prefix ET slash.
- Each command apparaît on a new row.
- L'ordre correspond to l'organisation in the console BDFD.

## Examples

### Command help basique

```bdfd
$title[📚 Commands of $botName]
$description[
Voici all mes commands :
```
$botCommands
```
]
$footer[Total : $commandsCount commands]
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

$title[📚 Commands (page $var[page]/$var[pages])]
$description[
$arraySlice[$var[lines];$math[($var[page]-1)*10];10]
]
$footer[Total : $commandsCount commands]
$sendMessage[]
```

### Recherche of command

```bdfd
$var[search;$message[1]]
$if[$var[search]==]
  $sendMessage[❌ Usage: !search <nom>]
  $stop
$endif

$var[results;$advancedTextSplit[$botCommands;\n;$var[search]]]
$if[$arrayLength[$var[results]]==0]
  $sendMessage[❌ Aucune command founde pour "$var[search]".]
$else
  $title[🔍 Results pour "$var[search]"]
  $description[$arraySlice[$var[results];0;20]]
  $sendMessage[]
$endif
```

## Notes

- Les commands sont retournées sous forme of text brut (une par ligne).
- For the number total, use `$commandsCount`.
- For the number of commands slash only, use `$slashCommandsCount`.
- `$botCommands` can be volumineux on the bots ayant beaucoup of commands.
