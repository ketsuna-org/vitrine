---
layout: doc
translation_key: docs
category: "Components & Interactions"
---

# $newSelectMenu

Creates a new select menu in the current action row. A select menu allows users to choose from a list of predefined options.

## Syntax

```
$newSelectMenu[customId;minValues;maxValues;(placeholder);(messageID)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom identifier for the interaction | Yes |
| `minValues` | Minimum number of options that must be chosen (0 to 25) | Yes |
| `maxValues` | Maximum number of options that can be chosen (1 to 25, not below `minValues`) | Yes |
| `placeholder` | Text displayed when no option is selected (150 characters at most) | No |
| `messageID` | Message holding the menu | No |

## Description

`$newSelectMenu` initializes a drop-down menu in the message. After creating it, use `$addSelectMenuOption` to add options. The menu is then sent along with a message.

## Examples

### Simple Menu

```bdfd
$newSelectMenu[color_menu;1;1;Choose a color]
$addSelectMenuOption[color_menu;Red;red;The color red;🔴]
$addSelectMenuOption[color_menu;Blue;blue;The color blue;🔵]
$addSelectMenuOption[color_menu;Green;green;The color green;🟢]
$sendMessage[Select your favorite color]
```

### Multiple Selection Menu

```bdfd
$newSelectMenu[fruits_menu;1;3;Choose your fruits]
$addSelectMenuOption[fruits_menu;Apple;apple;;🍎]
$addSelectMenuOption[fruits_menu;Banana;banana;;🍌]
$addSelectMenuOption[fruits_menu;Orange;orange;;🍊]
$addSelectMenuOption[fruits_menu;Grape;grape;;🍇]
$addSelectMenuOption[fruits_menu;Strawberry;strawberry;;🍓]
$sendMessage[Select 1 to 3 fruits]
```

## Interaction Handling

Read the clicked menu with `$customID` in the interaction callback:

```bdfd
$if[$customID==color_menu]
  $sendMessage[You chose: $message]
$endif
```

## Notes

- Each menu must have a unique `customId` to identify the interaction.
- Only one select menu is allowed per action row.
- Up to 25 options can be added per menu.
- For specialized select menus (users, roles, channels), use dedicated functions (e.g. `$addUserSelect`, `$addRoleSelect`, etc.).
