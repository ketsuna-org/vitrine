---
layout: doc
title: $author[]
translation_key: docs
category: "Embed & Message"
function_name: author
syntax: $author[name;(iconURL);(url);(embedIndex)]
description: Sets the author of a Discord embed. The author appears at the very top of the embed, above the title, with an optional icon and link.
---

# $author[]

The `$author[]` function defines the **author** section of a Discord embed. This section appears at the very top of the embed, above the title, and can include a small round icon as well as a clickable link.

## Syntax

```
$author[name;(iconURL);(url);(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The author name to display. Maximum length: 256 characters. |
| `iconURL` | Optional. URL of the avatar image (round icon to the left of the name). |
| `url` | Optional. Destination URL. If provided, the name becomes a clickable link. |
| `embedIndex` | Optional. Index of the targeted embed (0 by default). |

## Return value

Modifies the response in progress. Returns nothing.

## Behavior

- The author is displayed at the top of the embed, **above** the title.
- The icon is a small round image (~24px diameter).
- If `url` is provided, the author's name becomes a hyperlink.
- To modify the icon or the URL afterwards, use `$authorIcon[]` and `$authorURL[]`.

## Examples

### Simple author

```bdfd
$author[$username]
$title[Message from $username]
$description[This is an embed message.]
$color[#5865F2]
$sendMessage[]
```

### Author with avatar

```bdfd
$author[$username;$authorAvatar]
$title[Profile]
$description[
**Name:** $username
**ID:** $authorID
]
$color[#5865F2]
$sendMessage[]
```

### Author with clickable link

```bdfd
$author[Official Site;https://example.com/logo.png;https://example.com]
$title[Welcome]
$description[Click on the name above to visit our site!]
$color[#57F287]
$sendMessage[]
```

## Notes

- The visual order in the embed is: **Author** → Title → Description → Fields → Image → Footer → Timestamp.
- If you want to change only the icon after setting the author, use `$authorIcon[]`.
- If you want to change only the URL after setting the author, use `$authorURL[]`.
