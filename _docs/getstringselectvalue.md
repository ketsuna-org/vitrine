---
layout: doc
title: $getStringSelectValue
translation_key: docs
category: "Entity Info"
function_name: getStringSelectValue
syntax: $getStringSelectValue[(index)]
description: Gets the value de l'option selectede par the user dans un menu de sélection de strings (string select menu).
---

# $getStringSelectValue

The function `$getStringSelectValue[]` allows **récupérer the value** de l'option choisie par the user dans un menu de sélection de strings (string select menu).

## Syntax

```
$getStringSelectValue[(index)]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Optional - L'index de the value selectede (1 = first). Par default 1. |

## Return Value

- **Type** : String
- The value associée à l'option du menu selectede.
- String vide si noe option n'was choisie.

## Behavior

- Functionne with thes menus createds via `$addStringSelectMenu[]`.
- The value retournée correspond au second parameter de each option définie in the menu : `$addStringSelectMenu[menuID;placeholder;label1:value1;label2:value2;...]`.
- Très utile pour déclencher des actions spécifiques selon the value choisie.

## Examples

### Menu de navigation simple

```bdfd
$nominalTrigger
$addStringSelectMenu[nav;Choisissez une action;Accueil:home;Profil:profile;Aide:help]
$sendMessage[Que voulez-vous faire ?]

$onInteraction[nav]
$let[action;$getStringSelectValue]

$if[$action==home]
  $title[🏠 Accueil]
  $description[Bienvenue on the server !]
  $sendMessage[]
$elseif[$action==profile]
  $title[👤 Profil de $userName]
  $description[Rejoins le $creationDate[$authorID]...]
  $sendMessage[]
$elseif[$action==help]
  $title[❓ Aide]
  $description[Utilisez /help pour voir les commands.]
  $sendMessage[]
$endif
```

### Switch basé sur the value

```bdfd
$onInteraction[menu]
$let[val;$getStringSelectValue]

$switch[$val]
  $case[option1]
    Action 1 executed.
  $break
  $case[option2]
    Action 2 executed.
  $break
  $default
    Aucune action correspondante.
  $break
$endSwitch
```

## Notes

- L'index commence à 1.
- Pour les menus à choix multiple, utiliser `$getStringSelectValues[]`.
- The value can be n'importe quelle string définie in the menu.
