---
layout: doc
title: $footer[]
translation_key: docs
category: "Embed & Message"
function_name: footer
syntax: $footer[text;(embedIndex)]
description: Sets the footer text of a Discord embed. The icon is set separately with $footerIcon. The footer appears at the bottom of the embed.
---

# $footer[]

The `$footer[]` function defines the **footer** of a Discord embed. The footer appears at the bottom of the embed and can include a small icon to the left of the text (set with `$footerIcon[]`).

## Syntax

```
$footer[text;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Text of the footer. Maximum length: 2048 characters (otherwise "Embed text cannot exceed 2048 characters."). |
| `embedIndex` | Optional. Index of the target embed, from 1 to 10 (Default: 1; empty means 1). |

The second argument is the embed index, not an icon URL: use `$footerIcon[iconURL;(embedIndex)]` for the icon.

## Return Value

Modifies the response currently being constructed. Returns an empty string.

## Behavior

- The footer is displayed at the bottom of the embed in a smaller font.
- The icon is set with `$footerIcon[]`; `$footer[]` only sets the text.
- A footer whose text is empty is removed when the message is sent.

## Examples

### Simple footer

```bdfd
$title[User Profile]
$description[
**Name:** $username
**ID:** $authorID
]
$footer[Requested by $username]
$color[#5865F2]
$sendMessage[]
```

### Footer with custom icon

```bdfd
$title[Information]
$description[This bot was created with BDFD.]
$footer[Powered by Bot Designer for Discord]
$footerIcon[https://bdfd.com/logo.png]
$color[#5865F2]
$sendMessage[]
```

### Footer with dynamic avatar

```bdfd
$title[Command executed]
$description[The command was processed successfully.]
$footer[Executed by $username]
$footerIcon[$authorAvatar]
$addTimestamp
$color[#57F287]
$sendMessage[]
```

## Notes

- The footer is often combined with `$addTimestamp[]` to display the date at the bottom of an embed.
- To set the icon, use `$footerIcon[]`.
