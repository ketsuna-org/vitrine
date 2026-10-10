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
  $textSplit[$mentions;,]
  $sendMessage[$getTextSplitLength user(s) mentioned: $mentions]
$else
  $sendMessage[No users mentioned.]
$endif
```

### Loop through mentions

```bdfd
$textSplit[$mentions;,]
$loop[$getTextSplitLength]
  $sendMessage[User: <@$splitText[$loopCount]>]
$endLoop
```

### Multi-target command

```bdfd
$if[$mentions!=]
  $textSplit[$mentions;,]
  $loop[$getTextSplitLength]
    $kick[$splitText[$loopCount]]
  $endLoop
  $sendMessage[$getTextSplitLength user(s) kicked.]
$else
  $sendMessage[Mention at least one user.]
$endif

## Notes

- `$mentions` returns all IDs at once, separated by commas.
- To iterate, split the list with `$textSplit[$mentions;,]`, then read the parts with `$splitText[index]` (1-based) and count them with `$getTextSplitLength`.
- Does not detect `@everyone` or `@here` mentions.

