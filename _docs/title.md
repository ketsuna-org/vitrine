---
layout: doc
title: $title[]
translation_key: docs
category: "Embed & Message"
function_name: title
syntax: $title[text;(embedIndex)]
description: Sets the title of a Discord embed. The title appears at the top of the embed, in bold and with a larger font size than the description.
---

# $title[]

The function `$title[]` sets the **title** of a Discord embed. The title is the most visible text of the embed, displayed at the top in bold with a larger font.

## Syntax

```
$title[text;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | The text of the title. You can use Discord markdown syntax (bold, italics, underline, etc.). |
| `embedIndex` | Optional. Index of the embed to modify (default is 0). Use this index to build multiple embeds in the same message (maximum of 10). |

## Return Value

This function returns nothing; it modifies the response currently being constructed. The pending embed is emitted automatically at the end of the script as the response; `$sendMessage[text]` does not send it, it posts a separate channel message and leaves the pending response untouched. See [Execution model](/docs/execution-model/).

## Behavior

- `$title[]` is a **response mutation**: it is added to the response currently in progress and is emitted with the pending response at the end of the script.
- If you call `$title[]` several times for the same embed index, only the last call is applied.
- The order of calls is important: place `$title[]` before `$description[]`, `$color[]`, etc.

## Examples

### Simple Embed with Title

```bdfd
$title[Welcome to the server!]
$description[Thank you for joining us 🎉]
$color[#5865F2]
```

### Title with Markdown Formatting

```bdfd
$title[**Important Announcement** — *Must Read* 📢]
$description[Here is the latest news of the server.]
$color[#FF0000]
```

### Multi-embed: Different Titles for Each Embed

```bdfd
$title[First embed;0]
$description[Content of the first embed;0]
$color[#5865F2;0]

$title[Second embed;1]
$description[Content of the second embed;1]
$color[#57F287;1]

```

## Notes

- The maximum length of the title is **256 characters**.
- If the text is empty, the title will not be displayed in the embed.
- For an embed without a title, simply omit the call to `$title[]`.

