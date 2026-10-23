---
layout: doc
title: $removeSelectMenuOption
translation_key: docs
category: "Components & Interactions"
function_name: removeSelectMenuOption
syntax: $removeSelectMenuOption[Menu ID;Value;(Message ID)]
description: Removes one option, identified by its value, from a string select menu.
---

# $removeSelectMenuOption

`$removeSelectMenuOption` **removes an option** from a string select menu, in the response being built or in a message of the bot.

## Syntax

```text
$removeSelectMenuOption[Menu ID;Value;(Message ID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `Menu ID` | Custom ID of the string select menu (1 to 100 characters). |
| `Value` | Value of the option to remove (not its label). |
| `Message ID` | *(Optional)* ID of a message sent by the bot (a positive integer, otherwise `Invalid message ID.`). |

## Behavior

- The menu must be a string select menu, otherwise `Component <id> not found.` An unknown value raises `Select option not found.`
- **Without `Message ID`**, the menu of the response being built is edited first; in the script run for a click, if that menu is not in the response, the **clicked message** is edited.
- **With `Message ID`**, the message is read and rewritten when the response is flushed. A message with a Components V2 layout can be edited and keeps its layout.
- The selection bounds follow the options that are left: `maxValues` is lowered to the number of options if it is higher, then `minValues` to `maxValues` if it is higher.
- Removing the last option leaves a menu without options, which is refused: `Select menu option count does not support its selection bounds.`
- Only a message written by the bot can be edited (`Only bot-authored message components can be edited.`); an ephemeral message cannot be edited by its ID.

## Examples

### Button in an `interactionCreate` workflow

The message holds a menu `gifts` and a button `take_sword`. Workflow with the event `interactionCreate` and the custom ID filter (`customIdFilter`) `take_sword`. `$customID` only exists in the script run for the click, never in the slash command.

```bdfd
$removeSelectMenuOption[gifts;sword]
```

The option whose value is `sword` disappears from the menu of the clicked message.

### Message chosen by its ID

```bdfd
$removeSelectMenuOption[gifts;sword;$message[1]]
```

## Notes

- To change an option, use `$editSelectMenuOption`; to add one, `$addSelectMenuOption`.
