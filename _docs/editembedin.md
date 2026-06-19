---
layout: doc
title: $editEmbedIn[]
translation_key: docs
category: "Embed & Message"
function_name: editEmbedIn
syntax: $editEmbedIn[duration]
description: Schedules the editing of a message's embed after a specified delay. Unlike $editIn[], only the embed is modified — the text content of the message remains unchanged.
---

# $editEmbedIn[] — Delayed Embed Editing

`$editEmbedIn[]` schedules the update of the embed of a message after a delay. Only the embed is modified — the text of the message (sent via `$sendMessage`) is not affected.

## Syntax

```
$editEmbedIn[duration]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `duration` | Yes | Delay before editing. Format: number + unit. |

## Duration Format

| Format | Unit | Example |
|--------|-------|---------|
| `Xs` | Seconds | `3s`, `10s` |
| `Xm` | Minutes | `1m`, `5m` |
| `Xh` | Hours | `1h` |

## Return value

Schedules the delayed editing of the embed. The new embed is defined after the call to `$editEmbedIn[]`.

## Difference from $editIn[]

| $editEmbedIn[] | $editIn[] |
|---------------|-----------|
| Modifies only the embed | Modifies the entire message (text + embed) |
| Preserves the text of the message | Replaces the entire content |
| Ideal for visual updates | Ideal for complete transitions |

## Usage

### Progress indicator

```bdfd
$sendMessage[Updating...]
$title[Progression]
$description[🟡 Processing data...]
$color[#F1C40F]
$editEmbedIn[5s]
$title[Progression]
$description[🟢 Completed successfully!]
$color[#2ECC71]
```

### Status change

```bdfd
$title[🔍 Search in progress]
$description[Analyzing database...]
$color[#3498DB]
$footer[Please wait...]
$editEmbedIn[3s]
$title[✅ Search completed]
$description[3 results found]
$color[#2ECC71]
$footer[Completed]
```

### Visual transition

```bdfd
$sendMessage[Preparing report...]
$title[Monthly Report]
$description[📊 Generating...]
$color[#E67E22]
$editEmbedIn[5s]
$title[Monthly Report - June 2026]
$description[✅ Report generated successfully\n\n📈 Growth: +15%\n💰 Revenue: 12,450€\n👥 New members: 230]
$color[#27AE60]
$footer[Generated on $date]
```

## Notes

- `$editEmbedIn[]` only modifies the embed; the text content (first argument of `$sendMessage`) remains intact.
- The new embed completely replaces the old one (no merging).
- To modify both the text and the embed at the same time, use `$editIn[]`.
- The maximum duration is generally 15 minutes.
