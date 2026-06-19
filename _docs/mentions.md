---
layout: doc
title: $mentions
translation_key: docs
category: "Entity Info"
function_name: mentions
syntax: $mentions
description: Returns the list of all user IDs mentioned in the message, separated by commas.
---

# $mentions

The function `$mentions` returns the **list of all user IDs mentioned** in the command message.

## Syntax

```
$mentions
```

## Return Value

- **Type** : List of snowflakes separated by commas
- Example: `123456789,987654321,555555555`
- Empty string if no users are mentioned

## Behavior

- `$mentions` takes **no arguments**.
- Returns all user mentions of the message.
- To retrieve only the first mention, use `$mentioned`.

## Examples

### Process all mentions

```bdfd
$if[$mentions!=]
  $let[count;$arrayCount[$splitText[$mentions;,]]]
  $sendMessage[$count user(s) mentioned: $mentions]
$else
  $sendMessage[No users mentioned.]
$endif
```

### Loop through mentions

```bdfd
$let[mentionsList;$splitText[$mentions;,]]
$let[i;0]
$let[total;$arrayCount[$mentionsList]]
$while[$i<$total]
  $let[target;$arrayGet[$mentionsList;$i]]
  $sendMessage[User: <@$target>]
  $let[i;$sum[$i;1]]
$endwhile
```

### Multi-target command

```bdfd
$if[$mentions!=]
  $let[list;$splitText[$mentions;,]]
  $let[i;0]
  $let[total;$arrayCount[$list]]
  $while[$i<$total]
    $let[id;$arrayGet[$list;$i]]
    $kick[$id]
    $let[i;$sum[$i;1]]
  $endwhile
  $sendMessage[$total user(s) kicked.]
$else
  $sendMessage[Mention at least one user.]
$endif
```

## Notes

- `$mentions` returns all IDs at once, separated by commas.
- To iterate, use `$splitText[$mentions;,]` to create an array.
- Does not detect `@everyone` or `@here` mentions.

