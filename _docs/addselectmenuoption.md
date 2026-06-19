---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addSelectMenuOption

Adds an option to un select menu existing, created with `$newSelectMenu`.

## Syntax

```
$addSelectMenuOption[menuId;label;value;(description);(emoji);(default)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `menuId` | Identifier of the menu target (celui of `$newSelectMenu`) | Yes |
| `label` | Text displayed for the option | Yes |
| `value` | Value rsente when the option est choisie | Yes |
| `description` | Description supplémentaire displayede sous le label | No |
| `emoji` | Emoji displayed to the left of the label | No |
| `default` | `true` pour préselectionner cette option, `false` (default) | No |

## Description

Cette function must be called after `$newSelectMenu` pour peupler le menu. Each call ajoute une option to the menu spécifié par `menuId`.

## Examples

### Options with descriptions

```
$newSelectMenu[menu_lang;Choisissez un langage]
$addSelectMenuOption[menu_lang;JavaScript;js;Langage web dynamic;🟨]
$addSelectMenuOption[menu_lang;Python;py;Langage polyvaslow;🐍]
$addSelectMenuOption[menu_lang;Rust;rs;Langage système performant;🦀]
$sendMessage[Quel langage préférez-vous ?]
```

### Option by default

```
$newSelectMenu[menu_theme;Thème;1;1]
$addSelectMenuOption[menu_theme;Clair;light;Mode clair;☀️]
$addSelectMenuOption[menu_theme;Sombre;dark;Mode sombre;🌙;true]
$sendMessage[Choisissez votre thème]
```

### Menu with emojis only

```
$newSelectMenu[menu_react;Réaction fast]
$addSelectMenuOption[menu_react;Like;like;;👍]
$addSelectMenuOption[menu_react;Love;love;;❤️]
$addSelectMenuOption[menu_react;Laugh;laugh;;😂]
$addSelectMenuOption[menu_react;Wow;wow;;😮]
$sendMessage[Réagissez to this message]
```

## Notes

- Le `menuId` doit correspondre exactly to the `customId` of the `$newSelectMenu`.
- Maximum 25 options par menu.
- Les `value` sont les values receivedes in `$onInteraction`.
