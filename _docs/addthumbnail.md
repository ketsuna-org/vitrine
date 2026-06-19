---
layout: doc
title: $addThumbnail[]
translation_key: docs
category: "Embed & Message"
function_name: addThumbnail
syntax: $addThumbnail[url;(description);(spoiler)]
description: Ajoute une image miniature (thumbnail) à l'intérieur d'une section de conteneur. Ce n'est pas le thumbnail d'un embed classique mais un composant visuel autonome.
---

# $addThumbnail[] — Miniature Visuelle

`$addThumbnail[]` insère une image miniature dans une section de conteneur. Cette fonction ajoute un composant d'image autonome — distinct du thumbnail d'embed traditionnel défini par `$thumbnail[]`.

## Syntaxe

```
$addThumbnail[url;(description);(spoiler)]
```

## Paramètres

| Paramètre | Obligatoire | Défaut | Description |
|-----------|-------------|--------|-------------|
| `url` | Oui | — | URL de l'image (doit être une URL valide). |
| `description` | Non | — | Texte alternatif pour l'accessibilité. |
| `spoiler` | Non | `no` | `yes` pour masquer l'image. |

## Valeur de retour

Ajoute l'image miniature à la section courante du conteneur. L'image est rendue en petit format.

## Utilisation

### Avatar utilisateur

```bdfd
$addContainer[profile;#5865F2;no]
$addSection
$addThumbnail[$authorAvatar;Avatar de $username]
$addField[Utilisateur;$username;no]
```

### Icône de serveur

```bdfd
$addContainer[server_info;#2ECC71;no]
$addSection
$addThumbnail[$serverIcon;Icône du serveur]
$addField[Serveur;$serverName;yes]
$addField[Membres;$membersCount;yes]
```

### Image spoiler

```bdfd
$addContainer[secret_content;#E74C3C;no]
$addSection
$addThumbnail[$var[hidden_image];Image secrète;yes]
$addTextDisplay[Cliquez pour révéler l'image...]
```

### Dans une mise en page complexe

```bdfd
$addContainer[catalog;#9B59B6;no]

$addSection
$addThumbnail[https://cdn.example.com/item1.png;Épée de feu]
$addField[Épée de feu;5000 or;yes]

$addSection
$addThumbnail[https://cdn.example.com/item2.png;Bouclier de glace]
$addField[Bouclier de glace;3500 or;yes]
```

## Notes

- Doit être utilisé dans une section (`$addSection`) à l'intérieur d'un conteneur (`$addContainer`).
- Ne pas confondre avec `$thumbnail[]` qui définit le thumbnail d'un embed classique.
- L'URL doit pointer vers une image accessible publiquement (PNG, JPEG, GIF, WebP).
- Pour une galerie d'images multiples, utilisez `$addMediaGallery[]`.
