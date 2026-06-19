---
layout: doc
title: $mentions
translation_key: docs
category: "Entity Info"
function_name: mentions
syntax: $mentions
description: Retourne la liste de tous les IDs des utilisateurs mentionnés dans le message, séparés par des virgules.
---

# $mentions

La variable `$mentions` retourne la **liste de tous les IDs des utilisateurs mentionnés** dans le message de commande.

## Syntaxe

```
$mentions
```

## Valeur de retour

- **Type** : Liste de snowflakes séparés par des virgules
- Exemple : `123456789,987654321,555555555`
- Chaîne vide si aucune mention utilisateur

## Comportement

- `$mentions` ne prend **aucun argument**.
- Retourne toutes les mentions utilisateur du message.
- Pour obtenir uniquement la première mention, utilisez `$mentioned`.

## Exemples

### Traiter toutes les mentions

```bdfd
$if[$mentions!=]
  $let[count;$arrayCount[$splitText[$mentions;,]]]
  $sendMessage[$count utilisateur(s) mentionné(s) : $mentions]
$else
  $sendMessage[Aucun utilisateur mentionné.]
$endif
```

### Boucle sur les mentions

```bdfd
$let[mentionsList;$splitText[$mentions;,]]
$let[i;0]
$let[total;$arrayCount[$mentionsList]]
$while[$i<$total]
  $let[target;$arrayGet[$mentionsList;$i]]
  $sendMessage[Utilisateur : <@$target>]
  $let[i;$sum[$i;1]]
$endwhile
```

### Commande multi-cibles

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
  $sendMessage[$total utilisateur(s) expulsé(s).]
$else
  $sendMessage[Mentionnez au moins un utilisateur.]
$endif
```

## Notes

- `$mentions` retourne tous les IDs d'un coup, séparés par des virgules.
- Pour itérer, utilisez `$splitText[$mentions;,]` pour obtenir un tableau.
- Ne détecte pas les mentions `@everyone` ou `@here`.
