---
layout: doc
translation_key: docs
description: Adds an interactive button to a message (legacy style).
category: "Components & Interactions"
---

# $addButton

Adds an interactive button to the message (legacy style). Allows controlling the placement via the `newRow` parameter.

## Syntax

```bdfd
$addButton[newRow;customIdOrURL;label;style;(disabled);(emoji);(messageId)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `newRow` | `yes` (or `true`) starts a new action row for the button; `no` (or `false`, or empty) adds it to the last row when that row holds only buttons and has fewer than 5 of them, otherwise it starts a new row. Any other value is an error. | Yes |
| `customIdOrURL` | Custom ID (1 to 100 characters, unique in the message) to handle the click, or an `http(s)` URL for a `link` button | Yes |
| `label` | Text displayed on the button, up to 80 characters. May be empty only if an emoji is given | Yes |
| `style` | Style of the button, in lowercase: `primary`, `secondary`, `success`, `danger` or `link`. There is **no default**: the argument must be present and any other value is an error ("Invalid button style.") | Yes |
| `disabled` | `yes`/`true` to disable the button, `no`/`false` (or empty) to keep it enabled. Any other value is an error | No |
| `emoji` | Emoji to display before the label | No |
| `messageId` | Numeric ID of an existing message to add the button to instead of the response being built | No |

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

```bdfd
$addButton[no;my_button;Click here;primary;false;😊]
$sendMessage[Press the button]
```

### Two buttons on the same row

```bdfd
$addButton[no;btn_ok;✅ Validate;success]
$addButton[no;btn_no;❌ Decline;danger]
$sendMessage[Choose an option]
```

### Disabled button with emoji

```bdfd
$addButton[no;btn_lock;🔒 Locked;secondary;true]
$sendMessage[Action not available]
```

## Notes

- This legacy style is kept for backward compatibility.
- For new bots, prefer `$addButtonCV2` which offers a cleaner API.
- The `newRow` parameter allows fine-grained control of the layout.
- Max 5 buttons per action row and 5 action rows per message; going over is an error.
- Link buttons (`link` style) need a valid `http(s)` URL in `customIdOrURL`; the other styles need a custom ID.

