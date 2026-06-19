---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addStringSelectOption

Adds an option to a select menu of type string, created with `$addStringSelect`.

## Syntax

```
$addStringSelectOption[label;value;(description);(emoji);(default);(menuId)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `label` | Text displayed for the option | Yes |
| `value` | Value sent during selection | Yes |
| `description` | Description displayed under the label | No |
| `emoji` | Emoji displayed to the left of the label | No |
| `default` | `true` to preselect, `false` (default) | No |
| `menuId` | Identifier of the target menu (if multiple menus) | No |

## Description

`$addStringSelectOption` adds an option to the last string select menu created with `$addStringSelect`. If multiple menus are used, specify the `menuId` to target a specific menu.

## Examples

### Simple options

```
$addStringSelect[menu_boisson;Choose a drink]
$addStringSelectOption[Coffee;coffee;Hot and strong;☕]
$addStringSelectOption[Tea;tea;Flavored infusion;🍵]
$addStringSelectOption[Orange juice;oj;Freshly squeezed;🍊]
$addStringSelectOption[Water;water;Still or sparkling;💧]
$sendMessage[What would you like to drink?]
```

### Default option

```
$addStringSelect[menu_volume;Volume]
$addStringSelectOption[Low;low;;🔈]
$addStringSelectOption[Medium;medium;;🔉;true]
$addStringSelectOption[High;high;;🔊]
$sendMessage[Set the volume]
```

### Multiple menus with menuId

```
$addStringSelect[menu_entree;Starter]
$addStringSelectOption[Salad;salad;;🥗]
$addStringSelectOption[Soup;soup;;🍜]

$addActionRow
$addStringSelect[menu_plat;Main course]
$addStringSelectOption[Meat;meat;;🥩;;menu_plat]
$addStringSelectOption[Fish;fish;;🐟;;menu_plat]
$addStringSelectOption[Vegetarian;veggie;;🥬;;menu_plat]

$sendMessage[Compose your menu]
```

## Notes

- If `menuId` is not specified, the option is added to the last `$addStringSelect` created.
- Maximum of 25 options per menu.
- The `value` fields are accessible via `$message` in `$onInteraction`.

