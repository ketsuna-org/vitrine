---
layout: doc
title: $addSection[]
translation_key: docs
category: "Embed & Message"
function_name: addSection
syntax: $addSection[(id)]
description: Crée une section à l'intérieur d'un conteneur. Les sections permettent d'organiser le contenu (champs, texte, thumbnails) de manière structurée dans un conteneur visuel.
parameters:
  - name: id
    type: string
    required: false
    description: Identifiant optionnel de la section pour référence.
returns:
  type: void
  description: Initialise une nouvelle section dans le conteneur parent.
related:
  - addContainer
  - addThumbnail
  - addField
  - addTextDisplay
examples:
  - description: Section simple dans un conteneur
    code: |
      $addContainer[main;#5865F2;no]
      $addSection
      $addField[Titre;Contenu;no]
  - description: Plusieurs sections dans un conteneur
    code: |
      $addContainer[info;#2ECC71;no]
      $addSection[header]
      $addField[Nom;$username;yes]
      $addSection[details]
      $addField[Rôle;Admin;yes]
---

# $addSection[] — Section dans un Conteneur

`$addSection[]` crée une section à l'intérieur d'un conteneur préalablement initialisé avec `$addContainer[]`. Les sections structurent visuellement le contenu et peuvent contenir des champs, du texte, et des médias.

## Syntaxe

```
$addSection[(id)]
```

## Paramètres

| Paramètre | Obligatoire | Description |
|-----------|-------------|-------------|
| `id` | Non | Identifiant optionnel de la section. |

## Valeur de retour

Initialise une section dans le conteneur courant. Les composants suivants sont ajoutés à cette section.

## Utilisation

### Conteneur avec une section

```bdfd
$addContainer[user_info;#E67E22;no]
$addSection
$addField[Pseudo;$username;no]
$addField[ID;$authorID;no]
$addField[Date d'inscription;$creationDate;no]
```

### Conteneur multi-sections

```bdfd
$addContainer[embed;#9B59B6;no]

$addSection[header]
$addThumbnail[$authorAvatar]
$addTextDisplay[**Profil de $username**]

$addSection[stats]
$addField[Messages;$var[msg_count];yes]
$addField[XP;$var[xp];yes]

$addSection[footer]
$addTextDisplay[📅 Membre depuis $memberJoinDate]
```

### Sections dans un message complexe

```bdfd
$addContainer[shop;#3498DB;no]

$addSection[item1]
$addField[Article;Épée légendaire;yes]
$addField[Prix;5000 pièces d'or;yes]

$addSection[item2]
$addField[Article;Bouclier mystique;yes]
$addField[Prix;3500 pièces d'or;yes]
```

## Notes

- Doit être utilisé à l'intérieur d'un conteneur (`$addContainer`).
- Plusieurs sections peuvent coexister dans un même conteneur.
- Chaque section peut contenir des champs (`$addField`), du texte (`$addTextDisplay`), ou un thumbnail (`$addThumbnail`).
- L'ordre d'ajout détermine l'ordre d'affichage dans le message.
