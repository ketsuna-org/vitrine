---
layout: doc
title: $authorAvatar
translation_key: docs
category: "Entity Info"
function_name: authorAvatar
syntax: $authorAvatar
description: Retourne l'URL de l'avatar global de l'auteur du message qui a déclenché la commande.
parameters: []
returns:
  - type: string (URL)
    description: L'URL de l'avatar de l'auteur du message.
related:
  - $authorBanner
  - $userAvatar
  - $authorUsername
  - $authorID
examples:
  - description: Obtenir l'avatar de l'auteur
    code: $authorAvatar
  - description: Afficher l'avatar de l'auteur
    code: |
      $title[Avatar de $authorUsername]
      $image[$authorAvatar]
      $color[#5865F2]
      $sendMessage[]
---

# $authorAvatar

La variable `$authorAvatar` retourne l'**URL de l'avatar global** de l'auteur du message qui a déclenché la commande.

## Syntaxe

```
$authorAvatar
```

## Valeur de retour

- **Type** : Chaîne de caractères (URL)
- URL de l'avatar de l'auteur (CDN Discord)
- Avatar par défaut si l'auteur n'a pas d'avatar personnalisé

## Comportement

- `$authorAvatar` ne prend **aucun argument**.
- Équivalent à `$userAvatar` pour les commandes textuelles.
- L'URL pointe vers les CDN Discord.

## Exemples

### Avatar en grand

```bdfd
$title[Avatar de $authorUsername]
$image[$authorAvatar]
$color[#5865F2]
$sendMessage[]
```

### Auteur d'embed avec avatar

```bdfd
$author[$authorUsername;$authorAvatar]
$title[Message]
$description[Contenu du message...]
$color[#5865F2]
$sendMessage[]
```

### Profil complet

```bdfd
$author[$authorUsername;$authorAvatar]
$title[Profil de $authorUsername]
$thumbnail[$authorAvatar]
$description[
**Nom :** $authorUsername
**ID :** $authorID
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Pour l'avatar spécifique au serveur, utilisez `$userServerAvatar`.
- Les paramètres `?size=` peuvent être ajoutés à l'URL pour changer la résolution.
- L'avatar peut être modifié par l'utilisateur à tout moment.
