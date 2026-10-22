---
layout: doc
title: $editContainer
translation_key: docs
category: "Components & Interactions"
function_name: editContainer
syntax: $editContainer[Index;(Color;Spoiler;Message ID)]
description: Changes the accent color and the spoiler state of the n-th container of a Components V2 message.
---

# $editContainer

`$editContainer` **changes the accent color and the spoiler state** of a container, chosen by its rank.

## Syntax

```text
$editContainer[Index;(Color;Spoiler;Message ID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `Index` | Rank of the container, counted from 1 in reading order. Otherwise `Index must be a positive whole number.` |
| `Color` | *(Optional)* `#RRGGBB`, `RRGGBB` or a whole number from 0 to 16777215. Digits alone are a number (`255000` is `#03E498`, not `#255000`). `none` removes the color. Empty leaves it unchanged. Otherwise `Container color must be #RRGGBB or a number from 0 to 16777215.` |
| `Spoiler` | *(Optional)* `yes`/`true` hides the container behind a spoiler, `no`/`false` removes the spoiler. Empty leaves it unchanged. Any other value raises `Expected yes or no, got "<value>".` |
| `Message ID` | *(Optional)* ID of a message sent by the bot (a positive integer, otherwise `Invalid message ID.`). |

## Behavior

- At least one of `Color` and `Spoiler` must be given, otherwise `Give a color or a spoiler value.`
- No such container: `Container <n> not found.`
- **With `Message ID`**, the message is read and rewritten when the response is flushed; its Components V2 layout and flag are kept.
- **Without `Message ID`**, in the script run for a click, it edits the **clicked message**. Elsewhere, it edits the container of the layout being built.
- The content of the container is not changed.
- Only a message written by the bot can be edited (`Only bot-authored message components can be edited.`); an ephemeral message cannot be edited by its ID. A classic message has no container, and only `$editMessageCV2` can convert it (irreversibly).

## Examples

### Button in an `interactionCreate` workflow

Workflow with the event `interactionCreate` and the custom ID filter (`customIdFilter`) `approve`. `$customID` only exists in the script run for the click, never in the slash command.

```bdfd
$editContainer[1;#2ECC71]
$editButton[approve;Approved;success;yes]
```

The first container of the clicked message turns green and its button is disabled.

### Remove the color and hide the content

```bdfd
$editContainer[2;none;yes;$message[1]]
```

## Notes

- To change the texts, use `$editTextDisplay`; to replace everything, `$editMessageCV2`.
