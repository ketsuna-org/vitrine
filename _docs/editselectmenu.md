---
layout: doc
title: $editSelectMenu
translation_key: docs
category: "Components & Interactions"
function_name: editSelectMenu
syntax: $editSelectMenu[customId;minValues;maxValues;(placeholder);(messageID)]
description: "Modifies the properties of an existing string select menu: placeholder text, minimum and maximum number of selectable values."
---

# $editSelectMenu

The `$editSelectMenu[]` function **modifies an existing string select menu**, either in the response being built or on a message sent by the bot.

## Syntax

```
$editSelectMenu[customId;minValues;maxValues;(placeholder);(messageID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `customId` | The custom ID of the select menu to modify (1 to 100 characters). |
| `minValues` | Required. Minimum number of selections (integer from 0 to 25). |
| `maxValues` | Required. Maximum number of selections (integer from 1 to 25). |
| `placeholder` | *(Optional)* Placeholder text (0 to 150 characters); empty by default. |
| `messageID` | *(Optional)* ID of an existing message sent by the bot (a positive integer, otherwise "Invalid message ID."). If omitted or empty, the response being built is edited. |

## Return value

An empty string. The select menu is modified.

## Behavior

- The targeted menu must be a **string select menu** that exists, otherwise the error "Component <id> not found." is raised. User, role, mentionable and channel select menus cannot be edited with this function.
- **Without `messageID`, only the menus added earlier in the same script are searched.** In the script run when a menu is used, the message holding it is not part of the response being built, so give its ID in `messageID`.
- With `messageID`, the engine reads that message's components and applies the edit when the response is flushed. Only messages sent by the bot, in the current channel, can be edited, and messages that contain Components V2 layout components cannot.
- `minValues` must be ≤ `maxValues` ("Minimum cannot exceed maximum."), and `maxValues` cannot be higher than the number of options of the menu (`Select menu option count does not support its selection bounds.`).
- The placeholder is always replaced (empty if the argument is omitted).
- The options of the menu are not changed; use `$editSelectMenuOption[]` for that.

## Examples

### Update after selection

```bdfd
$editSelectMenu[langMenu;0;1;Language chosen!;123456789012345678]
```

### Edit a menu of the response being built

```bdfd
$newSelectMenu[levelMenu;1;1;Level]
$addSelectMenuOption[levelMenu;Easy;easy;;no]
$addSelectMenuOption[levelMenu;Hard;hard;;no]
$editSelectMenu[levelMenu;0;1;Pick a level (optional)]
Choose a level
```

### Reset a dynamic select menu

```bdfd
$editSelectMenu[categoryMenu;1;3;Select a category;123456789012345678]
```

## Notes

- To modify the menu options, use `$editSelectMenuOption[]`.
- `maxValues=1` creates a single-choice menu, `>1` a multi-choice menu.
