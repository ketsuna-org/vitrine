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
| `messageID` | *(Optional)* ID of an existing message sent by the bot whose components are edited. If omitted or empty, the buttons of the response being built are edited. Must be a positive integer ("Invalid message ID."). |

## Behavior

- The target button (found by its custom ID, or by its URL for Link buttons) must exist, otherwise the error "Component <id> not found." is raised.
- **Without `messageID`, only the components added earlier in the same script are searched.** In the script run for a button click, the clicked message is not part of the response being built, so give its ID in `messageID`.
- With `messageID`, the engine reads that message's components and applies the edit when the response is flushed. Only messages sent by the bot, in the current channel, can be edited, and messages that contain Components V2 layout components (container, section, text display, ...) cannot.
- The button's label, style, disabled state, and emoji are all replaced: omitted optional values go back to their defaults.
- For `link` style, `idOrUrl` must be an HTTP(S) URL; otherwise it is the custom ID (1 to 100 characters). The custom ID itself cannot be changed.

## Examples

### Disable a button after click

```bdfd
$if[$customID==accept]
  $editButton[accept;Accepted;success;yes;✅;123456789012345678]
$endif
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

## Notes

- For Link buttons, use the URL as the first parameter.
- To add or remove buttons on an existing message, see `$addButton` and `$removeButtons`.
