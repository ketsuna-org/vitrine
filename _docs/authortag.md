---
layout: doc
title: $authorTag
translation_key: docs
category: "Entity Info"
function_name: authorTag
syntax: $authorTag
description: Retourne le tag complet de l'auteur du message (format "nom#discriminator" ou nom simple pour les comptes pompom).
---

# $authorTag

La variable `$authorTag` retourne le **tag complet** de l'auteur du message. C'est l'équivalent de `$userTag` mais explicitement lié à l'auteur du message.

## Syntaxe

```
$authorTag
```

## Valeur de retour

- **Type** : Chaîne de caractères
- Ancien format : `nom#discriminator` pour les comptes legacy
- Nouveau format : simplement le nom d'utilisateur pour les comptes pompom

## Comportement

- `$authorTag` ne prend **aucun argument**.
- Équivalent à `$userTag` dans le contexte d'une commande textuelle.
- Pour les nouveaux comptes (pompom), le tag est identique au nom d'utilisateur.

## Exemples

### Profil de l'auteur

```bdfd
$title[Profil de $authorTag]
$author[$authorUsername;$authorAvatar]
$description[
**Nom :** $authorUsername
**Tag :** $authorTag
**ID :** $authorID
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Le format `nom#discriminator` est obsolète pour les nouveaux comptes Discord.
- Pour une identification fiable, utilisez `$authorID`.
- `$authorTag` et `$userTag` sont généralement identiques dans les commandes textuelles.
