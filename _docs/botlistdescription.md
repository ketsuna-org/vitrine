---
layout: doc
title: $botListDescription
translation_key: docs
category: "Entity Info"
function_name: botListDescription
syntax: $botListDescription[text]
description: Compatibility flag for the BDFD bot list description. It takes exactly one argument and has no effect in the engine.
---

# $botListDescription

The `$botListDescription[text]` function is a **compatibility flag** for the description of the bot on the BDFD bot list. In the engine it is accepted and produces no output (it does nothing else).

## Syntax

```
$botListDescription[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Required (exactly one argument) - The description. A bare `$botListDescription` is refused ("Invalid argument count"). |

## Return value

- **Type**: String
- Always an empty string; the function only acts as a flag.

## Behavior

- The engine does not store the description and cannot read it back.

## Examples

### Set the description

```bdfd
$var[desc;$message[1]]
$if[$var[desc]==]
  $sendMessage[❌ Usage: !setdesc <description>]
  $stop
$endif

$botListDescription[$var[desc]]
$sendMessage[✅ Bot description updated!]
```

### Owner-only command

```bdfd
$if[$authorID!=$botOwnerID]
  $sendMessage[❌ Reserved for the owner.]
  $stop
$endif

$botListDescription[A helpful moderation bot]
$sendMessage[✅ Description flag applied.]
```

## Notes

- The function requires one argument and always returns an empty string.
- To hide the bot from the list, use `$botListHide`.
