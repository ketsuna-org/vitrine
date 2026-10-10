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

The `$editButton[]` function **modifies a button** that already exists on a message.

## Syntax

```
$editButton[idOrUrl;label;style;(disabled);(emoji);(messageID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `idOrUrl` | Custom ID of the button (or URL for Link buttons). |
| `label` | Required. New text displayed on the button (0 to 80 characters; may be empty only if an emoji is given, otherwise the error "A button needs a label or emoji." is raised). |
| `style` | Required. Style: `primary`, `secondary`, `success`, `danger`, `link` (otherwise "Invalid button style."). |
| `disabled` | *(Optional)* `yes`/`true` to disable the button, `no`/`false` or empty for enabled (default). Any other value is an error. |
| `emoji` | *(Optional)* Emoji of the button (empty by default). |
| `messageID` | *(Optional)* ID of an existing message whose components are edited. If omitted or empty, the buttons of the response being built are edited. Must be a positive integer. |

## Behavior

- The target button (found by its custom ID, or by its URL for Link buttons) must exist, otherwise the error "Component <id> not found." is raised.
- Without `messageID`, it edits the component rows of the response currently being built; with `messageID`, it reads that message's components and the edit is applied when the response is flushed.
- The button's label, style, disabled state, and emoji are all replaced: omitted optional values go back to their defaults.
- For `link` style, `idOrUrl` must be an HTTP(S) URL; otherwise it is the custom ID (1 to 100 characters).

## Examples

### Disable a button after click

```bdfd
$editButton[accept;✅ Accepted;success;true;✅]
$editButton[refuse;❌ Refused;danger;true;❌]
```

### Changing the style of a button

```bdfd
$editButton[action;Processing...;secondary;true;⏳]
```

### Resetting a button

```bdfd
$editButton[reset;🔄 Restart;primary;false;🔄]
```

## Notes

- Works with `$onInteraction` for dynamic updates.
- For Link buttons, use the URL as the first parameter.
