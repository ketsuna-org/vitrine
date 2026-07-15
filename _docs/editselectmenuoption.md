---
layout: doc
title: $editSelectMenuOption
translation_key: docs
category: "Components & Interactions"
function_name: editSelectMenuOption
syntax: $editSelectMenuOption[menuId;label;value;description;default;emoji]
description: Modifies an individual option in an existing select menu.
---

# $editSelectMenuOption

The `$editSelectMenuOption[]` function **modifies an existing option** in a select menu.

## Syntax

```
$editSelectMenuOption[menuId;label;value;description;default;emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `menuId` | Custom ID of the parent select menu. |
| `label` | New text displayed for the option. |
| `value` | Internal value passed to `$onInteraction`. |
| `description` | *(Optional)* Secondary text below the label. |
| `default` | *(Optional)* `true` if the option is pre-selected. |
| `emoji` | *(Optional)* Decorative emoji. |

## Return value

None. The option is modified.

## Behavior

- The targeted option is identified by its `value` (or its index).
- The parent select menu must exist.
- The modification is applied during the message edit.

## Examples

### Mark an option as selected

```bdfd
$editSelectMenuOption[langMenu;English;en;English language;true;🇬🇧]
```

### Update the label

```bdfd
$editSelectMenuOption[roleMenu;Moderator;mod;Moderation role;false;🛡️]
```

### Visually disable an option

```bdfd
$editSelectMenuOption[actionMenu;Unavailable;none;This option is no longer available;false;🚫]
```

## Notes

- Use with `$editSelectMenu[]` for a complete update of the menu.
- The `value` parameter is used to identify the target option.
- To add/remove options, use `$addSelectMenuOption[]` or rebuild the menu.
