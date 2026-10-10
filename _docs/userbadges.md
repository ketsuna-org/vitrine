---
layout: doc
title: $userBadges
translation_key: docs
category: "Entity Info"
function_name: userBadges
syntax: $userBadges[(userID)]
description: Returns the badges text supplied by the execution context in the user.badges variable; empty when the context does not provide it.
---

# $userBadges

The function `$userBadges` returns the text stored in the execution context variable `user.badges`. It does **not** query Discord: the engine does not compute any badge list itself.

## Syntax

```
$userBadges[(userID)]
```

## Parameters

The engine accepts one optional argument but **ignores it**: the result is the same with or without it, and it never looks the user up.

## Return Value

- **Type**: String
- The value of the context variable `user.badges` if the entry point supplied one, otherwise an empty string.
- The standard command and event contexts of the engine do not set `user.badges`, so the result is normally an empty string.

## Behavior

- Never raises an error for a missing value: the fallback is the empty string.
- The format of the text (separator, badge names) is whatever the entry point put in the variable; the engine applies no formatting.

## Examples

### Display the value in an embed

```bdfd
$title[Profile of $userName]
$description[
**ID:** $userID
**Badges:** $userBadges
]
$color[#5865F2]
```

### Test whether anything is available

```bdfd
$if[$userBadges==]
  $sendMessage[No badge information is available.]
$else
  $sendMessage[Badges: $userBadges]
$endif
```

## Notes

- Do not rely on this function to detect a specific Discord badge.
