---
layout: doc
title: $addModalCheckboxGroup[]
translation_key: docs
category: "Embed & Message"
function_name: addModalCheckboxGroup
syntax: $addModalCheckboxGroup[customId;label;(required)]
description: Crée un groupe de cases à cocher dans un modal. Les options individuelles sont ajoutées avec $addCheckboxGroupOption[].
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
