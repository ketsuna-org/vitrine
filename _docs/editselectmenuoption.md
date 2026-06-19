---
layout: doc
title: $editSelectMenuOption
translation_key: docs
category: "Components"
function_name: editSelectMenuOption
syntax: $editSelectMenuOption[menuId;label;value;description;default;emoji]
description: Modifies ae individual option in a select menu (select menu) existing.
---
# $editSelectMenuOption

The `$editSelectMenuOption[]` function **modifier une option existinge** in a select menu.

## Syntax

```
$editSelectMenuOption[menuId;label;value;description;default;emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `menuId` | Custom ID of the select menu parent. |
| `label` | New text displayed for the option. |
| `value` | Value internal transmise to `$onInteraction`. |
| `description` | *(Optional)* Text secondary sous le label. |
| `default` | *(Optional)* `true` if the option est préselectionnée. |
| `emoji` | *(Optional)* Emoji décoratif. |

## Return value

None. The option est modifiede.

## Behavior

- L'option ciblée est identifiée par son `value` (or son index).
- Le select menu parent doit exister.
- La modification est appliquée during l'édition of the message.

## Examples

### Marquer une option like selectionnée

```bdfd
$editSelectMenuOption[langMenu;Anglais;en;English language;true;🇬🇧]
```

### Mettre to day le label

```bdfd
$editSelectMenuOption[roleMenu;Modérateur;mod;Role of modération;false;🛡️]
```

### Désenable visually une option

```bdfd
$editSelectMenuOption[actionMenu;Inavailable;none;Cette option is no longer available;false;🚫]
```

## Notes

- Use with `$editSelectMenu[]` for ae mise to day complete of the menu.
- Le parameter `value` used to identifier the option cible.
- Pour ajouter/supprimer of options, use `$addSelectMenuOption[]` or reconstruisez le menu.
