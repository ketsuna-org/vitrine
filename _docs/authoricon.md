---
layout: doc
title: $authorIcon[]
translation_key: docs
category: "Embed & Message"
function_name: authorIcon
syntax: $authorIcon[url;(embedIndex)]
description: Modifie l'icône (avatar) de l'auteur d'un embed après que celui-ci a été défini avec $author[]. Permet de changer uniquement l'image sans modifier le nom ni l'URL.
---

# $authorIcon[]

La fonction `$authorIcon[]` permet de **modifier uniquement l'icône** de l'auteur d'un embed après que celui-ci a été défini avec `$author[]`. Elle évite de répéter le nom et l'URL lorsque seule l'image doit changer.

## Syntaxe

```
$authorIcon[url;(embedIndex)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `url` | URL de l'image à utiliser comme icône de l'auteur. |
| `embedIndex` | Optionnel. Index de l'embed ciblé (0 par défaut). |

## Valeur de retour

Modifie la réponse en cours de construction. Ne retourne rien.

## Quand utiliser $authorIcon[]

- Vous avez déjà défini l'auteur avec `$author[name]` et souhaitez ajouter ou changer l'icône sans modifier le nom.
- L'icône dépend d'une variable dynamique (avatar, rôle, etc.).
- Vous voulez un code plus modulaire et lisible.

## Exemples

### Ajouter l'avatar de l'utilisateur comme icône

```bdfd
$author[$username]
$authorIcon[$authorAvatar]
$title[Profil de $username]
$description[
**ID :** $authorID
**Compte créé le :** $creationDate[$authorID]
]
$color[#5865F2]
$sendMessage[]
```

### Icône différente selon le rôle

```bdfd
$author[Message de la modération]
$if[$hasRole[$authorID;admin]]
$authorIcon[https://cdn.example.com/admin-badge.png]
$elseif[$hasRole[$authorID;modo]]
$authorIcon[https://cdn.example.com/modo-badge.png]
$else
$authorIcon[$authorAvatar]
$endif
$title[Avertissement]
$description[Veuillez respecter les règles du serveur.]
$color[#ED4245]
$sendMessage[]
```

## Notes

- `$authorIcon[]` doit être appelé **après** `$author[]`, sinon l'icône n'a pas d'auteur sur lequel s'appliquer.
- Si `$authorIcon[]` est appelé avant `$author[]`, l'icône sera ignorée.
- L'URL doit pointer vers une image accessible publiquement (PNG, JPG, GIF, WebP).
- Pour changer le nom ou ajouter un lien, utilisez respectivement `$author[]` (qui redéfinit tout) ou `$authorUrl[]`.
