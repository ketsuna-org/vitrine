---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addSelectMenuOption

Adds an option to an existing select menu created with `$newSelectMenu`.

## Syntax

```
$addSelectMenuOption[menuId;label;value;(description);(emoji);(default)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `menuId` | Identifier of the target menu (the one from `$newSelectMenu`) | Yes |
| `label` | Text displayed for the option | Yes |
| `value` | Value sent when the option is chosen | Yes |
| `description` | Additional description displayed under the label | No |
| `emoji` | Emoji displayed to the left of the label | No |
| `default` | `true` to preselect this option, `false` (default) | No |

## Description

This function must be called after `$newSelectMenu` to populate the menu. Each call adds an option to the menu specified by `menuId`.

## Examples

### Options with descriptions

```
$newSelectMenu[menu_lang;Choose a language]
$addSelectMenuOption[menu_lang;JavaScript;js;Dynamic web language;🟨]
$addSelectMenuOption[menu_lang;Python;py;Polyvalent language;🐍]
$addSelectMenuOption[menu_lang;Rust;rs;High-performance system language;🦀]
$sendMessage[Which language do you prefer?]
```

### Option by default

```
$newSelectMenu[menu_theme;Theme;1;1]
$addSelectMenuOption[menu_theme;Light;light;Light mode;☀️]
$addSelectMenuOption[menu_theme;Dark;dark;Dark mode;🌙;true]
$sendMessage[Choose your theme]
```

### Menu with emojis only

```
$newSelectMenu[menu_react;Quick reaction]
$addSelectMenuOption[menu_react;Like;like;;👍]
$addSelectMenuOption[menu_react;Love;love;;❤️]
$addSelectMenuOption[menu_react;Laugh;laugh;;😂]
$addSelectMenuOption[menu_react;Wow;wow;;😮]
$sendMessage[React to this message]
```

## Notes

- The `menuId` must correspond exactly to the `customId` of `$newSelectMenu`.
- Maximum of 25 options per menu.
- The `value` fields are the values received in `$onInteraction`.
