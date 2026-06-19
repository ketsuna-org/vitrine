---
layout: doc
title: $isMentioned
translation_key: docs
category: "Entity Info"
function_name: isMentioned
syntax: $isMentioned
description: "Returns \"true\" if the user who triggered the command was mentioned in the message, \"false\" otherwise."
---

# $isMentioned

The variable `$isMentioned` returns `"true"` if the user who triggered the command was **mentioned** in the message (via `@mention`).

## Syntax

```
$isMentioned
```

## Return Value

- **Type** : String `"true"` or `"false"`
- `"true"` : the triggering user is mentioned in the message
- `"false"` : the triggering user is not mentioned

## Behavior

- `$isMentioned` takes **no arguments**.
- Checks if the **triggering user** is part of the message mentions.
- Detects direct mentions (`@user`), not `@everyone`/`@here`.

## Examples

### React to a mention

```bdfd
$if[$isMentioned==true]
  $sendMessage[Hey <@$userID>, you were mentioned!]
$endif
```

### Command with mention required

```bdfd
$if[$isMentioned==true]
  $sendMessage[What can I do for you, $userName?]
$else
  $sendMessage[Mention me to get my attention!]
$endif
```

## Notes

- `$isMentioned` checks if the **triggering** user is mentioned, not if the bot is mentioned.
- To know who was mentioned, use `$mentioned` (first mention) or `$mentions` (all mentions).
- Does not detect `@everyone` or `@here` mentions.
