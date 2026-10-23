---
layout: doc
title: $editTextDisplay
translation_key: docs
category: "Components & Interactions"
function_name: editTextDisplay
syntax: $editTextDisplay[Position;Content;(Message ID)]
description: Replaces the content of the n-th text display of a Components V2 message, in the response being built or in a message of the bot.
---

# $editTextDisplay

`$editTextDisplay` **replaces the text of one text display** of a Components V2 message, chosen by its rank.

## Syntax

```text
$editTextDisplay[Position;Content;(Message ID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `Position` | Rank of the text display, counted from 1 in reading order, depth first (the texts inside containers and sections are counted). Otherwise `Position must be a positive whole number.` |
| `Content` | New text. Must not be empty (`Text display content must not be empty.`). |
| `Message ID` | *(Optional)* ID of a message sent by the bot, in the current channel (a positive integer, otherwise `Invalid message ID.`). |

## Behavior

- **With `Message ID`**, the message is read, the text is replaced and the message is rewritten when the response is flushed. Its Components V2 flag is kept.
- **Without `Message ID`**, in the script run for a click, it edits the **clicked message**. Elsewhere, it edits the text display of the layout being built by the script.
- No such text display: `Text display <n> not found.`
- Everything else in the message (containers, buttons, other texts) is unchanged.

## Limits

- The texts of a message hold 4000 characters in total (`Text displays hold at most 4000 characters in total.`), checked before the edit.
- Only a message written by the bot can be edited (`Only bot-authored message components can be edited.`). An ephemeral message cannot be edited by its ID.
- A classic message has no text display: change its text with `$editMessage`. Only `$editMessageCV2` turns a classic message into a Components V2 one, and this cannot be undone.

## Examples

### Button in an `interactionCreate` workflow

Workflow with the event `interactionCreate` and the custom ID filter (`customIdFilter`) `vote_up`. `$customID` only exists in the script run for the click, never in the slash command.

```bdfd
$editTextDisplay[2;Last vote: $username]
```

The second text of the clicked panel is replaced, the rest stays.

### Message chosen by its ID

```bdfd
$editTextDisplay[1;**Server status:** online;$message[1]]
```

## Notes

- To replace the whole layout, use `$editMessageCV2`.
- To change a color or a spoiler, see `$editContainer`; for an image, `$editThumbnail`.
