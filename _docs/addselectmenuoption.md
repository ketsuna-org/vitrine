---
layout: doc
translation_key: docs
category: "Components & Interactions"
---

# $addSelectMenuOption

Adds an option to a string select menu: a menu created with `$newSelectMenu` or `$addStringSelect`, a menu of an existing message, or the string select of the modal being built (`$addModalSelect`).

## Syntax

```text
$addSelectMenuOption[menuId;label;value;description;(default);(emoji);(messageID)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `menuId` | Custom ID of the target menu (1 to 100 characters). | Yes |
| `label` | Text displayed for the option (1 to 100 characters). | Yes |
| `value` | Value sent when the option is chosen (1 to 100 characters). It must be unique in the menu (`Select option values must be unique.`). | Yes |
| `description` | Description displayed under the label (0 to 100 characters). The argument must be present but may be empty. | Yes |
| `default` | `yes`/`true` to preselect this option, `no`/`false` (default, also when empty) otherwise. Any other value raises `Expected yes or no`. Only one default option is allowed per menu (`Only one default option is supported.`). | No |
| `emoji` | Emoji displayed to the left of the label. | No |
| `messageID` | ID of an existing message sent by the bot (a positive integer): the option is added to the menu of that message instead of the response being built. | No |

## Description

Call it after the menu exists. Each call adds one option; a menu holds at most 25 options (`A select menu supports at most 25 options.`). If no string select menu has the custom ID `menuId`, the error `Component <id> not found.` is raised. When the modal being built contains a select menu with this custom ID, the option goes to that modal select, which must be of type `string` (otherwise `Only string selects take options.`).

## Examples

### Options with descriptions

```bdfd
Which language do you prefer?
$newSelectMenu[menu_lang;1;1;Choose a language]
$addSelectMenuOption[menu_lang;JavaScript;js;Dynamic web language;no;🟨]
$addSelectMenuOption[menu_lang;Python;py;Polyvalent language;no;🐍]
$addSelectMenuOption[menu_lang;Rust;rs;High-performance system language;no;🦀]
```

### Option by default

```bdfd
Choose your theme
$newSelectMenu[menu_theme;1;1;Theme]
$addSelectMenuOption[menu_theme;Light;light;Light mode;no;☀️]
$addSelectMenuOption[menu_theme;Dark;dark;Dark mode;yes;🌙]
```

### Options with an emoji and no description

```bdfd
React to this message
$newSelectMenu[menu_react;1;1;Quick reaction]
$addSelectMenuOption[menu_react;Like;like;;no;👍]
$addSelectMenuOption[menu_react;Love;love;;no;❤️]
$addSelectMenuOption[menu_react;Laugh;laugh;;no;😂]
$addSelectMenuOption[menu_react;Wow;wow;;no;😮]
```

## Notes

- `menuId` must match exactly the `customId` of the menu.
- The `value` of the chosen option is read with `$getStringSelectValue[index]` in the script run for the interaction.
- The menu must end up with at least as many options as its `maxValues`.
