---
layout: doc
title: $mentionedRoles
translation_key: docs
category: "Entity Info"
function_name: mentionedRoles
syntax: $mentionedRoles
description: Returns the list IDs roles mentionnés in the message (via @role), separateds par virgules.
---

# $mentionedRoles

The variable `$mentionedRoles` retourne la **list IDs roles mentionnés** in the message, via la syntaxe `@role`.

## Syntax

```
$mentionedRoles
```

## Return Value

- **Type** : List of snowflakes separateds par virgules
- Example: `123456789,987654321`
- String vide si no role n'est mentionné

## Behavior

- `$mentionedRoles` ne prend **no argument**.
- Détecte les mentions of role to the format `@nom-du-role`.
- Seuls les roles "mentionnables" (parameter of role enabled) sont détectés.

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
  $sendMessage[Role <@&$firstRole> ajouté to <@$mentioned> !]
$else
  $sendMessage[Mentionnez un role to attribuer.]
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
- Les IDs retournés sont snowflakes numériques.
- Pour obtenir the name of a role from son ID, utilisez `$roleName[ID]`.
