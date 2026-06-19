---
layout: doc
title: $userID
translation_key: docs
category: "Entity Info"
function_name: userID
syntax: $userID
description: Retourne l'ID Discord de l'utilisateur qui a déclenché la commande ou l'interaction.
parameters: []
returns:
  - type: snowflake (string)
    description: L'ID Discord de l'utilisateur déclencheur.
related:
  - $authorID
  - $username
  - $isBot
examples:
  - description: Obtenir l'ID de l'utilisateur
    code: $userID
  - description: Afficher l'ID dans un message
    code: |
      $title[Votre ID]
      $description[Votre ID Discord est : **$userID**]
      $color[#5865F2]
      $sendMessage[]
---

# $userID

La variable `$userID` retourne l'**ID Discord** (snowflake) de l'utilisateur qui a déclenché l'exécution de la commande ou de l'interaction.

## Syntaxe

```
$userID
```

## Valeur de retour

- **Type** : Snowflake (chaîne numérique de 17-19 chiffres)
- Retourne l'ID unique de l'utilisateur sur Discord

## Comportement

- `$userID` ne prend **aucun argument**.
- Retourne toujours l'ID de l'utilisateur qui a **interagi** avec le bot (commande, bouton, menu, modal, etc.).
- L'ID est une chaîne numérique permanente — il ne change jamais, contrairement au nom d'utilisateur.

## Exemples

### Afficher l'ID utilisateur

```bdfd
$title[Votre ID utilisateur]
$description[**ID :** `$userID`]
$color[#5865F2]
$sendMessage[]
```

### Utiliser l'ID dans une condition

```bdfd
$if[$userID==123456789012345678]
  $sendMessage[Bonjour administrateur !]
$else
  $sendMessage[Bonjour utilisateur !]
$endif
```

## Différence avec $authorID

- `$userID` : l'utilisateur qui a déclenché l'interaction
- `$authorID` : l'auteur du message (dans le cas d'un message command)

Dans la plupart des cas simples, les deux sont identiques. Dans des contextes avancés (workflows, interactions), `$userID` est recommandé.

## Notes

- L'ID Discord est un **snowflake** permanent et unique.
- Il n'est pas possible de modifier ou supprimer un ID Discord.
- Utilisez `$userID` en comparaison avec `$if[]` pour créer des commandes réservées à certains utilisateurs.
