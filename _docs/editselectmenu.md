---
layout: doc
title: $editSelectMenu
translation_key: docs
category: "Components"
function_name: editSelectMenu
syntax: $editSelectMenu[customId;placeholder;minValues;maxValues]
description: "Modifies thes propertys d'un select menu (select menu) existing : text indicatif, minimum number and maximum de values selectionnables."
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
| `customId` | The ID custom du select menu to modify. |
| `placeholder` | Text indicatif displayed before selection. |
| `minValues` | Minimum number de selections requiredes. |
| `maxValues` | Maximum number de selections allowedes. |

## Return value

None. The select menu est modified.

## Behavior

- Le select menu ciblé doit exister in the message.
- `minValues` must be ≤ `maxValues`.
- `maxValues` cannot dépasser 25 (limit Discord).

## Examples

### Mise à day after selection

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

- Use avec `$editMessage` pour appliquer les modifications.
- To modify les options du menu, use `$editSelectMenuOption[]`.
- `maxValues=1` crée a menu à choix unique, `>1` a menu à choix multiple.
