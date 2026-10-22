---
layout: doc
title: $editThumbnail
translation_key: docs
category: "Components & Interactions"
function_name: editThumbnail
syntax: $editThumbnail[Position;URL;(Description;Spoiler;Message ID)]
description: Replaces the n-th thumbnail of a Components V2 message (URL, description and spoiler).
---

# $editThumbnail

`$editThumbnail` **replaces a thumbnail** of a Components V2 message, chosen by its rank. A thumbnail is the image placed on the side of a section (`$addSection` then `$addThumbnail`).

## Syntax

```text
$editThumbnail[Position;URL;(Description;Spoiler;Message ID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `Position` | Rank of the thumbnail, counted from 1 in reading order. Otherwise `Position must be a positive whole number.` |
| `URL` | New image URL. Must not be empty (`Thumbnail URL must not be empty.`). |
| `Description` | *(Optional)* Alternative text, 0 to 1024 characters (`Description must contain 0 to 1024 characters.`). |
| `Spoiler` | *(Optional)* `yes`/`true` hides the image behind a spoiler. Empty or `no` means no spoiler. Any other value raises `Expected yes or no, got "<value>".` |
| `Message ID` | *(Optional)* ID of a message sent by the bot (a positive integer, otherwise `Invalid message ID.`). |

## Behavior

- Like `$editButton`, the thumbnail is replaced: **what is omitted goes back to its default** (no description, no spoiler).
- No such thumbnail: `Thumbnail <n> not found.`
- **With `Message ID`**, the message is read and rewritten when the response is flushed; its Components V2 layout and flag are kept.
- **Without `Message ID`**, in the script run for a click, it edits the **clicked message**. Elsewhere, it edits the layout being built.
- Only a message written by the bot can be edited (`Only bot-authored message components can be edited.`); an ephemeral message cannot be edited by its ID. A classic message has no thumbnail component, and only `$editMessageCV2` can convert it (irreversibly).

## Examples

### Button in an `interactionCreate` workflow

Workflow with the event `interactionCreate` and the custom ID filter (`customIdFilter`) `show_avatar`. `$customID` only exists in the script run for the click, never in the slash command.

```bdfd
$editThumbnail[1;$authorAvatar;Avatar of $username]
```

### Spoiler on a message chosen by its ID

```bdfd
$editThumbnail[2;https://example.com/secret.png;Secret;yes;$message[1]]
```

## Notes

- Do not confuse it with `$thumbnail`, the thumbnail of a classic embed.
- To add a thumbnail, use `$addThumbnail`.
