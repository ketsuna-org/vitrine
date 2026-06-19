---
layout: doc
title: $authorUrl[]
translation_key: docs
category: "Embed & Message"
function_name: authorUrl
syntax: $authorUrl[url;(embedIndex)]
description: Modifie l'URL de destination de l'auteur d'un embed. Rend le nom de l'auteur cliquable sans avoir à redéfinir le nom et l'icône.
parameters:
  - name: url
    description: URL de destination. Le nom de l'auteur devient un lien cliquable pointant vers cette URL.
  - name: embedIndex
    description: "Optionnel. Index de l'embed ciblé (défaut : 0)."
returns:
  - type: void
    description: Modifie l'URL de l'auteur dans la réponse en cours de construction.
related:
  - $author[]
  - $authorIcon[]
  - $sendMessage[]
examples:
  - description: Ajouter un lien cliquable après avoir défini l'auteur
    code: |
      $author[$username;$authorAvatar]
      $authorUrl[https://discord.com/users/$authorID]
      $title[Profil]
      $description[Cliquez sur le nom ci-dessus pour voir le profil Discord.]
      $color[#5865F2]
  - description: Lien conditionnel selon le contexte
    code: |
      $author[Documentation]
      $if[$var[page]!=]
      $authorUrl[https://docs.example.com/$var[page]]
      $endif
---

# $authorUrl[]

La fonction `$authorUrl[]` permet de **modifier uniquement l'URL** de destination de l'auteur d'un embed. Une fois définie, le nom de l'auteur devient un lien hypertexte cliquable.

## Syntaxe

```
$authorUrl[url;(embedIndex)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `url` | URL de destination. Le nom de l'auteur pointera vers cette adresse. |
| `embedIndex` | Optionnel. Index de l'embed ciblé (0 par défaut). |

## Valeur de retour

Modifie la réponse en cours de construction. Ne retourne rien.

## Quand utiliser $authorUrl[]

- Vous avez déjà défini l'auteur avec `$author[name]` ou `$author[name;icon]` et souhaitez le rendre cliquable.
- L'URL est dynamique (dépend d'une variable, d'un ID, etc.).
- Vous souhaitez séparer la définition du nom/icône de celle du lien pour plus de clarté.

## Exemples

### Lien vers le profil Discord de l'utilisateur

```bdfd
$author[$username;$authorAvatar]
$authorUrl[https://discord.com/users/$authorID]
$title[Profil utilisateur]
$description[
Cliquez sur le nom ci-dessus pour ouvrir le profil Discord.
]
$color[#5865F2]
$sendMessage[]
```

### Lien conditionnel

```bdfd
$author[Site web;$serverIcon]
$if[$var[page]!=]
$authorUrl[https://monsite.com/$var[page]]
$else
$authorUrl[https://monsite.com]
$endif
$title[Navigation]
$description[Sélectionnez une page dans le menu ci-dessous.]
$color[#5865F2]
$sendMessage[]
```

### Auteur avec tous les attributs séparés

```bdfd
$author[Bot Designer for Discord]
$authorIcon[https://bdfd.com/icon.png]
$authorUrl[https://bdfd.com]
$title[Créé avec BDFD]
$description[Ce bot a été créé avec Bot Designer for Discord.]
$footer[Version 2.0]
$color[#5865F2]
$sendMessage[]
```

## Notes

- `$authorUrl[]` doit être appelé **après** `$author[]`, sinon il n'y a pas d'auteur sur lequel appliquer l'URL.
- Si vous appelez `$authorUrl[]` seul (sans `$author[]` au préalable), l'URL sera ignorée.
- L'URL doit être absolue (commençant par `http://` ou `https://`).
