---
layout: doc
translation_key: docs
description: Starts a new action row for buttons or select menus.
category: "Components & Interactions"
---

# $addActionRow

Starts a new action row to contain buttons or select menus.

## Syntax

```
$addActionRow[(id)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `id` | Custom identifier for the action row | No |

## Description

An **action row** is a container that groups interactive components (buttons, select menus) on the same horizontal row in a Discord message. Each message can contain up to 5 action rows, and each action row can contain up to 5 buttons or 1 select menu.

`$addActionRow` must be called before adding components (buttons, select menus) to organize them on distinct rows.

## Examples

### Simple row

```
$addActionRow
$addButtonCV2[btn_1;Click me;primary]
$sendMessage[Here is a button!]
```

### With custom ID

```
$addActionRow[row_buttons]
$addButtonCV2[btn_ok;OK;success]
$addButtonCV2[btn_cancel;Cancel;danger]
$sendMessage[Confirm your choice]
```

### Multiple rows

```
$addActionRow
$addButtonCV2[btn_1;Button 1;primary]
$addButtonCV2[btn_2;Button 2;primary]

$addActionRow
$addButtonCV2[btn_3;Button 3;secondary]
$sendMessage[Two rows of buttons]
```

## Notes

- Each `$addActionRow` creates a new row. The components added afterward will be placed on that row.
- Without `$addActionRow`, components are placed on a row by default.
- An action row can only contain buttons OR a single select menu, not both.
- Maximum of 5 action rows per message.

