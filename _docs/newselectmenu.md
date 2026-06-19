---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $newSelectMenu

Creates a new menu of sélection (select menu) in the ligne of action courante. A select menu allows to the user of choisir parmi une list of options prédéfinies.

## Syntax

```
$newSelectMenu[customId;placeholder;(minValues);(maxValues)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Identifier custom for the interaction | Yes |
| `placeholder` | Text displayed when noe option n'est selectede | Yes |
| `minValues` | Number minimum of options sélectionnables (default: 1) | No |
| `maxValues` | Number maximum of options sélectionnables (default: 1) | No |

## Description

`$newSelectMenu` initialise un menu déroulant in the message. Après l'avoir created, utilisez `$addSelectMenuOption` pour ajouter options. The menu est then sent with `$sendMessage`.

## Examples

### Menu simple

```
$newSelectMenu[menu_couleur;Choisissez une couleur]
$addSelectMenuOption[menu_couleur;Rouge;red;The color rouge;🔴]
$addSelectMenuOption[menu_couleur;Bleu;blue;The color bleue;🔵]
$addSelectMenuOption[menu_couleur;Vert;green;The color verte;🟢]
$sendMessage[Sélectionnez votre couleur préférée]
```

### Menu to sélection multiple

```
$newSelectMenu[menu_fruits;Choisissez vos fruits;1;3]
$addSelectMenuOption[menu_fruits;Pomme;apple;;🍎]
$addSelectMenuOption[menu_fruits;Banane;banana;;🍌]
$addSelectMenuOption[menu_fruits;Orange;orange;;🍊]
$addSelectMenuOption[menu_fruits;Raisin;grape;;🍇]
$addSelectMenuOption[menu_fruits;Fraise;strawberry;;🍓]
$sendMessage[Sélectionnez 1 to 3 fruits]
```

## Gestion of l'interaction

Utilisez `$onInteraction` pour traiter la sélection :

```
$onInteraction
$if[$customID==menu_couleur]
  $sendMessage[Vous avez choisi : $message]
$endif
```

## Notes

- Chaque menu doit avoir un `customId` unique pour identifier l'interaction.
- Un seul select menu par ligne of action.
- Jusqu'à 25 options can be ajoutées par menu.
- Pour les select menus of type specific (users, roles, channels), utilisez les functions dédiées ($addUserSelect, $addRoleSelect, etc.).
