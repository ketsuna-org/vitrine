---
layout: doc
title: $input
translation_key: docs
category: "Context & Commands"
function_name: input
syntax: $input
description: Gets the text intégral of the command saisie par the user, after le préfixe and the name of the command. Équivaslow à $message without the nom de command.
---
# $input

The function `$input` retourne le **text saisi after the name of the command**. Pour une command `!say Hello World`, `$input` vaut `Hello World`.

## Syntax

```
$input
```

## Parameters

Aucun.

## Return Value

- **Type** : String
- Le text intégral entré after the name of the command.
- String vide si no argument n'was fourni.

## Différence avec $message

| Function | Exemple avec `!say coucou` |
|---|---|
| `$message` | `!say coucou` (command complete) |
| `$input` | `coucou` (arguments only) |

## Examples

### Command echo

```bdfd
$sendMessage[$input]
```

### Command say avec embed

```bdfd
$if[$input!=]
  $title[Message de $username]
  $description[$input]
  $color[#5865F2]
  $sendMessage[]
$else
  $sendMessage[Usage : !say <message>]
$endif
```

### Extraction du first mot

```bdfd
$let[firstWord;$splitText[1; ;$input]]
$sendMessage[Premier mot : $firstWord]
```

## Notes

- `$input` est sensible à `$noMentionMessage` (les mentions sont convertedes).
- Pour éviter la conversion des mentions, utilisez `$messageSlice[>1]`.
- `$input` ne contains pas le préfixe ni the name of the command.
