---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addStringSelectOption

Adds an option to un select menu of type string, created with `$addStringSelect`.

## Syntax

```
$addStringSelectOption[label;value;(description);(emoji);(default);(menuId)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `label` | Text displayed for the option | Yes |
| `value` | Value rsente during la selection | Yes |
| `description` | Description displayede sous le label | No |
| `emoji` | Emoji displayed to the left of the label | No |
| `default` | `true` pour préselectionner, `false` (default) | No |
| `menuId` | Identifier of the menu target (si multiple menus) | No |

## Description

`$addStringSelectOption` ajoute une option to the last menu string select created with `$addStringSelect`. Si multiple menus are used, précisez le `menuId` to target a menu specific.

## Examples

### Options simples

```
$addStringSelect[menu_boisson;Choisissez une boisson]
$addStringSelectOption[Café;coffee;Chaud and corsé;☕]
$addStringSelectOption[Thé;tea;Infusion parfumée;🍵]
$addStringSelectOption[Jus of orange;oj;Fraîchement pressé;🍊]
$addStringSelectOption[Eau;water;Plate or gazeuse;💧]
$sendMessage[Que voulez-vous boire ?]
```

### Option by default

```
$addStringSelect[menu_volume;Volume]
$addStringSelectOption[Faible;low;;🔈]
$addStringSelectOption[Moyen;medium;;🔉;true]
$addStringSelectOption[Fort;high;;🔊]
$sendMessage[Réglez le volume]
```

### Multiple menus with menuId

```
$addStringSelect[menu_entree;Entrée]
$addStringSelectOption[Salade;salade;;🥗]
$addStringSelectOption[Soupe;soupe;;🍜]

$addActionRow
$addStringSelect[menu_plat;Plat]
$addStringSelectOption[Viande;viande;;🥩;;menu_plat]
$addStringSelectOption[Poisson;poisson;;🐟;;menu_plat]
$addStringSelectOption[Végétarien;veggie;;🥬;;menu_plat]

$sendMessage[Composez votre menu]
```

## Notes

- Si `menuId` is not spécifié, the option is addede to the last `$addStringSelect` created.
- Maximum 25 options par menu.
- Les `value` sont accessibles via `$message` in `$onInteraction`.
