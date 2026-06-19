---
layout: doc
title: $getStringSelectValue
translation_key: docs
category: "Entity Info"
function_name: getStringSelectValue
syntax: $getStringSelectValue[(index)]
description: Gets the value of l'option selectede par the user in a menu of sélection of strings (string select menu).
---

# $getStringSelectValue

The function `$getStringSelectValue[]` allows **récupérer the value** of l'option choisie par the user in a menu of sélection of strings (string select menu).

## Syntax

```
$getStringSelectValue[(index)]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Optional - L'index of the value selectede (1 = first). Par default 1. |

## Return Value

- **Type** : String
- The value associée to l'option of the menu selectede.
- String vide si noe option n'was choisie.

## Behavior

- Functionne with thes menus createds via `$addStringSelectMenu[]`.
- The value retournée correspond to the second parameter of each option définie in the menu : `$addStringSelectMenu[menuID;placeholder;label1:value1;label2:value2;...]`.
- Très utile pour trigger actions specifics according to the value choisie.

## Examples

### Menu of navigation simple

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
  $title[👤 Profil of $userName]
  $description[Rejoins le $creationDate[$authorID]...]
  $sendMessage[]
$elseif[$action==help]
  $title[❓ Aide]
  $description[Utilisez /help pour voir les commands.]
  $sendMessage[]
$endif
```

### Switch basé on the value

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

- L'index commence to 1.
- Pour les menus to choix multiple, use `$getStringSelectValues[]`.
- The value can be n'importe quelle string définie in the menu.
