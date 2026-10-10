---
layout: doc
title: $removeButtons[]
translation_key: docs
category: "Components & Interactions"
function_name: removeButtons
syntax: $removeButtons[(messageID)]
description: Removes all buttons from the response being built, or from an existing message sent by the bot. Other components (menus) are kept.
---

# $removeButtons[] — Remove All Buttons

`$removeButtons[]` removes the buttons from the components of the response being built or of a message the bot already sent. Action rows left empty are dropped.

## Syntax

```text
$removeButtons[(messageID)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:--------:|
| `messageID` | ID of an existing message sent by the bot (a positive integer, otherwise `Invalid message ID.`). Without it (or when empty), the buttons staged in the current script are removed. | No |

## Return Value

Returns an empty string.

## Behavior

- **Without `messageID`**, only the buttons added earlier in the same script are removed.
- **With `messageID`**, the engine reads the components of that message and stages an edit without its buttons; the edit is applied when the response is flushed. This needs the bot's component service: without it the function fails with `No component service configured.`
- Select menus are kept.
- The text of the message is not changed: use `$editMessage` for that.

## Examples

### Remove the buttons of a message after a vote

```bdfd
$if[$customID==vote_yes]
  $removeButtons[123456789012345678]
$endif
```

### Remove the buttons staged earlier in the script

```bdfd
Select a colour
$addStringSelect[colour;Colour]
$addStringSelectOption[Red;red]
$addButtonCV2[ok;OK;success]
$removeButtons
```

## Notes

- Removes **all** buttons, whatever their custom ID.
- To remove a specific button, use `$removeComponent[customId]`.
- To remove every component, use `$removeAllComponents[]`.
