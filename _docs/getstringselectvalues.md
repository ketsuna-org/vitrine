---
layout: doc
title: $getStringSelectValues
translation_key: docs
category: "Entity Info"
function_name: getStringSelectValues
syntax: $getStringSelectValues[(separator)]
description: Gets all option values selected in a multi-select string select menu.
---

# $getStringSelectValues

The function `$getStringSelectValues[]` retrieves all option values chosen by the user in a multi-select string select menu.

## Syntax

```
$getStringSelectValues[(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Optional - The separator between each value. Defaults to `, ` (comma + space). |

## Return Value

- **Type**: String
- The list of all selected values, separated by the delimiter.
- An empty string if no option was selected.

## Behavior

- Used with a string select menu configured with `maxValues > 1`.
- Returns the values (not the labels) of the chosen options.
- Allows processing multiple choices in a single interaction.

## Examples

### Processing multiple choices

```bdfd
$onInteraction[menu]
$let[vals;$getStringSelectValues[,]]

You selected:
$textSplit[$vals;,]
  - Option: $splitText[$index]
$endTextSplit

$sendMessage[]
```

### Conditional loop

```bdfd
$onInteraction[menu]
$let[choices;$getStringSelectValues[,]]

$textSplit[$choices;,]
  $if[$splitText[$index]==notif]
    $sendDM[$authorID;🔔 Notifications enabled!]
  $elseif[$splitText[$index]==news]
    $sendDM[$authorID;📰 Newsletter enabled!]
  $endif
$endTextSplit
```

## Notes

- For a single selection, use `$getStringSelectValue[]`.
- The separator can be customized to make parsing easier.
- The values are defined in `$addStringSelectMenu[]`.
