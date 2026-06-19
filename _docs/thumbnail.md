---
layout: doc
title: $thumbnail[]
translation_key: docs
category: "Embed & Message"
function_name: thumbnail
syntax: $thumbnail[url;(embedIndex)]
description: Définit la miniature (thumbnail) d'un embed Discord. La miniature est une petite image carrée affichée en haut à droite de l'embed.
parameters:
  - name: url
    description: URL de l'image miniature. Formats supportés : PNG, JPG, GIF, WebP. L'image sera redimensionnée en petit carré.
  - name: embedIndex
    description: "Optionnel. Index de l'embed ciblé (défaut : 0)."
returns:
  - type: void
    description: Modifie la réponse en cours de construction.
related:
  - $image[]
  - $author[]
  - $authorIcon[]
  - $sendMessage[]
examples:
  - description: Embed avec thumbnail (avatar utilisateur)
    code: |
      $title[Profil de $username]
      $description[**ID :** $authorID]
      $thumbnail[$authorAvatar]
      $color[#5865F2]
  - description: Thumbnail avec icône de serveur
    code: $thumbnail[$serverIcon]
  - description: Embed complet avec thumbnail et image
    code: |
      $title[Article du jour]
      $description[Cliquez sur le titre pour lire l'article complet.]
      $thumbnail[https://example.com/article-icon.png]
      $image[https://example.com/article-header.jpg]
      $footer[Publié le $time]
      $color[#5865F2]
---

# $thumbnail[]

La fonction `$thumbnail[]` définit la **miniature** (thumbnail) d'un embed Discord. La miniature est une petite image carrée qui s'affiche dans le coin supérieur droit de l'embed.

## Syntaxe

```
$thumbnail[url;(embedIndex)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `url` | URL de l'image à utiliser comme miniature. Doit être une URL directe vers un fichier image. |
| `embedIndex` | Optionnel. Index de l'embed ciblé (0 par défaut). |

## Valeur de retour

Modifie la réponse en cours de construction. Ne retourne rien.

## Comportement

- Le thumbnail apparaît en haut à droite de l'embed.
- L'image est automatiquement redimensionnée en un petit carré.
- Un seul thumbnail par embed : le dernier appel écrase le précédent.

## Différence entre $thumbnail[] et $image[]

| Fonction | Position | Taille |
|---|---|---|
| `$thumbnail[]` | En haut à droite | Petite (carré, ~80x80px) |
| `$image[]` | En bas de l'embed | Grande, pleine largeur |

## Exemples

### Thumbnail avec avatar utilisateur

```bdfd
$title[Profil de $username]
$description[
**Nom :** $username
**ID :** $authorID
**Compte créé :** $creationDate[$authorID]
]
$thumbnail[$authorAvatar]
$color[#5865F2]
$sendMessage[]
```

### Thumbnail avec icône du serveur

```bdfd
$title[Bienvenue sur $serverName]
$description[
Bienvenue sur le serveur **$serverName** !
Nous sommes maintenant **$membersCount** membres !
]
$thumbnail[$serverIcon]
$color[#57F287]
$sendMessage[]
```

### Thumbnail et image combinés

```bdfd
$title[Nouvelle mise à jour]
$description[
**Version 2.0** est maintenant disponible !

- Corrections de bugs
- Nouvelles fonctionnalités
- Performances améliorées
]
$thumbnail[https://cdn.example.com/update-icon.png]
$image[https://cdn.example.com/update-banner.png]
$footer[Publié le $time]
$color[#FEE75C]
$sendMessage[]
```

## Notes

- L'URL doit être accessible publiquement.
- Formats supportés : PNG, JPEG, GIF, WebP.
- Le thumbnail est idéal pour afficher un avatar, un logo ou une icône représentative.
- Pour une grande image en pleine largeur, utilisez `$image[]`.
