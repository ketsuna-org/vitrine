---
layout: doc
title: $memberNick
translation_key: docs
category: "Entity Info"
function_name: memberNick
syntax: $memberNick
description: Returns the nickname of the member on the server. Equivalent to $nickname.
---

# $memberNick

The function `$memberNick` returns the **nickname** of the member on the current server. It is equivalent to `$nickname`.

## Syntax

```
$memberNick
```

## Return Value

- **Type** : String of characters
- The server nickname of the member if set, otherwise an **empty string**

## Behavior

- `$memberNick` takes **no arguments**.
- Functionally identical to `$nickname`.
- Returns only the nickname **specific to the server**.

## Examples

### Message with nickname

```bdfd
$if[$memberNick!=]
  $sendMessage[Hello $memberNick!]
$else
  $sendMessage[Hello $userName!]
$endif
```

### Member embed

```bdfd
$title[Member Information]
$author[$memberNick;$userAvatar]
$description[
**ID:** $memberID
**Permissions:** $memberPerms
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- `$memberNick` and `$nickname` are interchangeable.
- For general display, `$displayName` is recommended because it never returns an empty string.

