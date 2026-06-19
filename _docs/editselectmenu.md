---
layout: doc
title: $editSelectMenu
translation_key: docs
category: "Components"
function_name: editSelectMenu
syntax: $editSelectMenu[customId;placeholder;minValues;maxValues]
description: "Modifies thes propertys of un select menu (select menu) existing : text indicatif, minimum number and maximum of values selectionnables."
---
# $editSelectMenu

The `$editSelectMenu[]` function **modifier un select menu** (select menu) existing.

## Syntax

```
$editSelectMenu[customId;placeholder;minValues;maxValues]
```

## Parameters

| Parameter | Description |
|---|---|
| `customId` | The ID custom of the select menu to modify. |
| `placeholder` | Text indicatif displayed before selection. |
| `minValues` | Minimum number of selections requiredes. |
| `maxValues` | Maximum number of selections allowedes. |

## Return value

None. The select menu est modified.

## Behavior

- Le select menu ciblé doit exister in the message.
- `minValues` must be ≤ `maxValues`.
- `maxValues` cannot dépasser 25 (limit Discord).

## Examples

### Mise to day after selection

```bdfd
$editSelectMenu[langMenu;Langue choisie !;0;1]
```

### Verrouiller un select menu

```bdfd
$editSelectMenu[closedMenu;Fermé;0;0]
```

### Réinitialiser un select menu dynamic

```bdfd
$editSelectMenu[categoryMenu;Selectionnez une catégorie;1;3]
```

## Notes

- Use with `$editMessage` pour appliquer les modifications.
- To modify les options of the menu, use `$editSelectMenuOption[]`.
- `maxValues=1` crée a menu to choix unique, `>1` a menu to choix multiple.
