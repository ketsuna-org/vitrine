---
layout: doc
title: $editInCV2
translation_key: docs
category: "Components & Interactions"
function_name: editInCV2
syntax: $editInCV2[Duration]
description: After a delay, replaces the components of the response of the command with the Components V2 layout built before the call.
---

# $editInCV2

`$editInCV2` is `$editIn` for a Components V2 layout: after the delay, it **replaces the components of the response message** with the layout the script built **before** the call.

## Syntax

```text
$editInCV2[Duration]
```

## Parameters

| Parameter | Description |
|---|---|
| `Duration` | Delay before the edit. Positive and at most 40 minutes, like `$editIn`. A plain number is read as seconds; units such as `ms`, `s`, `m` are accepted (`5s`, `1m30s`). |

Exactly one argument is required. An invalid duration raises `Duration must be positive and at most 40 minutes.`

## Behavior

- The layout built so far is taken and scheduled, then **emptied**: the components added after the call are the immediate response.
- After the delay, the response message is edited with an empty text, no embed, and the Components V2 flag. The previous components are replaced, not merged.
- The edit targets the main response of the script. Messages sent with `$sendMessage` are not edited.
- Nothing built before the call: `No Components V2 layout to apply.`
- The conversion to Components V2 is irreversible: the message can no longer carry a text or an embed.

## Examples

### Loading, then result

```bdfd
$addTextDisplay[Done! Your report is ready.]
$editInCV2[5s]
$addTextDisplay[Processing...]
```

The message shows `Processing...` at once and `Done! Your report is ready.` five seconds later.

### Button in an `interactionCreate` workflow

Workflow with the event `interactionCreate` and the custom ID filter (`customIdFilter`) `start`. `$customID` only exists in the script run for the click, never in the slash command.

```bdfd
$addContainer[state;#2ECC71]
$addTextDisplay[Task of $username finished.]
$editInCV2[10s]
$addContainer[state;#F1C40F]
$addTextDisplay[Task started by $username...]
```

## Notes

- To edit a message by its ID, immediately, use `$editMessageCV2`.
- For a classic message (text or embed), use `$editIn` or `$editEmbedIn`.
