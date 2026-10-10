---
layout: doc
translation_key: docs
description: Starts a new action row for buttons.
category: "Components & Interactions"
---

# $addActionRow

Starts a new, empty action row. The buttons added afterwards with `$addButtonCV2` are placed in this row.

## Syntax

```text
$addActionRow[(id);(containerId)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `id` | Identifier of the row. It can be given as the `rowId` argument of `$addButtonCV2` to put a button in this row. | No |
| `containerId` | Accepted but not used by the engine: it has no effect. | No |

## Description

An **action row** groups buttons on one horizontal line of a message. A message holds at most 5 action rows (otherwise the error `A message supports at most 5 component rows.` is raised) and a row holds at most 5 buttons.

`$addActionRow` only creates the row; the row must receive at least one component, otherwise the response fails with `Invalid component row size.` (for example a trailing `$addActionRow`, or two `$addActionRow` in a row).

Select menus do not go in a row opened by `$addActionRow`: every select menu function (`$addStringSelect`, `$addUserSelect`, ...) creates its own row. A select menu added right after `$addActionRow` leaves the empty row behind and the response fails with `Invalid component row size.`

Components belong to the **response message** of the script (the text written in the script and the embed functions). A message sent with `$sendMessage[]` is a separate message and carries no components.

## Examples

### Simple row

```bdfd
$addActionRow
$addButtonCV2[btn_1;Click me;primary]
Here is a button!
```

### With an identifier

```bdfd
$addActionRow[row_buttons]
$addButtonCV2[btn_ok;OK;success]
$addButtonCV2[btn_cancel;Cancel;danger]
Confirm your choice
```

### Several rows

```bdfd
$addActionRow
$addButtonCV2[btn_1;Button 1;primary]
$addButtonCV2[btn_2;Button 2;primary]
$addActionRow
$addButtonCV2[btn_3;Button 3;secondary]
Two rows of buttons
```

## Notes

- Without `$addActionRow`, `$addButtonCV2` puts the button in the last row when that row only contains buttons and has fewer than 5 of them, and starts a new row otherwise.
- Use `$addActionRow` first to place buttons inside a container (`$addContainer`): a button added directly after `$addContainer` or `$addSection` is not kept in the final message.
- A button or select menu cannot be added after `$addTextDisplay`, `$addSeparator`, `$addThumbnail`, `$addMediaGallery` or `$addFile` in the same response (the call fails with `type 'Null' is not a subtype of type 'List<dynamic>' in type cast`). Add buttons and select menus first.
