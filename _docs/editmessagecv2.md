---
layout: doc
title: $editMessageCV2
translation_key: docs
category: "Components & Interactions"
function_name: editMessageCV2
syntax: $editMessageCV2[(Channel ID;Message ID)]
description: Replaces every component of a message sent by the bot with the Components V2 layout built before the call. Without arguments, edits the message that was clicked.
---

# $editMessageCV2

`$editMessageCV2` **replaces all the components of an existing message** of the bot with the Components V2 layout (`$addContainer`, `$addTextDisplay`, `$addSection`, `$addButtonCV2`, ...) that the script built **before** the call. It is the function that changes the text of a Components V2 message.

## Syntax

```text
$editMessageCV2[(Channel ID;Message ID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `Channel ID` | ID of the channel that holds the message (a decimal ID, otherwise `Invalid Discord ID.`). |
| `Message ID` | ID of the message to edit (a decimal ID, otherwise `Invalid Discord ID.`). |

Zero or two arguments are accepted. One argument is an error (`Edit message CV2 expects zero or two arguments.`).

## Behavior

- The layout built so far is taken, validated, applied to the message, and then **emptied**: what the script adds after the call forms the normal response of the script.
- The message is edited with an empty text, no embed, and the Components V2 flag. Every previous component of the message is replaced, not merged.
- **Without arguments**, in the script run for a button or select menu click, it edits the clicked message. Anywhere else, give both IDs, otherwise the error is `Give a channel and message ID outside a button or select menu interaction.`
- The edit is made when the function runs, not at the end of the script.
- In a click script, the click is acknowledged like any other interaction: the waiting message that Discord shows is removed at the end of the script.

## Limits and errors

| Case | Result |
|---|---|
| Nothing built before the call | `No Components V2 layout to apply.` |
| Message written by another author | `Only the bot own messages can be edited.` |
| Layout over the V2 limits | `A message supports at most 40 components.`, `Text displays hold at most 4000 characters in total.`, `A media gallery holds 1 to 10 items.`, `A section holds 1 to 3 text displays.` |
| The bot cannot see the channel | `Missing permissions for the message operation.` |

- **The conversion is irreversible.** A classic message edited with `$editMessageCV2` becomes a Components V2 message for good: it can no longer carry a text or an embed.
- An **ephemeral** message cannot be edited by its ID: it is not a message of the channel that the bot can fetch.
- `$editMessage`, `$editIn` and `$editEmbedIn` refuse a Components V2 message with `This message uses Components V2: edit it with $editMessageCV2.`

## Examples

### Button in an `interactionCreate` workflow

The panel is sent by a command, with a button whose custom ID is `confirm`. The workflow has the event `interactionCreate` and the custom ID filter (`customIdFilter`) `confirm`. `$customID` only exists in the script run for the click, never in the slash command.

```bdfd
$addContainer[done;#2ECC71]
$addTextDisplay[Order confirmed by $username]
$addSeparator
$addTextDisplay[Thank you!]
$editMessageCV2
```

The clicked message now shows the new layout, without its button.

### Message chosen by its ID

Slash command whose first option holds the ID of the message:

```bdfd
$addTextDisplay[Panel refreshed by $username]
$addButtonCV2[confirm;Confirm;success]
$editMessageCV2[$channelID;$message[1]]
```

## Notes

- Build the layout before the call: the components added after it are the response, not the edit.
- For one change only (a text, a color, a thumbnail, a menu option), prefer `$editTextDisplay`, `$editContainer`, `$editThumbnail` or `$removeSelectMenuOption`.
- For a delayed edit of the response of the command, see `$editInCV2`.
