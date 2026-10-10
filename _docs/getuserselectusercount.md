---
layout: doc
title: $getUserSelectUserCount
translation_key: docs
category: "Components & Interactions"
function_name: getUserSelectUserCount
syntax: $getUserSelectUserCount
description: Returns how many values were selected in a user select menu.
---

# $getUserSelectUserCount

`$getUserSelectUserCount` returns the number of values selected by the user in a user select menu, as a number.

## Syntax

```text
$getUserSelectUserCount
```

It takes no argument.

## Behavior

- Only usable in the callback of a component interaction (a select menu choice). Elsewhere it raises "Select values require a component callback.".
- If the callback carries no userSelect selection it raises "This callback has no userSelect selection.".
- To read the selected values themselves, use [$getUserSelectUserIDs](/docs/getuserselectuserids/).

## Example

```bdfd
$sendMessage[You selected $getUserSelectUserCount value(s).]
```
