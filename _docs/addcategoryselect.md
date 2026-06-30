---
layout: doc
translation_key: docs
category: "Components & Interactions"
---

# $addCategorySelect

Creates a select menu of server categories. Allows users to choose one or multiple categories.

## Syntax

```
$addCategorySelect[customId;placeholder;(minValues);(maxValues);(disabled)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom identifier for the interaction | Yes |
| `placeholder` | Text displayed when nothing is selected | Yes |
| `minValues` | Minimum number of categories to select (default: 1) | No |
| `maxValues` | Maximum number of categories to select (default: 1) | No |
| `disabled` | `true` to disable the menu, `false` by default | No |

## Description

`$addCategorySelect` adds a **category select menu** to a message. This component is similar to `$addChannelSelect` but is restricted to server **categories** only. The user can select one or multiple categories, and the interaction returns the selected category IDs.

This function must be placed after `$addActionRow` to be organized on a specific row.

## Examples

### Category selection

```
$addActionRow
$addCategorySelect[menu_cat;Choose a category]
$sendMessage[Select a category]
```

### Multiple categories

```
$addActionRow
$addCategorySelect[menu_cats;Select categories;1;5]
$sendMessage[Select up to 5 categories]
```

### Disabled menu

```
$addActionRow
$addCategorySelect[menu_cat_disabled;Unavailable;1;1;true]
$sendMessage[This menu is currently disabled]
```

## Handling the interaction

```
$onInteraction
$if[$customID==menu_cat]
  $sendMessage[Selected category: <#$message>]
$endif
```

## Notes

- The returned values are Discord category IDs.
- Use `<#ID>` to mention a category.
- Only server **categories** appear in the menu, not individual channels.
- An action row can contain only **one** select menu.
