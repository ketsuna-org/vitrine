---
layout: doc
title: $removeAllComponents[]
translation_key: docs
category: "Components & Interactions"
function_name: removeAllComponents
syntax: $removeAllComponents[(messageID)]
description: Removes all components from the response being built, or from an existing message sent by the bot.
---

# $removeAllComponents[] — Remove All Components

`$removeAllComponents[]` removes every component (buttons, select menus, action rows, containers, ...) either from the response being built or, with a message ID, from a message the bot already sent.

## Syntax

```text
$removeAllComponents[(messageID)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:--------:|
| `messageID` | ID of an existing message sent by the bot (a positive integer, otherwise `Invalid message ID.`). Without it (or when empty), the **clicked message** is targeted in the script run for a click; elsewhere the components staged in the current script are cleared. | No |

## Return Value

Returns an empty string.

## Behavior

- **Without `messageID`**, in the script run for a button or select menu click, the **clicked message** is edited. Anywhere else, only the components added earlier in the same script (`$addButton`, `$addButtonCV2`, `$addStringSelect`, ...) are cleared; components added after the call are kept.
- **With `messageID`** (or on the clicked message), the engine reads the components of that message and stages an edit that empties them; the edit is applied when the response is flushed. This needs the bot's component service: without it the function fails with `No component service configured.` Only a message of the bot can be edited (`Only bot-authored message components can be edited.`); an ephemeral message cannot be edited by its ID.
- **A Components V2 message keeps its layout** (containers, sections, texts, separators, ...): Discord refuses it empty, so only the buttons and the select menus are removed. A button used as the accessory of a section cannot be removed (`A button used as a section accessory cannot be removed.`).
- The text of the message is not changed: use `$editMessage` for that.

## Examples

### Clear the components of the response being built

```bdfd
Panel closed
$addButtonCV2[yes;Yes;primary]
$removeAllComponents
```

### Remove the components of the clicked message

Workflow with the event `interactionCreate` and the custom ID filter (`customIdFilter`) `submit_form`. `$customID` only exists in the script run for the click, never in the slash command.

```bdfd
$removeAllComponents
```

### Remove the components of a given message

```bdfd
$removeAllComponents[123456789012345678]
```

## Comparison of removal functions

| Function | Effect |
|----------|--------|
| `$removeComponent[customId]` | Removes one component (by custom ID or URL) |
| `$removeButtons` | Removes all buttons only |
| `$removeAllComponents` | Removes **all** components |

## Notes

- All three functions accept an optional `messageID` as their last argument.
