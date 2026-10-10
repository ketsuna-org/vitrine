---
layout: doc
title: $getMentionableSelectUserCount
translation_key: docs
category: "Components & Interactions"
function_name: getMentionableSelectUserCount
syntax: $getMentionableSelectUserCount
description: Returns how many values were selected in a mentionable select menu.
---

# $getMentionableSelectUserCount

`$getMentionableSelectUserCount` returns the number of values selected by the user in a mentionable select menu, as a number.

## Syntax

```text
$getMentionableSelectUserCount
```

It takes no argument.

## Behavior

- Only usable in the callback of a component interaction (a select menu choice). Elsewhere it raises "Select values require a component callback.".
- If the callback carries no mentionableSelect selection it raises "This callback has no mentionableSelect selection.".
- To read the selected values themselves, use [$getMentionableSelectUserIDs](/docs/getmentionableselectuserids/).

## Example

```bdfd
$sendMessage[You selected $getMentionableSelectUserCount value(s).]
```
