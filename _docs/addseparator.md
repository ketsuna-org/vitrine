---
layout: doc
translation_key: docs
category: "Components & Interactions"
---

# $addSeparator

Adds a visual separator in the current action row. Useful to space out or visually group components.

## Syntax

```
$addSeparator[(divider);(spacing)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `divider` | `"yes"` to display a separation line, `"no"` (default) | No |
| `spacing` | Size of the spacing (values: `sm`, `md`, `lg`) | No |

## Description

`$addSeparator` inserts a space or a separation line between components of the same action row. It does not create a new row — for that, use `$addActionRow`.

## Spacing options

| Value | Approximate size |
|--------|---------------------|
| `sm` | Small spacing |
| `md` | Medium spacing |
| `lg` | Large spacing |

## Examples

### Simple separator

```
$addActionRow
$addButtonCV2[btn_left;Left;primary]
$addSeparator
$addButtonCV2[btn_right;Right;secondary]
$sendMessage[Spaced buttons]
```

### With a separation line

```
$addActionRow
$addButtonCV2[btn_1;Option A;success]
$addSeparator[yes]
$addButtonCV2[btn_2;Option B;danger]
$sendMessage[Options separated by a line]
```

### Large spacing

```
$addActionRow
$addTextDisplay[Text to the left]
$addSeparator[no;lg]
$addTextDisplay[Text to the right]
$sendMessage[Well-spaced text]
```

## Notes

- The separator is inserted in the current action row.
- It does not count towards the limit of 5 components per line.
- The separation line (`divider: yes`) is a thin horizontal line.
- Compatible with all components: buttons, select menus, text displays.

