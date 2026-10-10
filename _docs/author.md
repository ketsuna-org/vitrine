---
layout: doc
title: $author[]
translation_key: docs
category: "Embed & Message"
function_name: author
syntax: $author[name;(embedIndex)]
description: Sets the author name of a Discord embed. The author appears at the very top of the embed, above the title. The icon and the link are set with $authorIcon[] and $authorURL[].
---

# $author[]

The `$author[]` function defines the **author** section of a Discord embed. This section appears at the very top of the embed, above the title. It only sets the author **name**; use `$authorIcon[]` and `$authorURL[]` for the icon and the link.

## Syntax

```
$author[name;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The author name to display. Required, maximum length: 256 characters (longer text is an error). |
| `embedIndex` | Optional. Index of the targeted embed, from 1 to 10 (1 by default, also when empty). Any other value is an error. |

## Return value

Modifies the response in progress. Returns nothing.

## Behavior

- The author is displayed at the top of the embed, **above** the title.
- To set the icon or the URL, use `$authorIcon[iconURL;(embedIndex)]` and `$authorURL[url;(embedIndex)]`.

## Examples

### Simple author

```bdfd
$author[$username]
$title[Message from $username]
$description[This is an embed message.]
$color[#5865F2]
```

### Author with avatar

```bdfd
$author[$username]
$authorIcon[$authorAvatar]
$title[Profile]
$description[
**Name:** $username
**ID:** $authorID
]
$color[#5865F2]
```

### Author with clickable link

```bdfd
$author[Official Site]
$authorIcon[https://example.com/logo.png]
$authorURL[https://example.com]
$title[Welcome]
$description[Click on the name above to visit our site!]
$color[#57F287]
```

## Notes

- The visual order in the embed is: **Author** → Title → Description → Fields → Image → Footer → Timestamp.
- If you want to change only the icon after setting the author, use `$authorIcon[]`.
- If you want to change only the URL after setting the author, use `$authorURL[]`.
