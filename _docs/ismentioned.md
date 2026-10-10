---
layout: doc
title: $isMentioned
translation_key: docs
category: "Entity Info"
function_name: isMentioned
syntax: $isMentioned[userID]
description: "Returns \"true\" if the given user ID is among the users mentioned in the message, \"false\" otherwise."
---

# $isMentioned

The function `$isMentioned[userID]` returns `"true"` if the given user ID is in the list of **users mentioned** in the triggering message.

## Syntax

```
$isMentioned[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Required. The user ID to look for. It must match a mentioned ID exactly (`22` does not match `222`). |

## Return Value

- **Type** : String `"true"` or `"false"`
- `"true"` : the ID is among the mentioned users of the message
- `"false"` : it is not

## Behavior

- `$isMentioned` takes **exactly one argument**; a bare `$isMentioned` is invalid.
- Only the user mentions of the message are examined.

## Examples

### React to a mention

```bdfd
$if[$isMentioned[$authorID]==true]
  $sendMessage[Hey <@$authorID>, you mentioned yourself!]
$endif
```

### Check a specific user

```bdfd
$if[$isMentioned[123456789012345678]==true]
  $sendMessage[That user was mentioned.]
$else
  $sendMessage[That user was not mentioned.]
$endif
```

## Notes

- To know who was mentioned, use `$mentioned[1]` (first mention) or `$mentions`.
