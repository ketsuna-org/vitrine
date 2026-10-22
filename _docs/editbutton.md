---
layout: doc
title: $editButton
translation_key: docs
category: "Components & Interactions"
function_name: editButton
syntax: $editButton[idOrUrl;label;style;(disabled);(emoji);(messageID)]
description: Modifies an existing button on a message. Replaces the label, style, disabled state, and emoji of a button.
---

# $editButton

The `$editButton[]` function **modifies a button** that already exists, either in the response being built or on a message sent by the bot.

## Syntax

```
$editButton[idOrUrl;label;style;(disabled);(emoji);(messageID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `idOrUrl` | Custom ID of the button (or URL for Link buttons). |
| `label` | Required. New text displayed on the button (0 to 80 characters; may be empty only if an emoji is given, otherwise the error "A button needs a label or emoji." is raised). |
| `style` | Required. Style: `primary`, `secondary`, `success`, `danger`, `link` (lowercase, otherwise "Invalid button style."). |
| `disabled` | *(Optional)* `yes`/`true` to disable the button, `no`/`false` or empty for enabled (default). Any other value is an error. |
| `emoji` | *(Optional)* Emoji of the button (empty by default). |
| `messageID` | *(Optional)* ID of an existing message sent by the bot whose components are edited. If omitted or empty, the button is searched in the response being built and, in the script run for a click, in the clicked message. Must be a positive integer ("Invalid message ID."). |

## Behavior

- The target button (found by its custom ID, or by its URL for Link buttons) must exist, otherwise the error "Component <id> not found." is raised.
- **Without `messageID`**, the button is first searched among the components added earlier in the same script. In the script run for a button or select menu click, if it is not there, **the clicked message is edited**. Outside a click script, only the response being built is searched.
- With `messageID`, the engine reads that message's components and applies the edit when the response is flushed. Only messages sent by the bot, in the current channel, can be edited (`Only bot-authored message components can be edited.`); an ephemeral message cannot be edited by its ID.
- **Components V2 messages can be edited**: the button is found at any depth (container, section accessory, action row), and the layout and the Components V2 flag of the message are kept.
- The button's label, style, disabled state, and emoji are all replaced: omitted optional values go back to their defaults.
- For `link` style, `idOrUrl` must be an HTTP(S) URL; otherwise it is the custom ID (1 to 100 characters). The custom ID itself cannot be changed.

## Examples

### Disable a button after click

Workflow with the event `interactionCreate` and the custom ID filter (`customIdFilter`) `accept`. `$customID` only exists in the script run for the click, never in the slash command. Without `messageID`, the clicked message is edited.

```bdfd
$editButton[$customID;Accepted;success;yes;✅]
```

### Edit a button of a given message

```bdfd
$editButton[accept;Accepted;success;yes;✅;123456789012345678]
```

### Edit a button of the response being built

```bdfd
$addButtonCV2[action;Start;primary]
$editButton[action;Processing...;secondary;yes;⏳]
Status
```

### Resetting a button

```bdfd
$editButton[reset;Restart;primary;no;🔄;123456789012345678]
```

A message with a Components V2 layout works the same way; to change its texts, use `$editTextDisplay` or `$editMessageCV2`.

## Notes

- For Link buttons, use the URL as the first parameter.
- To add or remove buttons on an existing message, see `$addButton` and `$removeButtons`.
