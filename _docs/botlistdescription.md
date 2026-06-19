---
layout: doc
title: $botListDescription
translation_key: docs
category: "Entity Info"
function_name: botListDescription
syntax: $botListDescription[text]
description: Sets or returns the description of the bot displayed in the BDFD bot list.
---

# $botListDescription

The `$botListDescription[text]` function **sets or returns the description of the bot** as it appears on the public BDFD bot list.

## Syntax

```
$botListDescription[text]
```

To read the current description:

```
$botListDescription
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Optional - The new description to set. If omitted, returns the current description. |

## Return value

- **Type**: String
- If called without a parameter: the current description.
- If called with a parameter: nothing (the description is updated).

## Behavior

- The description is visible on the bot's public page in the BDFD Bot List.
- Character limit: generally 200-300 characters.
- Basic markdown may be supported depending on the list.

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

### Display the current description

```bdfd
$title[📋 Description of the bot]
$description[
$botListDescription
]
$footer[Use !setdesc to modify]
$sendMessage[]
```

### Owner command to manage visibility

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ Reserved for the owner.]
  $stop
$endif

$var[action;$message[1]]
$if[$var[action]==set]
  $botListDescription[$message[2]]
  $sendMessage[✅ Description updated.]
$elseif[$var[action]==show]
  $sendMessage[📋 **Current description:**
  $botListDescription]
$else
  $sendMessage[❌ Usage: !botlist <set|show> [description]]
$endif
```

## Notes

- Without parameters, the function returns the current description.
- With a parameter, it overwrites the previous description.
- To hide the bot from the list, use `$botListHide`.
- The update may take a few minutes before becoming visible.
