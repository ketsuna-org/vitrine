---
layout: doc
translation_key: docs
category: "Components & Interactions"
---

# $newSelectMenu

Adds a string select menu to the response message. The user chooses among the options added afterwards with `$addSelectMenuOption`.

## Syntax

```text
$newSelectMenu[customId;minValues;maxValues;(placeholder);(messageID)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom ID that identifies the menu (1 to 100 characters). | Yes |
| `minValues` | Minimum number of options that must be chosen, integer from 0 to 25 (an empty value is an error). | Yes |
| `maxValues` | Maximum number of options that can be chosen, integer from 1 to 25, not below `minValues` (`Minimum cannot exceed maximum.`). | Yes |
| `placeholder` | Text displayed when no option is selected (150 characters at most). | No |
| `messageID` | ID of an existing message sent by the bot (a positive integer): the menu is added to that message instead of the response being built. | No |

## Description

`$newSelectMenu` starts a menu without options and gives it its own action row. Add the options with `$addSelectMenuOption`. When the response is sent, the menu must hold at least `maxValues` options and at most 25, otherwise the response fails with `Select menu option count does not support its selection bounds.`

## Examples

### Simple menu

```bdfd
Select your favorite color
$newSelectMenu[color_menu;1;1;Choose a color]
$addSelectMenuOption[color_menu;Red;red;The color red;no;🔴]
$addSelectMenuOption[color_menu;Blue;blue;The color blue;no;🔵]
$addSelectMenuOption[color_menu;Green;green;The color green;no;🟢]
```

### Multiple selection menu

```bdfd
Select 1 to 3 fruits
$newSelectMenu[fruits_menu;1;3;Choose your fruits]
$addSelectMenuOption[fruits_menu;Apple;apple;;no;🍎]
$addSelectMenuOption[fruits_menu;Banana;banana;;no;🍌]
$addSelectMenuOption[fruits_menu;Orange;orange;;no;🍊]
$addSelectMenuOption[fruits_menu;Grape;grape;;no;🍇]
$addSelectMenuOption[fruits_menu;Strawberry;strawberry;;no;🍓]
```

## Interaction handling

Read the menu with `$customID` and the choice with `$getStringSelectValue[index]` in the script run for the interaction:

```bdfd
$if[$customID==color_menu]
  You chose: $getStringSelectValue[1]
$endif
```

## Notes

- Each menu must have a unique `customId` in the message.
- Only one select menu is allowed per action row: the menu always gets its own row, and a message holds at most 5 rows.
- Up to 25 options can be added per menu.
- `$addStringSelect` creates the same kind of menu with `minValues`/`maxValues` defaulting to 1 and a `disabled` argument.
- For specialized select menus (users, roles, channels), use the dedicated functions (`$addUserSelect`, `$addRoleSelect`, etc.).
