---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addTextDisplay

Adds a text display component in an action row. Allows displaying static text among interactive components.

## Syntax

```
$addTextDisplay[content]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `content` | Text to display in the component | Yes |

## Description

`$addTextDisplay` allows inserting non-interactive text in an action row, alongside buttons and menus. This allows creating richer layouts with labels, descriptions, or indicators.

## Examples

### Label before a button

```
$addActionRow
$addTextDisplay[Status:]
$addButtonCV2[btn_status;Activate;success]
$sendMessage[Controls]
```

### Label before a select

```
$addActionRow
$addTextDisplay[Role:]
$addRoleSelect[menu_role;Choose a role]
$sendMessage[Configuration]
```

### Formatted text with multiple components

```
$addActionRow
$addTextDisplay[Volume]
$addSeparator[no;sm]
$addButtonCV2[vol_down;➖;secondary]
$addButtonCV2[vol_mute;🔇;secondary]
$addButtonCV2[vol_up;➕;secondary]
$sendMessage[Volume control]
```

### Status indicator

```
$addActionRow
$addTextDisplay[🔴 Offline]
$addSeparator[no;md]
$addButtonCV2[btn_refresh;Refresh;primary]
$sendMessage[Service status]
```

## Notes

- The text is purely decorative and non-interactive.
- It does not count towards the limit of 5 interactive components per line (check BDFD version compatibility).
- Useful to add labels or descriptions next to components.
- The content can include emojis to enrich the display.

