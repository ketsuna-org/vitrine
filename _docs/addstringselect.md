---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addStringSelect

Crée un menu de sélection de type "string" — un menu déroulant avec des options textuelles prédéfinies.

## Syntaxe

```
$addStringSelect[customId;placeholder;(minValues);(maxValues);(disabled)]
```

## Paramètres

| Paramètre | Description | Obligatoire |
|-----------|-------------|:-----------:|
| `customId` | Identifiant personnalisé pour l'interaction | Oui |
| `placeholder` | Texte affiché quand rien n'est sélectionné | Oui |
| `minValues` | Nombre minimum d'options à sélectionner (défaut : 1) | Non |
| `maxValues` | Nombre maximum d'options à sélectionner (défaut : 1) | Non |
| `disabled` | `true` pour désactiver le menu, `false` (défaut) | Non |

## Description

Un **string select** est un menu de sélection où les options sont des chaînes de caractères définies par le développeur. Après avoir créé le menu avec `$addStringSelect`, ajoutez les options avec `$addStringSelectOption`.

Contrairement à `$newSelectMenu` + `$addSelectMenuOption`, `$addStringSelect` et `$addStringSelectOption` utilisent une API simplifiée où le `menuId` est optionnel dans `$addStringSelectOption`.

## Exemples

### Menu simple

```
$addStringSelect[menu_pays;Choisissez un pays]
$addStringSelectOption[France;fr]
$addStringSelectOption[Belgique;be]
$addStringSelectOption[Suisse;ch]
$addStringSelectOption[Canada;ca]
$sendMessage[Sélectionnez votre pays]
```

### Menu à sélection multiple

```
$addStringSelect[menu_hobbies;Vos loisirs;1;5]
$addStringSelectOption[Lecture;reading;;📚]
$addStringSelectOption[Sport;sport;;⚽]
$addStringSelectOption[Musique;music;;🎵]
$addStringSelectOption[Jeux vidéo;gaming;;🎮]
$addStringSelectOption[Cinéma;cinema;;🎬]
$sendMessage[Quels sont vos loisirs ?]
```

### Menu désactivé

```
$addStringSelect[menu_indispo;Indisponible;1;1;true]
$addStringSelectOption[Option A;a]
$sendMessage[Ce menu est temporairement désactivé]
```

## Gestion de l'interaction

```
$onInteraction
$if[$customID==menu_pays]
  $sendMessage[Vous avez choisi : $message]
$endif
```

## Notes

- Les options sont ajoutées avec `$addStringSelectOption`.
- Maximum 25 options par menu.
- Utilisez `$addActionRow` pour placer le menu sur une ligne spécifique.
