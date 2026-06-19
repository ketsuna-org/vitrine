---
layout: doc
title: $getStringSelectValue
translation_key: docs
category: "Entity Info"
function_name: getStringSelectValue
syntax: $getStringSelectValue[(index)]
description: Récupère la valeur de l'option sélectionnée par l'utilisateur dans un menu de sélection de chaînes (string select menu).
parameters:
  - name: index
    description: (Optionnel) L'index de l'option sélectionnée. Par défaut 1 (première valeur).
returns:
  - type: string
    description: La valeur de l'option choisie, ou une chaîne vide si aucune sélection.
related:
  - $getStringSelectValues
  - $addStringSelectMenu
  - $onInteraction
examples:
  - description: Récupérer la valeur sélectionnée
    code: $getStringSelectValue
  - description: Récupérer la 2ème valeur
    code: $getStringSelectValue[2]
---

# $getStringSelectValue

La fonction `$getStringSelectValue[]` permet de **récupérer la valeur** de l'option choisie par l'utilisateur dans un menu de sélection de chaînes (string select menu).

## Syntaxe

```
$getStringSelectValue[(index)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `index` | Optionnel - L'index de la valeur sélectionnée (1 = premier). Par défaut 1. |

## Valeur de retour

- **Type** : String
- La valeur associée à l'option du menu sélectionnée.
- Chaîne vide si aucune option n'a été choisie.

## Comportement

- Fonctionne avec les menus créés via `$addStringSelectMenu[]`.
- La valeur retournée correspond au second paramètre de chaque option définie dans le menu : `$addStringSelectMenu[menuID;placeholder;label1:valeur1;label2:valeur2;...]`.
- Très utile pour déclencher des actions spécifiques selon la valeur choisie.

## Exemples

### Menu de navigation simple

```bdfd
$nominalTrigger
$addStringSelectMenu[nav;Choisissez une action;Accueil:home;Profil:profile;Aide:help]
$sendMessage[Que voulez-vous faire ?]

$onInteraction[nav]
$let[action;$getStringSelectValue]

$if[$action==home]
  $title[🏠 Accueil]
  $description[Bienvenue sur le serveur !]
  $sendMessage[]
$elseif[$action==profile]
  $title[👤 Profil de $userName]
  $description[Rejoins le $creationDate[$authorID]...]
  $sendMessage[]
$elseif[$action==help]
  $title[❓ Aide]
  $description[Utilisez /help pour voir les commandes.]
  $sendMessage[]
$endif
```

### Switch basé sur la valeur

```bdfd
$onInteraction[menu]
$let[val;$getStringSelectValue]

$switch[$val]
  $case[option1]
    Action 1 exécutée.
  $break
  $case[option2]
    Action 2 exécutée.
  $break
  $default
    Aucune action correspondante.
  $break
$endSwitch
```

## Notes

- L'index commence à 1.
- Pour les menus à choix multiples, utiliser `$getStringSelectValues[]`.
- La valeur peut être n'importe quelle chaîne définie dans le menu.
