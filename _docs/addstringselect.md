---
layout: doc
translation_key: docs
description: Adds a string select dropdown menu to a message.
category: "Components & Interactions"
---

# $addStringSelect

Adds a select menu of type "string" (a dropdown with predefined text options) to the response message. Options are added afterwards with `$addStringSelectOption`.

## Syntax

```text
$addStringSelect[customId;(placeholder);(minValues);(maxValues);(disabled);(messageID)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom ID that identifies the menu when it is used (1 to 100 characters). | Yes |
| `placeholder` | Text displayed when nothing is selected. | No |
| `minValues` | Minimum number of options to select, integer from 0 to 25 (default: 1, also when empty). | No |
| `maxValues` | Maximum number of options to select, integer from 1 to 25 (default: 1, also when empty). It must not be lower than `minValues` (`Minimum cannot exceed maximum.`). | No |
| `disabled` | `yes`/`true` to disable the menu, `no`/`false` (default, also when empty) otherwise. Any other value raises `Expected yes or no`. | No |
| `messageID` | ID of an existing message sent by the bot (a positive integer, otherwise `Invalid message ID.`). The menu is added to that message instead of the response being built; its options must then be added with `$addSelectMenuOption` and the same message ID. | No |

## Description

A **string select** offers options defined by the developer. After `$addStringSelect`, add the options with `$addStringSelectOption`.

When the response is sent, the menu must have at least `maxValues` options and at most 25, otherwise the response fails with `Select menu option count does not support its selection bounds.` (a menu created without any option fails too).

The choice is read, in the script run for the interaction, with `$getStringSelectValue[index]`, `$getStringSelectValues[separator;(limit)]` and `$getStringSelectCount`.

`$addStringSelect` and `$addStringSelectOption` form a simplified pair: `$addStringSelectOption` targets the last string select unless a `menuId` is given. The alternative pair is `$newSelectMenu` + `$addSelectMenuOption`, where the menu ID is always given.

The menu always gets its own action row, and a message holds at most 5 rows (`A message supports at most 5 component rows.`). Do not write `$addActionRow` before a select menu: the empty row it creates stays in the message and the response fails with `Invalid component row size.`

The menu belongs to the **response message** of the script (the text written in the script and the embed functions), not to a message sent with `$sendMessage[]`.

## Examples

### Simple menu

```bdfd
Select your country
$addStringSelect[menu_country;Choose a country]
$addStringSelectOption[France;fr]
$addStringSelectOption[Belgium;be]
$addStringSelectOption[Switzerland;ch]
$addStringSelectOption[Canada;ca]
```

### Menu with multiple selection

```bdfd
What are your hobbies?
$addStringSelect[menu_hobbies;Your hobbies;1;5]
$addStringSelectOption[Reading;reading;;📚]
$addStringSelectOption[Sport;sport;;⚽]
$addStringSelectOption[Music;music;;🎵]
$addStringSelectOption[Video games;gaming;;🎮]
$addStringSelectOption[Cinema;cinema;;🎬]
```

### Disabled menu

```bdfd
This menu is temporarily disabled
$addStringSelect[menu_off;Unavailable;1;1;yes]
$addStringSelectOption[Option A;a]
```

## Handling the interaction

The script run when the menu is used reads the choice and identifies the menu with `$customID`:

```bdfd
$if[$customID==menu_country]
  You chose: $getStringSelectValue[1]
$endif
```

## Notes

- Options are added with `$addStringSelectOption`; a menu holds at most 25 of them.
- A single select menu per action row.
