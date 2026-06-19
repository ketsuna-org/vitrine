---
layout: doc
title: $mentionedRoles
translation_key: docs
category: "Entity Info"
function_name: mentionedRoles
syntax: $mentionedRoles
description: Returns the list des IDs des roles mentionnés in the message (via @role), separateds par des virgules.
---

# $mentionedRoles

The variable `$mentionedRoles` retourne la **list des IDs des roles mentionnés** in the message, via la syntaxe `@role`.

## Syntax

```
$mentionedRoles
```

## Return Value

- **Type** : List de snowflakes separateds par des virgules
- Example: `123456789,987654321`
- String vide si no role n'est mentionné

## Behavior

- `$mentionedRoles` ne prend **no argument**.
- Détecte les mentions de role au format `@nom-du-role`.
- Seuls les roles "mentionnables" (parameter de role enabled) sont détectés.

## Examples

### Vérifier les roles mentionnés

```bdfd
$if[$mentionedRoles!=]
  $let[roles;$splitText[$mentionedRoles;,]]
  $let[count;$arrayCount[$roles]]
  $sendMessage[$count role(s) mentionné(s).]
$else
  $sendMessage[Aucun role mentionné.]
$endif
```

### Ajouter un role mentionné

```bdfd
$if[$mentionedRoles!=]
  $let[firstRole;$splitText[$mentionedRoles;,;1]]
  $giveRole[$mentioned;$firstRole]
  $sendMessage[Role <@&$firstRole> ajouté à <@$mentioned> !]
$else
  $sendMessage[Mentionnez un role à attribuer.]
$endif
```

### Listr les roles mentionnés

```bdfd
$if[$mentionedRoles!=]
  $let[roles;$splitText[$mentionedRoles;,]]
  $let[i;0]
  $let[total;$arrayCount[$roles]]
  $let[output;]
  $while[$i<$total]
    $let[roleID;$arrayGet[$roles;$i]]
    $let[output;$output - <@&$roleID>
]
    $let[i;$sum[$i;1]]
  $endwhile
  $sendMessage[Roles mentionnés :
$output]
$endif
```

## Notes

- Un role doit avoir l'option "Allow anyone to @mention this role" enablede pour être détecté.
- Les IDs retournés sont des snowflakes numériques.
- Pour obtenir the name of a role from son ID, utilisez `$roleName[ID]`.
