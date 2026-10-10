---
layout: doc
title: $mentions
translation_key: docs
category: "Entity Info"
function_name: mentions
syntax: $mentions[(unused)]
description: Returns the list of all user IDs mentioned in the message, separated by commas.
---

# $mentions

The function `$mentions` returns the **list of all user IDs mentioned** in the command message.

## Syntax

```
$mentions[(unused)]
```

## Parameters

One optional argument is accepted but ignored.

## Return Value

- **Type** : String
- The text of the `message.mentions` context variable as the host supplied it: normally the user IDs separated by commas (for example `123456789,987654321`).
- Empty string if the host supplied no such variable.

## Behavior

- Unlike `$mentioned`, `$mentions` does not validate or parse the list, and it does not raise an error in a slash command.
- To retrieve a single mention, use `$mentioned[index]`.

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
```

## Notes

- `$mentions` returns the whole list at once.
- To iterate, split the list with `$textSplit[$mentions;,]`, then read the parts with `$splitText[index]` (1-based) and count them with `$getTextSplitLength`.


