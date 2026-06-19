---
layout: doc
title: $authorID
translation_key: docs
category: "Entity Info"
function_name: authorID
syntax: $authorID
description: Retourne l'ID Discord de l'auteur du message qui a déclenché la commande.
parameters: []
returns:
  - type: snowflake (string)
    description: L'ID Discord de l'auteur du message.
related:
  - $userID
  - $authorUsername
  - $authorTag
  - $authorAvatar
examples:
  - description: Obtenir l'ID de l'auteur
    code: $authorID
  - description: Afficher l'ID dans un embed
    code: |
      $title[Auteur du message]
      $description[**ID :** $authorID]
      $color[#5865F2]
      $sendMessage[]
---

# $authorID

La variable `$authorID` retourne l'**ID Discord** de l'auteur du message qui a déclenché l'exécution de la commande.

## Syntaxe

```
$authorID
```

## Valeur de retour

- **Type** : Snowflake (chaîne numérique de 17-19 chiffres)
- L'ID unique de l'auteur du message

## Comportement

- `$authorID` ne prend **aucun argument**.
- Dans le contexte d'une commande textuelle, `$authorID` est l'ID de la personne qui a envoyé le message.
- Dans la plupart des cas simples, `$authorID` et `$userID` sont identiques.

## Exemples

### Profil de l'auteur

```bdfd
$title[Profil de $authorUsername]
$author[$authorUsername;$authorAvatar]
$description[
**ID :** $authorID
**Tag :** $authorTag
]
$color[#5865F2]
$sendMessage[]
```

### Vérification du propriétaire

```bdfd
$if[$authorID==123456789012345678]
  $sendMessage[Bonjour propriétaire !]
$endif
```

## Notes

- `$authorID` est l'ID de l'**auteur du message**, tandis que `$userID` est l'ID de l'**utilisateur déclencheur**. Dans les commandes textuelles, ils sont identiques.
- Utilisez `$authorID` pour plus de clarté sémantique dans le code lié aux messages.
