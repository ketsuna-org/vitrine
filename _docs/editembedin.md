---
layout: doc
title: $editEmbedIn[]
translation_key: docs
category: "Embed & Message"
function_name: editEmbedIn
syntax: $editEmbedIn[duration;title;(description);(footer);(color)]
description: Schedules, after a delay, the replacement of the embed of the message sent by the current command with an embed built from its arguments.
---

# $editEmbedIn[] — Delayed Embed Editing

`$editEmbedIn[]` schedules the replacement of the embed of the message sent by the command after a delay. The new embed is built from the arguments of the function itself (title, description, footer, color), not from `$title` / `$description` calls placed after it.

## Syntax

```
$editEmbedIn[duration;title;(description);(footer);(color)]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `duration` | Yes | Delay before editing. Positive, at most 40 minutes. A plain number is read as seconds; units such as `s`, `m`, `h` are accepted. |
| `title` | Yes (may be empty) | New embed title. The argument must be present, but it may be empty when `description` or `footer` is set. |
| `description` | No | New embed description (empty by default). |
| `footer` | No | New embed footer text (empty by default). |
| `color` | No | Embed color: `#RRGGBB`, `RRGGBB` (hex) or an integer. Invalid values raise "Invalid embed color.". |

Between 2 and 5 arguments are accepted. At least one of `title`, `description`, `footer` must be non-empty ("At least one embed text field is required.").

## Duration Format

| Format | Unit | Example |
|--------|-------|---------|
| `Xs` | Seconds | `3s`, `10s` |
| `Xm` | Minutes | `1m`, `5m` |

## Return value

An empty string. The edit is scheduled and applied to the response message of the command.

## Examples

### Progress indicator

```bdfd
Updating...
$title[Progression]
$description[🟡 Processing data...]
$color[#F1C40F]
$editEmbedIn[5s;Progression;🟢 Completed successfully!;;#2ECC71]
```

### Status change

```bdfd
$title[🔍 Search in progress]
$description[Analyzing database...]
$color[#3498DB]
$footer[Please wait...]
$editEmbedIn[3s;✅ Search completed;3 results found;Completed;#2ECC71]
```

## Notes

- The embed is replaced entirely by the one built from the arguments (no merging): omitted fields become empty.
- The edit is built with an empty `content` and a replacement embed.
- The maximum duration is 40 minutes.
- To change the text of the message, use `$editIn[]`.
