---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addSelectMenuOption

Ajoute une option à un menu de sélection existant, créé avec `$newSelectMenu`.

## Syntaxe

```
$addSelectMenuOption[menuId;label;value;(description);(emoji);(default)]
```

## Paramètres

| Paramètre | Description | Obligatoire |
|-----------|-------------|:-----------:|
| `menuId` | Identifiant du menu cible (celui de `$newSelectMenu`) | Oui |
| `label` | Texte affiché pour l'option | Oui |
| `value` | Valeur renvoyée quand l'option est choisie | Oui |
| `description` | Description supplémentaire affichée sous le label | Non |
| `emoji` | Emoji affiché à gauche du label | Non |
| `default` | `true` pour présélectionner cette option, `false` (défaut) | Non |

## Description

Cette fonction doit être appelée après `$newSelectMenu` pour peupler le menu. Chaque appel ajoute une option au menu spécifié par `menuId`.

## Exemples

### Options avec descriptions

```
$newSelectMenu[menu_lang;Choisissez un langage]
$addSelectMenuOption[menu_lang;JavaScript;js;Langage web dynamique;🟨]
$addSelectMenuOption[menu_lang;Python;py;Langage polyvalent;🐍]
$addSelectMenuOption[menu_lang;Rust;rs;Langage système performant;🦀]
$sendMessage[Quel langage préférez-vous ?]
```

### Option par défaut

```
$newSelectMenu[menu_theme;Thème;1;1]
$addSelectMenuOption[menu_theme;Clair;light;Mode clair;☀️]
$addSelectMenuOption[menu_theme;Sombre;dark;Mode sombre;🌙;true]
$sendMessage[Choisissez votre thème]
```

### Menu avec émojis uniquement

```
$newSelectMenu[menu_react;Réaction rapide]
$addSelectMenuOption[menu_react;Like;like;;👍]
$addSelectMenuOption[menu_react;Love;love;;❤️]
$addSelectMenuOption[menu_react;Laugh;laugh;;😂]
$addSelectMenuOption[menu_react;Wow;wow;;😮]
$sendMessage[Réagissez à ce message]
```

## Notes

- Le `menuId` doit correspondre exactement au `customId` du `$newSelectMenu`.
- Maximum 25 options par menu.
- Les `value` sont les valeurs reçues dans `$onInteraction`.
