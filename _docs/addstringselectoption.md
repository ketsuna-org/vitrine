---
layout: doc
translation_key: docs
category: "Components & Interactions"
---

# $addStringSelectOption

Adds an option to a string select menu created with `$addStringSelect` (or `$newSelectMenu`).

## Syntax

```text
$addStringSelectOption[label;value;(description);(emoji);(default);(menuId)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `label` | Text displayed for the option (1 to 100 characters). | Yes |
| `value` | Value sent when the option is chosen (1 to 100 characters). | Yes |
| `description` | Description displayed under the label. | No |
| `emoji` | Emoji displayed to the left of the label. | No |
| `default` | `yes`/`true` to preselect the option, `no`/`false` (default, also when empty) otherwise. Any other value raises `Expected yes or no`. | No |
| `menuId` | Custom ID of the target string select menu. | No |

## Description

Without `menuId`, the option is added to the **last string select menu** added to the response. With `menuId`, it is added to the string select menu that has this custom ID. If there is no string select menu yet, the error `No string select menu found.` is raised; if `menuId` matches no string select menu, the error is `Component <id> not found.`

A menu holds at most 25 options (`A select menu supports at most 25 options.`). The option is added to the response being built: this function has no message ID argument (use `$addSelectMenuOption` to reach an existing message).

## Examples

### Simple options

```bdfd
What would you like to drink?
$addStringSelect[menu_drink;Choose a drink]
$addStringSelectOption[Coffee;coffee;Hot and strong;☕]
$addStringSelectOption[Tea;tea;Flavored infusion;🍵]
$addStringSelectOption[Orange juice;oj;Freshly squeezed;🍊]
$addStringSelectOption[Water;water;Still or sparkling;💧]
```

### Default option

```bdfd
Set the volume
$addStringSelect[menu_volume;Volume]
$addStringSelectOption[Low;low;;🔈]
$addStringSelectOption[Medium;medium;;🔉;yes]
$addStringSelectOption[High;high;;🔊]
```

### Several menus with menuId

```bdfd
Compose your menu
$addStringSelect[menu_starter;Starter]
$addStringSelect[menu_main;Main course]
$addStringSelectOption[Salad;salad;;🥗;;menu_starter]
$addStringSelectOption[Soup;soup;;🍜;;menu_starter]
$addStringSelectOption[Meat;meat;;🥩;;menu_main]
$addStringSelectOption[Fish;fish;;🐟;;menu_main]
$addStringSelectOption[Vegetarian;veggie;;🥬;;menu_main]
```

## Notes

- The chosen value is read with `$getStringSelectValue[index]` in the script run for the interaction.
- Each menu must end up with at least as many options as its `maxValues`.
