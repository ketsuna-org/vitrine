---
layout: doc
title: $authorUsername
translation_key: docs
category: "Entity Info"
function_name: authorUsername
syntax: $authorUsername
description: Retourne le nom d'utilisateur global de l'auteur du message qui a déclenché la commande.
---

# $authorUsername

La variable `$authorUsername` retourne le **nom d'utilisateur global** de l'auteur du message qui a déclenché la commande.

## Syntaxe

```
$authorUsername
```

## Valeur de retour

- **Type** : Chaîne de caractères
- Le nom d'utilisateur global de l'auteur

## Comportement

- `$authorUsername` ne prend **aucun argument**.
- Équivalent à `$userName` pour les commandes textuelles.
- Retourne le nom d'utilisateur **global** (pas le pseudo serveur).

## Exemples

### Message de l'auteur

```bdfd
$title[Commande exécutée]
$author[$authorUsername;$authorAvatar]
$description[
**Auteur :** $authorUsername#$discriminator
**ID :** $authorID
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Pour obtenir le pseudo serveur de l'auteur, utilisez `$nickname` ou `$displayName`.
- `$authorUsername` est utile pour référencer explicitement l'auteur du message dans les logs ou embeds.
- Dans la plupart des cas, `$userName` et `$authorUsername` sont interchangeables.
