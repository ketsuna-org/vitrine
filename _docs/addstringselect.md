---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addStringSelect

Creates a select menu de type "string" — a menu déroulant avec of options textuelles prédéfinies.

## Syntax

```
$addStringSelect[customId;placeholder;(minValues);(maxValues);(disabled)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom identifier for the interaction | Yes |
| `placeholder` | Text displayed when rien n'est selectionné | Yes |
| `minValues` | Minimum number d'options à selectionner (default: 1) | No |
| `maxValues` | Maximum number d'options à selectionner (default: 1) | No |
| `disabled` | `true` to disable le menu, `false` (default) | No |

## Description

A **string select** est un select menu où les options sont des strings de becauseactères définies par le développeur. Après avoir created le menu avec `$addStringSelect`, ajoutez les options avec `$addStringSelectOption`.

Contrairement à `$newSelectMenu` + `$addSelectMenuOption`, `$addStringSelect` and `$addStringSelectOption` utilisent une API simplifiée où le `menuId` is optional dans `$addStringSelectOption`.

## Examples

### Menu simple

```
$addStringSelect[menu_pays;Choisissez un pays]
$addStringSelectOption[France;fr]
$addStringSelectOption[Belgique;be]
$addStringSelectOption[Suisse;ch]
$addStringSelectOption[Canada;ca]
$sendMessage[Selectionnez votre pays]
```

### Menu à selection multiple

```
$addStringSelect[menu_hobbies;Vos loisirs;1;5]
$addStringSelectOption[Lecture;reading;;📚]
$addStringSelectOption[Sport;sport;;⚽]
$addStringSelectOption[Musique;music;;🎵]
$addStringSelectOption[Jeux vidéo;gaming;;🎮]
$addStringSelectOption[Cinéma;cinema;;🎬]
$sendMessage[Quels sont vos loisirs ?]
```

### Disabled menu

```
$addStringSelect[menu_indispo;Inavailable;1;1;true]
$addStringSelectOption[Option A;a]
$sendMessage[Ce menu est temporarily désenabled]
```

## Handling the interaction

```
$onInteraction
$if[$customID==menu_pays]
  $sendMessage[Vous avez choisi : $message]
$endif
```

## Notes

- Les options sont ajoutées avec `$addStringSelectOption`.
- Maximum 25 options par menu.
- Use `$addActionRow` to placer le menu sur a row spécifique.
