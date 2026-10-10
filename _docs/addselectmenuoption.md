---
layout: doc
translation_key: docs
category: "Components & Interactions"
---

# $addSelectMenuOption

Adds an option to an existing select menu created with `$newSelectMenu`.

## Syntax

```bdfd
$addSelectMenuOption[menuId;label;value;description;(default);(emoji);(messageID)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `menuId` | Identifier of the target menu (the one from `$newSelectMenu`) | Yes |
| `label` | Text displayed for the option | Yes |
| `value` | Value sent when the option is chosen | Yes |
| `description` | Additional description displayed under the label (may be empty, but the slot is required) | Yes |
| `default` | `true` to preselect this option, `false` (default) | No |
| `emoji` | Emoji displayed to the left of the label | No |
| `messageID` | ID of an existing message whose menu is edited instead of the one being built | No |

## Description

This function must be called after `$newSelectMenu` to populate the menu. Each call adds an option to the menu specified by `menuId`.

## Examples

### Options with descriptions

```bdfd
$newSelectMenu[menu_lang;1;1;Choose a language]
$addSelectMenuOption[menu_lang;JavaScript;js;Dynamic web language;false;🟨]
$addSelectMenuOption[menu_lang;Python;py;Polyvalent language;false;🐍]
$addSelectMenuOption[menu_lang;Rust;rs;High-performance system language;false;🦀]
$sendMessage[Which language do you prefer?]
```

### Option by default

```bdfd
$newSelectMenu[menu_theme;1;1;Theme]
$addSelectMenuOption[menu_theme;Light;light;Light mode;false;☀️]
$addSelectMenuOption[menu_theme;Dark;dark;Dark mode;true;🌙]
$sendMessage[Choose your theme]
```

### Menu with emojis only

```bdfd
$newSelectMenu[menu_react;1;1;Quick reaction]
$addSelectMenuOption[menu_react;Like;like;;false;👍]
$addSelectMenuOption[menu_react;Love;love;;false;❤️]
$addSelectMenuOption[menu_react;Laugh;laugh;;false;😂]
$addSelectMenuOption[menu_react;Wow;wow;;false;😮]
$sendMessage[React to this message]
```

## Notes

- The `menuId` must correspond exactly to the `customId` of `$newSelectMenu`.
- Maximum of 25 options per menu.
- The `value` fields are the values read when the menu is used (see `$getStringSelectValue`).
