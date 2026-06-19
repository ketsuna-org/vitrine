---
layout: doc
title: $description[]
translation_key: docs
category: "Embed & Message"
function_name: description
syntax: $description[text;(embedIndex)]
description: Sets the main body (description) of a Discord embed. This is the main text area, located below the title.
---

# $description[]

The `$description[]` function defines the **main body** (description) of a Discord embed. This is the main text area of the embed, displayed below the title.

## Syntax

```
$description[text;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | The text of the description. Supports Discord markdown, line breaks, emojis, and interpolation of BDFD functions/variables. |
| `embedIndex` | Optional. Index of the embed to modify (0 by default). |

## Return value

This function returns nothing; it modifies the response currently being constructed. The embed is sent via `$sendMessage[]`.

## Behavior

- `$description[]` is a **response mutation**.
- The description is the core of the embed's content: this is where you place the bulk of your text.
- Maximum length: **4096 characters**.
- If the text is empty, the description will not be displayed.

## Examples

### Simple description

```bdfd
$title[Information]
$description[Here is the requested information. Use the buttons below to navigate.]
$color[#5865F2]
$sendMessage[]
```

### Multi-line description with markdown

```bdfd
$title[Server Rules]
$description[
**Server Rules:**
1. Respect other members
2. No spam
3. No NSFW content

*Thank you for your understanding!*
]
$color[#ED4245]
$sendMessage[]
```

### Description with dynamic variables

```bdfd
$title[Profile]
$description[
**Name:** $username
**ID:** $authorID
**Registration Date:** $creationDate[$authorID]
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- The description supports full Discord markdown: `**bold**`, `*italics*`, `__underline__`, `~~strikethrough~~`, lists, code blocks, etc.
- To structure complex information, combine `$description[]` with `$addField[]`.
