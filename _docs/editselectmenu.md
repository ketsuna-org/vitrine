---
layout: doc
title: $editSelectMenu
translation_key: docs
category: "Components"
function_name: editSelectMenu
syntax: $editSelectMenu[customId;placeholder;minValues;maxValues]
description: "Modifie les propriétés d'un menu de sélection (select menu) existant : texte indicatif, nombre minimum et maximum de valeurs sélectionnables."
parameters:
  - name: customId
    description: L'ID personnalisé du select menu à modifier.
  - name: placeholder
    description: Le nouveau texte indicatif (placeholder) affiché quand rien n'est sélectionné.
  - name: minValues
    description: Nombre minimum de valeurs que l'utilisateur doit sélectionner.
  - name: maxValues
    description: Nombre maximum de valeurs que l'utilisateur peut sélectionner.
returns:
  - type: void
    description: Modifie le select menu. Ne retourne rien.
related:
  - $addSelectMenu
  - $editSelectMenuOption
  - $editButton
examples:
  - description: Modifier le placeholder
    code: $editSelectMenu[roleMenu;Choisissez votre rôle...;1;1]
---
# $editSelectMenu

La fonction `$editSelectMenu[]` permet de **modifier un menu de sélection** (select menu) existant.

## Syntaxe

```
$editSelectMenu[customId;placeholder;minValues;maxValues]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `customId` | L'ID personnalisé du select menu à modifier. |
| `placeholder` | Texte indicatif affiché avant sélection. |
| `minValues` | Nombre minimum de sélections requises. |
| `maxValues` | Nombre maximum de sélections autorisées. |

## Valeur de retour

Aucune. Le select menu est modifié.

## Comportement

- Le select menu ciblé doit exister dans le message.
- `minValues` doit être ≤ `maxValues`.
- `maxValues` ne peut pas dépasser 25 (limite Discord).

## Exemples

### Mise à jour après sélection

```bdfd
$editSelectMenu[langMenu;Langue choisie !;0;1]
```

### Verrouiller un select menu

```bdfd
$editSelectMenu[closedMenu;Fermé;0;0]
```

### Réinitialiser un select menu dynamique

```bdfd
$editSelectMenu[categoryMenu;Sélectionnez une catégorie;1;3]
```

## Notes

- Utilisez avec `$editMessage` pour appliquer les modifications.
- Pour modifier les options du menu, utilisez `$editSelectMenuOption[]`.
- `maxValues=1` crée un menu à choix unique, `>1` un menu à choix multiples.
