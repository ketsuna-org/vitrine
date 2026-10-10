---
layout: doc
title: $isUserDmEnabled
translation_key: docs
category: "Math & Text"
function_name: isUserDmEnabled
syntax: $isUserDmEnabled[(userID)]
description: Returns the DM-enabled flag of the user in the execution context ("true" by default).
---

# $isUserDmEnabled

The function `$isUserDmEnabled` returns the value of the `user.dmEnabled` variable of the execution context. If the context does not provide it, the result is `"true"`.

## Syntax

```
$isUserDmEnabled
$isUserDmEnabled[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional. Accepted but **not used**: the engine does not query Discord and returns the same context value whatever the ID. |

## Return Value

- **Type**: String
- The value of `user.dmEnabled` from the context, or `"true"` when it is absent.

## Behavior

- No Discord request is made: the engine does not check the user's privacy settings.
- The `userID` argument does not change the result.

## Examples

### Read the flag

```bdfd
$sendMessage[DM flag: $isUserDmEnabled]
```

## Notes

- A result of `"true"` does not guarantee that a DM can be delivered.
