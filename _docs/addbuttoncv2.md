---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addButtonCV2

Adds an interactive button to the message using the Component V2 style. This button is always added to the current action row.

## Syntax

```
$addButtonCV2[customIdOrURL;label;(style);(disabled);(emoji)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customIdOrURL` | Custom ID to handle the click, or URL for a link button | Yes |
| `label` | Text displayed on the button | Yes |
| `style` | Style: `primary` (default), `secondary`, `success`, `danger`, `link` | No |
| `disabled` | `true` to disable the button, `false` (default) | No |
| `emoji` | Emoji to display before the label | No |

## Difference from $addButton

Unlike `$addButton` (legacy), `$addButtonCV2` does not have a `newRow` parameter. To organize buttons on multiple lines, use `$addActionRow` before each group.

## Examples

### Simple button

```
$addButtonCV2[my_button;Click here;primary]
$sendMessage[Press the button]
```

### Multiple buttons on distinct rows

```
$addActionRow
$addButtonCV2[btn_yes;✅ Yes;success]
$addButtonCV2[btn_no;❌ No;danger]

$addActionRow
$addButtonCV2[btn_maybe;🤔 Maybe;secondary]
$sendMessage[Make your choice]
```

### Link button

```
$addButtonCV2[https://discord.com;Discord Website;link;false;🌐]
$sendMessage[Visit the website]
```

### Disabled button

```
$addButtonCV2[btn_disabled;Unavailable;primary;true;🚫]
$sendMessage[Feature coming soon]
```

## Handling interactions

Clicks on buttons are handled via the `$onInteraction` event:

```
$onInteraction
$if[$customID==my_button]
  $sendMessage[You clicked!]
$endif
```

## Notes

- No `newRow` parameter: use `$addActionRow` for layout control.
- Max 5 buttons per action row.
- Recommended API for new developments.

