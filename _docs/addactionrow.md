---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addActionRow

Starts a new action row to contain of buttons or select menus.

## Syntax

```
$addActionRow[(id)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `id` | Custom identifier for the action row | No |

## Description

A **action row** est a container qui regroupe of components interactifs (buttons, select menus) sur the same row horizontal in a Discord message. Each message can contain up to 5 action rows, and each action row can contain up to 5 buttons or 1 select menu.

`$addActionRow` must be called before adding of components (buttons, select menus) for organize sur of rows distinctes.

## Examples

### Simple row

```
$addActionRow
$addButtonCV2[btn_1;Cliquez-moi;primary]
$sendMessage[Voici a button !]
```

### With custom ID

```
$addActionRow[row_buttons]
$addButtonCV2[btn_ok;OK;success]
$addButtonCV2[btn_cancel;Annuler;danger]
$sendMessage[Confirmez votre choix]
```

### Multiple rows

```
$addActionRow
$addButtonCV2[btn_1;Bouton 1;primary]
$addButtonCV2[btn_2;Bouton 2;primary]

$addActionRow
$addButtonCV2[btn_3;Bouton 3;secondary]
$sendMessage[Deux rangées de buttons]
```

## Notes

- Each `$addActionRow` crée une new row. The components added afterward will be placés on that row.
- Without `$addActionRow`, les components are placed sur a row by default.
- Une action row ne can contain que of buttons OU a single select menu, not both.
- Maximum 5 action rows par message.
