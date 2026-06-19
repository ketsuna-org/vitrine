---
layout: doc
title: $mentionedRoles
translation_key: docs
category: "Entity Info"
function_name: mentionedRoles
syntax: $mentionedRoles
description: Retourne la liste des IDs des rôles mentionnés dans le message (via @role), séparés par des virgules.
---

# $mentionedRoles

La variable `$mentionedRoles` retourne la **liste des IDs des rôles mentionnés** dans le message, via la syntaxe `@role`.

## Syntaxe

```
$mentionedRoles
```

## Valeur de retour

- **Type** : Liste de snowflakes séparés par des virgules
- Exemple : `123456789,987654321`
- Chaîne vide si aucun rôle n'est mentionné

## Comportement

- `$mentionedRoles` ne prend **aucun argument**.
- Détecte les mentions de rôle au format `@nom-du-rôle`.
- Seuls les rôles "mentionnables" (paramètre de rôle activé) sont détectés.

## Exemples

### Vérifier les rôles mentionnés

```bdfd
$if[$mentionedRoles!=]
  $let[roles;$splitText[$mentionedRoles;,]]
  $let[count;$arrayCount[$roles]]
  $sendMessage[$count rôle(s) mentionné(s).]
$else
  $sendMessage[Aucun rôle mentionné.]
$endif
```

### Ajouter un rôle mentionné

```bdfd
$if[$mentionedRoles!=]
  $let[firstRole;$splitText[$mentionedRoles;,;1]]
  $giveRole[$mentioned;$firstRole]
  $sendMessage[Rôle <@&$firstRole> ajouté à <@$mentioned> !]
$else
  $sendMessage[Mentionnez un rôle à attribuer.]
$endif
```

### Lister les rôles mentionnés

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
  $sendMessage[Rôles mentionnés :
$output]
$endif
```

## Notes

- Un rôle doit avoir l'option "Allow anyone to @mention this role" activée pour être détecté.
- Les IDs retournés sont des snowflakes numériques.
- Pour obtenir le nom d'un rôle à partir de son ID, utilisez `$roleName[ID]`.
