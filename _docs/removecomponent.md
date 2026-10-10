---
layout: doc
title: $removeComponent[]
translation_key: docs
category: "Components & Interactions"
function_name: removeComponent
syntax: $removeComponent[customId;(messageID)]
description: Removes a specific component from the response being built or from an existing message, using its custom ID (or URL for a link button).
---

# $removeComponent[] — Remove a Component

`$removeComponent[]` removes one component, found by its custom ID (or by its URL for a link button), from the response being built or from a message the bot already sent. Action rows left empty are dropped.

## Syntax

```text
$removeComponent[customId;(messageID)]
```

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `customId` | Yes | Custom ID of the component to remove (at most 100 characters, otherwise the engine raises a length error), or the URL of a link button. |
| `messageID` | No | ID of an existing message sent by the bot (a positive integer, otherwise `Invalid message ID.`). Without it (or when empty), the components staged in the current script are searched. |

## Return Value

Returns an empty string. If no component has this custom ID (or URL), the function fails with `Component <id> not found.`

## Behavior

- **Without `messageID`**, only the components added earlier in the same script are searched. In the script run for a click, the clicked message is not part of the response being built, so give its ID.
- **With `messageID`**, the engine reads the components of that message and stages an edit without the component; the edit is applied when the response is flushed. This needs the bot's component service: without it the function fails with `No component service configured.`
- The text of the message is not changed: use `$editMessage` for that.

## Examples

### Remove a button from the response being built

```bdfd
Choose
$addButtonCV2[confirm_btn;Confirm;success]
$addButtonCV2[cancel_btn;Cancel;danger]
$removeComponent[cancel_btn]
```

### Remove a component of an existing message

```bdfd
$if[$customID==claim_reward]
  $removeComponent[claim_reward;123456789012345678]
$endif
```

## Notes

- The custom ID must match exactly (case-sensitive).
- A missing component is an error, not a silent no-op.
- To remove all buttons at once, use `$removeButtons[]`.
- To remove everything, use `$removeAllComponents[]`.
