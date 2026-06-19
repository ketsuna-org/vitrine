---
layout: doc
title: $addModalCheckboxGroup[]
translation_key: docs
category: "Embed & Message"
function_name: addModalCheckboxGroup
syntax: $addModalCheckboxGroup[customId;label;(required)]
description: Crée un groupe de cases à cocher dans un modal. Les options individuelles sont ajoutées avec $addCheckboxGroupOption[].
parameters:
  - name: customId
    type: string
    required: true
    description: Identifiant unique du groupe de cases à cocher.
  - name: label
    type: string
    required: true
    description: Étiquette affichée au-dessus du groupe.
  - name: required
    type: string
    required: false
    default: "yes"
    description: "yes" si au moins une case doit être cochée, "no" sinon.
returns:
  type: void
  description: Initialise un groupe de cases à cocher dans le modal en cours.
related:
  - newModal
  - addCheckboxGroupOption
  - addModalCheckbox
  - addModalRadioGroup
examples:
  - description: Groupe de cases à cocher pour centres d'intérêt
    code: |
      $addModalCheckboxGroup[interests;Centres d'intérêt;no]
      $addCheckboxGroupOption[interests;Jeux vidéo;games]
      $addCheckboxGroupOption[interests;Musique;music]
      $addCheckboxGroupOption[interests;Sport;sport]
  - description: Groupe sans menuId (dernier groupe créé)
    code: |
      $addModalCheckboxGroup[days;Jours disponibles;yes]
      $addCheckboxGroupOption[;Lundi;mon]
      $addCheckboxGroupOption[;Mardi;tue]
      $addCheckboxGroupOption[;Mercredi;wed]
---

# $addModalCheckboxGroup[] — Groupe de Cases à Cocher

`$addModalCheckboxGroup[]` crée un conteneur pour un groupe de cases à cocher dans un modal. Les options sont ensuite ajoutées avec `$addCheckboxGroupOption[]`. L'utilisateur peut cocher plusieurs options simultanément.

## Syntaxe

```
$addModalCheckboxGroup[customId;label;(required)]
```

## Paramètres

| Paramètre | Obligatoire | Défaut | Description |
|-----------|-------------|--------|-------------|
| `customId` | Oui | — | Identifiant unique du groupe. |
| `label` | Oui | — | Étiquette descriptive au-dessus du groupe. |
| `required` | Non | `yes` | `yes` si une sélection est obligatoire. |

## Valeur de retour

Initialise un groupe de cases à cocher. Les valeurs cochées sont accessibles via `$input[customId]` sous forme de liste séparée par des virgules.

## Utilisation

### Groupe de centres d'intérêt

```bdfd
$newModal[Profil;profile_modal]
$addModalTextInput[username;Pseudo;short;;;yes;3;32]
$addModalCheckboxGroup[hobbies;Loisirs;no]
$addCheckboxGroupOption[;Lecture;reading;Livres et romans]
$addCheckboxGroupOption[;Cinéma;movies;Films et séries]
$addCheckboxGroupOption[;Cuisine;cooking;Art culinaire]
$addCheckboxGroupOption[;Voyages;travel;Découvrir le monde]
```

### Groupe obligatoire

```bdfd
$newModal[Sondage;sondage_modal]
$addModalCheckboxGroup[features;Fonctionnalités souhaitées;yes]
$addCheckboxGroupOption[;Notifications;notif]
$addCheckboxGroupOption[;Mode sombre;darkmode]
$addCheckboxGroupOption[;Export données;export]
```

### Récupération des valeurs

```bdfd
$onInteraction[profile_submit]
$var[hobbies;$input[hobbies]]
$sendMessage[Loisirs sélectionnés : $var[hobbies]]
$endInteraction
```

## Notes

- Les options sont ajoutées avec `$addCheckboxGroupOption[]` où le `menuId` peut être omis pour cibler le dernier groupe créé.
- La valeur retournée est une chaîne contenant les `value` des options cochées, séparées par des virgules.
- Maximum 25 options par groupe (limite Discord).
