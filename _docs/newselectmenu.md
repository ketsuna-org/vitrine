---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $newSelectMenu

Crée un nouveau menu de sélection (select menu) dans la ligne d'action courante. Un select menu permet à l'utilisateur de choisir parmi une liste d'options prédéfinies.

## Syntaxe

```
$newSelectMenu[customId;placeholder;(minValues);(maxValues)]
```

## Paramètres

| Paramètre | Description | Obligatoire |
|-----------|-------------|:-----------:|
| `customId` | Identifiant personnalisé pour l'interaction | Oui |
| `placeholder` | Texte affiché quand aucune option n'est sélectionnée | Oui |
| `minValues` | Nombre minimum d'options sélectionnables (défaut : 1) | Non |
| `maxValues` | Nombre maximum d'options sélectionnables (défaut : 1) | Non |

## Description

`$newSelectMenu` initialise un menu déroulant dans le message. Après l'avoir créé, utilisez `$addSelectMenuOption` pour ajouter des options. Le menu est ensuite envoyé avec `$sendMessage`.

## Exemples

### Menu simple

```
$newSelectMenu[menu_couleur;Choisissez une couleur]
$addSelectMenuOption[menu_couleur;Rouge;red;La couleur rouge;🔴]
$addSelectMenuOption[menu_couleur;Bleu;blue;La couleur bleue;🔵]
$addSelectMenuOption[menu_couleur;Vert;green;La couleur verte;🟢]
$sendMessage[Sélectionnez votre couleur préférée]
```

### Menu à sélection multiple

```
$newSelectMenu[menu_fruits;Choisissez vos fruits;1;3]
$addSelectMenuOption[menu_fruits;Pomme;apple;;🍎]
$addSelectMenuOption[menu_fruits;Banane;banana;;🍌]
$addSelectMenuOption[menu_fruits;Orange;orange;;🍊]
$addSelectMenuOption[menu_fruits;Raisin;grape;;🍇]
$addSelectMenuOption[menu_fruits;Fraise;strawberry;;🍓]
$sendMessage[Sélectionnez 1 à 3 fruits]
```

## Gestion de l'interaction

Utilisez `$onInteraction` pour traiter la sélection :

```
$onInteraction
$if[$customID==menu_couleur]
  $sendMessage[Vous avez choisi : $message]
$endif
```

## Notes

- Chaque menu doit avoir un `customId` unique pour identifier l'interaction.
- Un seul select menu par ligne d'action.
- Jusqu'à 25 options peuvent être ajoutées par menu.
- Pour les selects de type spécifique (utilisateurs, rôles, salons), utilisez les fonctions dédiées ($addUserSelect, $addRoleSelect, etc.).
