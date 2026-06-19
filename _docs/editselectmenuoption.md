---
layout: doc
title: $editSelectMenuOption
translation_key: docs
category: "Components"
function_name: editSelectMenuOption
syntax: $editSelectMenuOption[menuId;label;value;description;default;emoji]
description: Modifie une option individuelle dans un menu de sélection (select menu) existant.
---
# $editSelectMenuOption

La fonction `$editSelectMenuOption[]` permet de **modifier une option existante** dans un menu de sélection.

## Syntaxe

```
$editSelectMenuOption[menuId;label;value;description;default;emoji]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `menuId` | Custom ID du select menu parent. |
| `label` | Nouveau texte affiché pour l'option. |
| `value` | Valeur interne transmise à `$onInteraction`. |
| `description` | *(Optionnel)* Texte secondaire sous le label. |
| `default` | *(Optionnel)* `true` si l'option est présélectionnée. |
| `emoji` | *(Optionnel)* Emoji décoratif. |

## Valeur de retour

Aucune. L'option est modifiée.

## Comportement

- L'option ciblée est identifiée par son `value` (ou son index).
- Le select menu parent doit exister.
- La modification est appliquée lors de l'édition du message.

## Exemples

### Marquer une option comme sélectionnée

```bdfd
$editSelectMenuOption[langMenu;Anglais;en;English language;true;🇬🇧]
```

### Mettre à jour le label

```bdfd
$editSelectMenuOption[roleMenu;Modérateur;mod;Rôle de modération;false;🛡️]
```

### Désactiver visuellement une option

```bdfd
$editSelectMenuOption[actionMenu;Indisponible;none;Cette option n'est plus disponible;false;🚫]
```

## Notes

- Utilisez avec `$editSelectMenu[]` pour une mise à jour complète du menu.
- Le paramètre `value` sert à identifier l'option cible.
- Pour ajouter/supprimer des options, utilisez `$addSelectMenuOption[]` ou reconstruisez le menu.
