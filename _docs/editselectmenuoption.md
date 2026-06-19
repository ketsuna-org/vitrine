---
layout: doc
title: $editSelectMenuOption
translation_key: docs
category: "Components"
function_name: editSelectMenuOption
syntax: $editSelectMenuOption[menuId;label;value;description;default;emoji]
description: Modifies ae option individuelle dans un select menu (select menu) existing.
---
# $editSelectMenuOption

The `$editSelectMenuOption[]` function **modifier une option existinge** dans un select menu.

## Syntax

```
$editSelectMenuOption[menuId;label;value;description;default;emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `menuId` | Custom ID of the select menu parent. |
| `label` | New text displayed for the option. |
| `value` | Value internal transmise à `$onInteraction`. |
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

### Marquer une option comme selectionnée

```bdfd
$editSelectMenuOption[langMenu;Anglais;en;English language;true;🇬🇧]
```

### Mettre à day le label

```bdfd
$editSelectMenuOption[roleMenu;Modérateur;mod;Role de modération;false;🛡️]
```

### Désactiver visually une option

```bdfd
$editSelectMenuOption[actionMenu;Inavailable;none;Cette option is no longer available;false;🚫]
```

## Notes

- Use avec `$editSelectMenu[]` for ae mise à day complete du menu.
- Le parameter `value` used to identifier the option cible.
- Pour ajouter/supprimer of options, use `$addSelectMenuOption[]` or reconstruisez le menu.
