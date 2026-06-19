---
layout: doc
title: $mentions
translation_key: docs
category: "Entity Info"
function_name: mentions
syntax: $mentions
description: Returns the list of all IDs users mentionnés in the message, separateds par virgules.
---

# $mentions

The variable `$mentions` retourne la **list of all IDs users mentionnés** in the command message.

## Syntax

```
$mentions
```

## Return Value

- **Type** : List of snowflakes separateds par virgules
- Example: `123456789,987654321,555555555`
- String vide si noe mention user

## Behavior

- `$mentions` ne prend **no argument**.
- Returns all mentions user of the message.
- Pour obtenir only la first mention, utilisez `$mentioned`.

## Examples

### Traiter all mentions

```bdfd
$if[$mentions!=]
  $let[count;$arrayCount[$splitText[$mentions;,]]]
  $sendMessage[$count user(s) mentionné(s) : $mentions]
$else
  $sendMessage[Aucun user mentionné.]
$endif
```

### Boucle on the mentions

```bdfd
$let[mentionsList;$splitText[$mentions;,]]
$let[i;0]
$let[total;$arrayCount[$mentionsList]]
$while[$i<$total]
  $let[target;$arrayGet[$mentionsList;$i]]
  $sendMessage[User : <@$target>]
  $let[i;$sum[$i;1]]
$endwhile
```

### Command multi-cibles

```bdfd
$if[$mentions!=]
  $let[list;$splitText[$mentions;,]]
  $let[i;0]
  $let[total;$arrayCount[$list]]
  $while[$i<$total]
    $let[id;$arrayGet[$list;$i]]
    $kick[$id]
    $let[i;$sum[$i;1]]
  $endwhile
  $sendMessage[$total user(s) expulsé(s).]
$else
  $sendMessage[Mentionnez to the moins un user.]
$endif
```

## Notes

- `$mentions` retourne all IDs of un coup, separateds par virgules.
- Pour itérer, utilisez `$splitText[$mentions;,]` pour obtenir un array.
- Ne détecte pas les mentions `@everyone` or `@here`.
