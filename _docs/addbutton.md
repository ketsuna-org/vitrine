---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addButton

Adds an interactive button to the message (legacy style). Allows controlling the placement via the `newRow` parameter.

## Syntax

```
$addButton[newRow;customIdOrURL;label;(style);(disabled);(emoji);(messageId)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `newRow` | `"yes"` creates a new row before the button, `"no"` adds it to the current line | Yes |
| `customIdOrURL` | Custom ID to handle the click, or URL for a link button | Yes |
| `label` | Text displayed on the button | Yes |
| `style` | Style of the button: `primary` (default), `secondary`, `success`, `danger`, `link` | No |
| `disabled` | `true` to disable the button, `false` (default) | No |
| `emoji` | Emoji to display before the label | No |
| `messageId` | Target message ID (for editing) | No |

## Available styles

| Style | Color | Typical usage |
|-------|-------|---------------|
| `primary` | Blue/violet | Main action |
| `secondary` | Grey | Secondary action |
| `success` | Green | Confirmation |
| `danger` | Red | Destructive action |
| `link` | Grey (link) | External URL |

## Examples

### Simple button

```
$addButton[no;my_button;Click here;primary;false;😊]
$sendMessage[Press the button]
```

### New line with two buttons

```
$addButton[no;btn_ok;✅ Validate;success]
$addButton[no;btn_no;❌ Decline;danger]
$sendMessage[Choose an option]
```

### Disabled button with emoji

```
$addButton[no;btn_lock;🔒 Locked;secondary;true]
$sendMessage[Action not available]
```

## Notes

- This legacy style is kept for backward compatibility.
- For new bots, prefer `$addButtonCV2` which offers a cleaner API.
- The `newRow` parameter allows fine-grained control of the layout.
- Max 5 buttons per action row.

