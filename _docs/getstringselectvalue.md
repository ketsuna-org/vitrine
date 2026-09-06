---
layout: doc
title: $getStringSelectValue
translation_key: docs
category: "Components & Interactions"
function_name: getStringSelectValue
syntax: $getStringSelectValue[(index)]
description: Gets the value of the option selected by the user in a string select menu.
---

# $getStringSelectValue

The function `$getStringSelectValue[]` retrieves the value of the option chosen by the user in a string select menu.

## Syntax

```
$getStringSelectValue[(index)]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Optional - The index of the selected value (1 = first). Defaults to 1. |

## Return Value

- **Type**: String
- The value associated with the selected option.
- An empty string if no option was chosen.

## Behavior

- Works with select menus created via `$addStringSelectMenu[]`.
- The returned value corresponds to the second parameter of each option defined in the menu: `$addStringSelectMenu[menuID;placeholder;label1:value1;label2:value2;...]`.
- Very useful for triggering specific actions according to the chosen value.

## Examples

### Simple navigation menu

```bdfd
$nominalTrigger
$addStringSelectMenu[nav;Choose an action;Home:home;Profile:profile;Help:help]
$sendMessage[What do you want to do?]

$onInteraction[nav]
$let[action;$getStringSelectValue]

$if[$action==home]
  $title[🏠 Home]
  $description[Welcome to the server!]
  $sendMessage[]
$elseif[$action==profile]
  $title[👤 Profile of $userName]
  $description[Joined on $creationDate[$authorID]...]
  $sendMessage[]
$elseif[$action==help]
  $title[❓ Help]
  $description[Use /help to view the commands.]
  $sendMessage[]
$endif
```

### Switch based on the value

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
    No action matched.
  $break
$endSwitch
```

## Notes

- The index starts at 1.
- For multiple-choice select menus, use `$getStringSelectValues[]`.
- The value can be any string defined in the menu.
