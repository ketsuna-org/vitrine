---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addStringSelect

Creates a select menu of type "string" — a menu déroulant with of options textuelles prédéfinies.

## Syntax

```
$addStringSelect[customId;placeholder;(minValues);(maxValues);(disabled)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom identifier for the interaction | Yes |
| `placeholder` | Text displayed when rien n'est selectionné | Yes |
| `minValues` | Minimum number of options to selectionner (default: 1) | No |
| `maxValues` | Maximum number of options to selectionner (default: 1) | No |
| `disabled` | `true` to disable le menu, `false` (default) | No |

## Description

A **string select** est un select menu où les options sont strings of becauseactères définies par le développeur. Après avoir created le menu with `$addStringSelect`, ajoutez les options with `$addStringSelectOption`.

Contrairement to `$newSelectMenu` + `$addSelectMenuOption`, `$addStringSelect` and `$addStringSelectOption` utilisent une API simplifiée où le `menuId` is optional in `$addStringSelectOption`.

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

### Menu to selection multiple

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

- Les options sont ajoutées with `$addStringSelectOption`.
- Maximum 25 options par menu.
- Use `$addActionRow` to placer le menu on a row specific.
