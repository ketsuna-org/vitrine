---
layout: doc
title: $mentioned
translation_key: docs
category: "Entity Info"
function_name: mentioned
syntax: $mentioned
description: Retourne l'ID du premier utilisateur mentionné dans le message. Équivalent au premier élément de $mentions.
---

# $mentioned

La variable `$mentioned` retourne l'**ID du premier utilisateur mentionné** dans le message de commande.

## Syntaxe

```
$mentioned
```

## Valeur de retour

- **Type** : Snowflake (chaîne numérique) ou chaîne vide
- ID du premier utilisateur mentionné (`<@ID>`)
- Chaîne vide si aucune mention utilisateur n'est présente

## Comportement

- `$mentioned` ne prend **aucun argument**.
- Retourne uniquement la **première** mention utilisateur.
- Pour obtenir toutes les mentions, utilisez `$mentions`.

## Exemples

### Agir sur l'utilisateur mentionné

```bdfd
$if[$mentioned!=]
  $title[Informations sur <@$mentioned>]
  $description[
  **ID :** $mentioned
  **Nom :** $username[$mentioned]
  ]
  $thumbnail[$userAvatar[$mentioned]]
  $color[#5865F2]
  $sendMessage[]
$else
  $sendMessage[Vous devez mentionner un utilisateur.]
$endif
```

### Kick du premier mentionné

```bdfd
$if[$mentioned!=]
  $if[$checkContains[$userPerms;KickMembers]==true]
    $kick[$mentioned]
    $sendMessage[<@$mentioned> a été expulsé.]
  $else
    $sendMessage[Permission refusée.]
  $endif
$else
  $sendMessage[Mentionnez l'utilisateur à expulser.]
$endif
```

## Notes

- `$mentioned` est pratique pour les commandes qui n'attendent qu'une seule cible.
- Si plusieurs utilisateurs sont mentionnés, seul le premier est retourné.
- Utilisez `$userExists[$mentioned]` pour valider que l'utilisateur mentionné existe.
- Ne détecte pas les mentions `@everyone` ou `@here`.
