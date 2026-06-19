---
layout: doc
title: $footer[]
translation_key: docs
category: "Embed & Message"
function_name: footer
syntax: $footer[text;(iconURL);(embedIndex)]
description: Sets the footer of a Discord embed, optionally with an icon. The footer appears at the bottom of the embed.
---

# $footer[]

The `$footer[]` function defines the **footer** of a Discord embed. The footer appears at the bottom of the embed and can include a small icon to the left of the text.

## Syntax

```
$footer[text;(iconURL);(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Text of the footer. Maximum length: 2048 characters. |
| `iconURL` | Optional. URL of the footer's icon. Must be a valid URL pointing to an image. |
| `embedIndex` | Optional. Index of the target embed (Default: 1). |

## Return Value

Modifies the response currently being constructed. Returns nothing directly.

## Behavior

- The footer is displayed at the bottom of the embed in a smaller font.
- If an `iconURL` is provided, a small squared icon appears to the left of the text.
- To modify only the icon after defining the footer, use `$footerIcon[]`.

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
$footer[Powered by Bot Designer for Discord;https://bdfd.com/logo.png]
$color[#5865F2]
$sendMessage[]
```

### Footer with dynamic avatar

```bdfd
$title[Command executed]
$description[The command was processed successfully.]
$footer[Executed by $username;$authorAvatar]
$addTimestamp
$color[#57F287]
$sendMessage[]
```

## Notes

- The footer is often combined with `$addTimestamp[]` to display the date at the bottom of an embed.
- If you wish to change the icon without modifying the footer text, use `$footerIcon[]`.
- The URL of the icon must be a publicly accessible image (PNG, JPG, GIF, WebP).
