---
layout: doc
title: $removeComponent[]
translation_key: docs
category: "Components & Interactions"
function_name: removeComponent
syntax: $removeComponent[customId;(messageID)]
description: Removes a specific component from the response being built or from an existing message, using its custom ID (or URL for a link button).
---

# $removeComponent[] — Remove a Component

`$removeComponent[]` removes one component, found by its custom ID (or by its URL for a link button), from the response being built or from a message the bot already sent. Action rows left empty are dropped.

## Syntax

```text
$removeComponent[customId;(messageID)]
```

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `customId` | Yes | Custom ID of the component to remove (at most 100 characters, otherwise the engine raises a length error), or the URL of a link button. |
| `messageID` | No | ID of an existing message sent by the bot (a positive integer, otherwise `Invalid message ID.`). Without it (or when empty), the components staged in the current script are searched first and, in the script run for a click, the clicked message after them. |

## Return Value

Returns an empty string. If no component has this custom ID (or URL), the function fails with `Component <id> not found.`

## Behavior

- **Without `messageID`**, the component is searched among the components added earlier in the same script. In the script run for a button or select menu click, if it is not there, **the clicked message is edited**.
- **With `messageID`** (or on the clicked message), the engine reads the components of that message and stages an edit without the component; the edit is applied when the response is flushed. This needs the bot's component service: without it the function fails with `No component service configured.` Only a message of the bot can be edited (`Only bot-authored message components can be edited.`); an ephemeral message cannot be edited by its ID.
- Only buttons and select menus are removed, at any depth of a Components V2 message; containers, sections and texts stay. A button used as the accessory of a section cannot be removed (`A button used as a section accessory cannot be removed.`).
- The text of the message is not changed: use `$editMessage` for that.

## Examples

### Remove a button from the response being built

```bdfd
Choose
$addButtonCV2[confirm_btn;Confirm;success]
$addButtonCV2[cancel_btn;Cancel;danger]
$removeComponent[cancel_btn]
```

### Remove the clicked button

Workflow with the event `interactionCreate` and the custom ID filter (`customIdFilter`) `claim_reward`. `$customID` only exists in the script run for the click, never in the slash command.

```bdfd
$removeComponent[$customID]
```

### Remove a component of a given message

```bdfd
$removeComponent[claim_reward;123456789012345678]
```

## Notes

- The custom ID must match exactly (case-sensitive).
- A missing component is an error, not a silent no-op.
- To remove all buttons at once, use `$removeButtons[]`.
- To remove everything, use `$removeAllComponents[]`.
