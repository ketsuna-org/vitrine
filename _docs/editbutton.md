---
layout: doc
title: $editButton
translation_key: docs
category: "Embed & Message"
function_name: editButton
syntax: $editButton[idOrUrl;label;(style);(disabled);(emoji)]
description: Modifies an existing button on a message. Allows changing the label, style, disabled state, and emoji of a button.
---

# $editButton

The `$editButton[]` function **modifies a button** that already exists on a message.

## Syntax

```
$editButton[idOrUrl;label;(style);(disabled);(emoji)]
```

## Parameters

| Parameter | Description |
|---|---|
| `idOrUrl` | Custom ID of the button (or URL for Link buttons). |
| `label` | New text displayed on the button. |
| `style` | *(Optional)* Style: `primary`, `secondary`, `success`, `danger`, `link`. |
| `disabled` | *(Optional)* `true` to disable the button, `false` by default. |
| `emoji` | *(Optional)* Emoji to display to the left of the label. |

## Behavior

- The target button must exist in the message currently being edited.
- The modification is applied during the message editing process (via `$editMessage` or similar).
- All parameters except `idOrUrl` and `label` are optional.

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
- Use with `$editMessage` to apply the changes.
