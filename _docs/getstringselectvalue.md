---
layout: doc
title: $getStringSelectValue
translation_key: docs
category: "Components & Interactions"
function_name: getStringSelectValue
syntax: $getStringSelectValue[index]
description: Gets the value of the option selected by the user in a string select menu.
---

# $getStringSelectValue

The function `$getStringSelectValue[]` retrieves the value of the option chosen by the user in a string select menu.

## Syntax

```
$getStringSelectValue[index]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | The index of the selected value (1 = first). Required, integer of 1 or more. |

## Return Value

- **Type**: String
- The value associated with the selected option.
- An empty string if the index is beyond the number of selected options.
- An error is raised if the index is not an integer of 1 or more, if the interaction is not a component callback, or if the callback has no string selection.

## Behavior

- Only usable in the callback of a component interaction carrying a string selection (menu created via `$addStringSelect[]`, options added with `$addStringSelectOption[]`).
- The returned value is the value of the option chosen by the user, not its label.
- Very useful for triggering specific actions according to the chosen value.

## Examples

### Simple navigation menu

```bdfd
$var[action;$getStringSelectValue[1]]

$if[$var[action]==home]
  $title[🏠 Home]
  $description[Welcome to the server!]
$elseif[$var[action]==profile]
  $title[👤 Profile of $userName]
  $description[Joined on $creationDate[$authorID]...]
$elseif[$var[action]==help]
  $title[❓ Help]
  $description[Use /help to view the commands.]
$endif
```

### Display the second choice

```bdfd
$var[second;$getStringSelectValue[2]]
$if[$var[second]==]
  $sendMessage[Only one option selected.]
$else
  $sendMessage[Second option: $var[second]]
$endif
```

## Notes

- The index starts at 1 and is required: `$getStringSelectValue` without brackets is refused.
- For multiple-choice select menus, use `$getStringSelectValues[]`.
- The value can be any string defined in the menu.
