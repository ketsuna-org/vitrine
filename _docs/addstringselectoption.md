---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addStringSelectOption

Ajoute une option à un menu de sélection de type string, créé avec `$addStringSelect`.

## Syntaxe

```
$addStringSelectOption[label;value;(description);(emoji);(default);(menuId)]
```

## Paramètres

| Paramètre | Description | Obligatoire |
|-----------|-------------|:-----------:|
| `label` | Texte affiché pour l'option | Oui |
| `value` | Valeur renvoyée lors de la sélection | Oui |
| `description` | Description affichée sous le label | Non |
| `emoji` | Emoji affiché à gauche du label | Non |
| `default` | `true` pour présélectionner, `false` (défaut) | Non |
| `menuId` | Identifiant du menu cible (si plusieurs menus) | Non |

## Description

`$addStringSelectOption` ajoute une option au dernier menu string select créé avec `$addStringSelect`. Si plusieurs menus sont utilisés, précisez le `menuId` pour cibler un menu spécifique.

## Exemples

### Options simples

```
$addStringSelect[menu_boisson;Choisissez une boisson]
$addStringSelectOption[Café;coffee;Chaud et corsé;☕]
$addStringSelectOption[Thé;tea;Infusion parfumée;🍵]
$addStringSelectOption[Jus d'orange;oj;Fraîchement pressé;🍊]
$addStringSelectOption[Eau;water;Plate ou gazeuse;💧]
$sendMessage[Que voulez-vous boire ?]
```

### Option par défaut

```
$addStringSelect[menu_volume;Volume]
$addStringSelectOption[Faible;low;;🔈]
$addStringSelectOption[Moyen;medium;;🔉;true]
$addStringSelectOption[Fort;high;;🔊]
$sendMessage[Réglez le volume]
```

### Plusieurs menus avec menuId

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

- Si `menuId` n'est pas spécifié, l'option est ajoutée au dernier `$addStringSelect` créé.
- Maximum 25 options par menu.
- Les `value` sont accessibles via `$message` dans `$onInteraction`.
