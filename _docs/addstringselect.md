---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addStringSelect

Creates a select menu of type "string" — a dropdown menu with predefined text options.

## Syntax

```
$addStringSelect[customId;placeholder;(minValues);(maxValues);(disabled)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom identifier for the interaction | Yes |
| `placeholder` | Text displayed when nothing is selected | Yes |
| `minValues` | Minimum number of options to select (default: 1) | No |
| `maxValues` | Maximum number of options to select (default: 1) | No |
| `disabled` | `true` to disable the menu, `false` (default) | No |

## Description

A **string select** is a select menu where the options are character strings defined by the developer. After creating the menu with `$addStringSelect`, add options using `$addStringSelectOption`.

Unlike `$newSelectMenu` + `$addSelectMenuOption`, `$addStringSelect` and `$addStringSelectOption` use a simplified API where the `menuId` is optional in `$addStringSelectOption`.

## Examples

### Simple menu

```
$addStringSelect[menu_pays;Choose a country]
$addStringSelectOption[France;fr]
$addStringSelectOption[Belgium;be]
$addStringSelectOption[Switzerland;ch]
$addStringSelectOption[Canada;ca]
$sendMessage[Select your country]
```

### Menu with multiple selection

```
$addStringSelect[menu_hobbies;Your hobbies;1;5]
$addStringSelectOption[Reading;reading;;📚]
$addStringSelectOption[Sport;sport;;⚽]
$addStringSelectOption[Music;music;;🎵]
$addStringSelectOption[Video games;gaming;;🎮]
$addStringSelectOption[Cinema;cinema;;🎬]
$sendMessage[What are your hobbies?]
```

### Disabled menu

```
$addStringSelect[menu_indispo;Unavailable;1;1;true]
$addStringSelectOption[Option A;a]
$sendMessage[This menu is temporarily disabled]
```

## Handling the interaction

```
$onInteraction
$if[$customID==menu_pays]
  $sendMessage[You chose: $message]
$endif
```

## Notes

- Options are added using `$addStringSelectOption`.
- Maximum of 25 options per menu.
- Use `$addActionRow` to place the menu on a specific row.

