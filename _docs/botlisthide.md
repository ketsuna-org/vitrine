---
layout: doc
title: $botListHide
translation_key: docs
category: "Entity Info"
function_name: botListHide
syntax: $botListHide
description: Compatibility flag for the BDFD bot list. It takes no argument and has no effect in the engine.
---

# $botListHide

The `$botListHide` function is a **compatibility flag** for the BDFD bot list. In the engine it is accepted and does nothing: it returns an empty string and does not hide or change anything.

## Syntax

```
$botListHide
```

## Parameters

None (passing one is an error: "Invalid argument count").

## Return value

- **Type**: String
- Always an empty string.

## Behavior

- The engine has no bot list: calling the function has no visible effect and stores nothing.
- Like `$botListDescription[]`, it exists so that scripts coming from BDFD are accepted.

## Examples

### Harmless call

```bdfd
$botListHide
$sendMessage[Done.]
```

### Owner-only command

```bdfd
$if[$authorID!=$botOwnerID]
  $ephemeral
  $sendMessage[❌ Reserved for the owner.]
  $stop
$endif

$botListHide
$sendMessage[✅ Flag accepted (it has no effect in this engine).]
```

## Notes

- Do not rely on it to hide the bot from any list.
- The related function `$botListDescription[]` is also a no-op.
