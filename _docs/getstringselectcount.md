---
layout: doc
title: $getStringSelectCount
translation_key: docs
category: "Components & Interactions"
function_name: getStringSelectCount
syntax: $getStringSelectCount
description: Returns how many values were selected in a string select menu.
---

# $getStringSelectCount

`$getStringSelectCount` returns the number of values selected by the user in a string select menu, as a number.

## Syntax

```text
$getStringSelectCount
```

It takes no argument.

## Behavior

- Only usable in the callback of a component interaction (a select menu choice). Elsewhere it raises "Select values require a component callback.".
- If the callback carries no stringSelect selection it raises "This callback has no stringSelect selection.".
- To read the selected values themselves, use [$getStringSelectValues](/docs/getstringselectvalues/).

## Example

```bdfd
$sendMessage[You selected $getStringSelectCount value(s).]
```
