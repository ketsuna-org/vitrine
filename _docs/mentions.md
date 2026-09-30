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
  $var[count;$arrayCount[$splitText[$mentions;,]]]
  $sendMessage[$var[count] user(s) mentioned: $mentions]
$else
  $sendMessage[No users mentioned.]
$endif
```

### Loop through mentions

```bdfd
$var[mentionsList;$splitText[$mentions;,]]
$var[i;0]
$var[total;$arrayCount[$var[mentionsList]]]
$while[$var[i]<$var[total]]
  $var[target;$arrayGet[$var[mentionsList];$var[i]]]
  $sendMessage[User: <@$var[target]>]
  $var[i;$sum[$var[i];1]]
$endwhile
```

### Multi-target command

```bdfd
$if[$mentions!=]
  $var[list;$splitText[$mentions;,]]
  $var[i;0]
  $var[total;$arrayCount[$var[list]]]
  $while[$var[i]<$var[total]]
    $var[id;$arrayGet[$var[list];$var[i]]]
    $kick[$var[id]]
    $var[i;$sum[$var[i];1]]
  $endwhile
  $sendMessage[$var[total] user(s) kicked.]
$else
  $sendMessage[Mention at least one user.]
$endif
```

## Notes

- `$mentions` returns all IDs at once, separated by commas.
- To iterate, use `$splitText[$mentions;,]` to create an array.
- Does not detect `@everyone` or `@here` mentions.

