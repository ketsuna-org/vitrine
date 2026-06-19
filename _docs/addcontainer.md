---
layout: doc
title: $addContainer[]
translation_key: docs
category: "Embed & Message"
function_name: addContainer
syntax: $addContainer[(id);(accentColor);(spoiler)]
description: Crée un conteneur visuel dans un message Discord. Les conteneurs peuvent regrouper des sections et afficher une bordure colorée. Supporte le mode spoiler.
parameters:
  - name: id
    type: string
    required: false
    description: Identifiant optionnel du conteneur pour référence ultérieure.
  - name: accentColor
    type: string
    required: false
    description: Couleur d'accentuation en hexadécimal (ex: "#5865F2"). Applique une bordure colorée au conteneur.
  - name: spoiler
    type: string
    required: false
    default: "no"
    description: "yes" pour masquer le contenu du conteneur derrière un spoiler, "no" sinon.
returns:
  type: void
  description: Initialise un conteneur. Les sections ($addSection) suivantes sont placées dans ce conteneur.
related:
  - addSection
  - addThumbnail
  - addMediaGallery
examples:
  - description: Conteneur simple
    code: $addContainer
  - description: Conteneur avec couleur
    code: $addContainer[main;#5865F2;no]
  - description: Conteneur en spoiler
    code: $addContainer[spoiler_content;;yes]
---

# $addContainer[] — Conteneur Visuel

`$addContainer[]` crée un conteneur dans un message Discord. Les conteneurs offrent une structuration visuelle avec une bordure colorée optionnelle et la possibilité d'être masqués derrière un spoiler.

## Syntaxe

```
$addContainer[(id);(accentColor);(spoiler)]
```

## Paramètres

| Paramètre | Obligatoire | Défaut | Description |
|-----------|-------------|--------|-------------|
| `id` | Non | — | Identifiant du conteneur. |
| `accentColor` | Non | — | Couleur hex de la bordure (ex: `#FF0000`). |
| `spoiler` | Non | `no` | `yes` pour masquer, `no` sinon. |

## Valeur de retour

Initialise un conteneur. Les composants ajoutés après (sections, thumbnails, galeries) s'insèrent dans ce conteneur.

## Utilisation

### Conteneur basique

```bdfd
$addContainer
$addSection
$addField[Statut;En ligne;yes]
$addField[Uptime;24h;yes]
```

### Conteneur avec couleur d'accent

```bdfd
$addContainer[profile;#5865F2;no]
$addSection
$addThumbnail[$authorAvatar]
$addField[Utilisateur;$username;no]
$addField[Rejoint le;$memberJoinDate;no]
```

### Conteneur spoiler

```bdfd
$addContainer[secret;;yes]
$addSection
$addTextDisplay[**Spoiler Alert !** Cliquez pour révéler le contenu.]
```

### Conteneurs multiples

```bdfd
$addContainer[header;#2ECC71;no]
$addSection
$addField[Titre;Bienvenue sur le serveur;no]

$addContainer[body;#3498DB;no]
$addSection
$addField[Description;Nous sommes ravis de vous accueillir !;no]
```

## Notes

- Les conteneurs sont une fonctionnalité visuelle propre à BDFD ; ils ne font pas partie de l'API Discord native.
- Un conteneur peut contenir plusieurs sections ($addSection).
- La couleur `accentColor` doit être au format hexadécimal avec `#`.
- Le mode spoiler masque tout le contenu du conteneur jusqu'à ce que l'utilisateur clique dessus.
