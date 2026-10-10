---
layout: doc
title: $removeAllComponents[]
translation_key: docs
category: "Components & Interactions"
function_name: removeAllComponents
syntax: $removeAllComponents[(messageID)]
description: Removes all components from the response being built, or from an existing message sent by the bot.
---

# $removeAllComponents[] — Remove All Components

`$removeAllComponents[]` removes every component (buttons, select menus, action rows, containers, ...) either from the response being built or, with a message ID, from a message the bot already sent.

## Syntax

```text
$removeAllComponents[(messageID)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:--------:|
| `messageID` | ID of an existing message sent by the bot (a positive integer, otherwise `Invalid message ID.`). Without it (or when empty), the components staged in the current script are cleared. | No |

## Return Value

Returns an empty string.

## Behavior

- **Without `messageID`**, only the components added earlier in the same script (`$addButton`, `$addButtonCV2`, `$addStringSelect`, ...) are cleared. Components added after the call are kept.
- **With `messageID`**, the engine reads the components of that message and stages an edit that empties them; the edit is applied when the response is flushed. This needs the bot's component service: without it the function fails with `No component service configured.`
- The text of the message is not changed: use `$editMessage` for that.

## Examples

### Clear the components of the response being built

```bdfd
Panel closed
$addButtonCV2[yes;Yes;primary]
$removeAllComponents
```

### Remove the components of a message after a click

```bdfd
$if[$customID==submit_form]
  $removeAllComponents[123456789012345678]
$endif
```

## Comparison of removal functions

| Function | Effect |
|----------|--------|
| `$removeComponent[customId]` | Removes one component (by custom ID or URL) |
| `$removeButtons` | Removes all buttons only |
| `$removeAllComponents` | Removes **all** components |

## Notes

- All three functions accept an optional `messageID` as their last argument.
