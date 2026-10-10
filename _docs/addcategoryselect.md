---
layout: doc
translation_key: docs
category: "Components & Interactions"
---

# $addCategorySelect

Adds a select menu of the server's categories to the response message. The user can choose one or several categories.

## Syntax

```text
$addCategorySelect[customId;(placeholder);(minValues);(maxValues);(disabled);(messageID)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom ID that identifies the menu when it is used (1 to 100 characters). | Yes |
| `placeholder` | Text displayed when nothing is selected. | No |
| `minValues` | Minimum number of categories to select, integer from 0 to 25 (default: 1, also when empty). | No |
| `maxValues` | Maximum number of categories to select, integer from 1 to 25 (default: 1, also when empty). It must not be lower than `minValues` (`Minimum cannot exceed maximum.`). | No |
| `disabled` | `yes`/`true` to disable the menu, `no`/`false` (default, also when empty) otherwise. Any other value raises `Expected yes or no`. | No |
| `messageID` | ID of an existing message sent by the bot (a positive integer, otherwise `Invalid message ID.`). The menu is added to that message instead of the response being built. | No |

## Description

This menu is a channel select restricted to **categories** (similar to `$addChannelSelect`). The selected IDs are read, in the script run for the interaction, with the channel select functions: `$getChannelSelectChannelID[index]`, `$getChannelSelectChannelIDs[separator;(limit)]` and `$getChannelSelectChannelCount`.

The menu always gets its own action row, and a message holds at most 5 rows (`A message supports at most 5 component rows.`). Do not write `$addActionRow` before a select menu: the empty row it creates stays in the message and the response fails with `Invalid component row size.`

The menu belongs to the **response message** of the script (the text written in the script and the embed functions), not to a message sent with `$sendMessage[]`.

## Examples

### Category selection

```bdfd
Select a category
$addCategorySelect[menu_cat;Choose a category]
```

### Multiple categories

```bdfd
Select up to 5 categories
$addCategorySelect[menu_cats;Select categories;1;5]
```

### Disabled menu

```bdfd
This menu is currently disabled
$addCategorySelect[menu_cat_disabled;Unavailable;1;1;yes]
```

## Handling the interaction

The script run when the menu is used reads the choice and identifies the menu with `$customID`:

```bdfd
$if[$customID==menu_cat]
  Selected category: <#$getChannelSelectChannelID[1]>
$endif
```

## Notes

- The values are Discord category IDs; use `<#ID>` to mention a category.
- A single select menu per action row.
