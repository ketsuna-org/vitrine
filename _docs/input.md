---
layout: doc
title: $input
translation_key: docs
category: "Context & Commands"
function_name: input
syntax: $input
description: Récupère le texte intégral de la commande saisie par l'utilisateur, après le préfixe et le nom de la commande. Équivalent à $message sans le nom de commande.
---
# $input

La fonction `$input` retourne le **texte saisi après le nom de la commande**. Pour une commande `!say Hello World`, `$input` vaut `Hello World`.

## Syntaxe

```
$input
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : Chaîne
- Le texte intégral entré après le nom de la commande.
- Chaîne vide si aucun argument n'a été fourni.

## Différence avec $message

| Fonction | Exemple avec `!say coucou` |
|---|---|
| `$message` | `!say coucou` (commande complète) |
| `$input` | `coucou` (arguments uniquement) |

## Exemples

### Commande echo

```bdfd
$sendMessage[$input]
```

### Commande say avec embed

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

### Extraction du premier mot

```bdfd
$let[firstWord;$splitText[1; ;$input]]
$sendMessage[Premier mot : $firstWord]
```

## Notes

- `$input` est sensible à `$noMentionMessage` (les mentions sont converties).
- Pour éviter la conversion des mentions, utilisez `$messageSlice[>1]`.
- `$input` ne contient pas le préfixe ni le nom de la commande.
