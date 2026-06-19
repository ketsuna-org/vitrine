---
layout: doc
title: $authorUrl[]
translation_key: docs
category: "Embed & Message"
function_name: authorUrl
syntax: $authorUrl[url;(embedIndex)]
description: Modifies the destination URL of the author of an embed. Makes the author's name clickable without having to redefine the name and the icon.
---

# $authorUrl[]

The `$authorUrl[]` function **modifies only the URL** of the author of an embed. Once defined, the author's name becomes a clickable hyperlink.

## Syntax

```
$authorUrl[url;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `url` | Destination URL. The author name will point to this address. |
| `embedIndex` | Optional. Index of the targeted embed (0 by default). |

## Return value

Modifies the response in progress. Returns nothing.

## When to use $authorUrl[]

- You have already set the author with `$author[name]` or `$author[name;icon]` and want to make it clickable.
- The URL is dynamic (depends on a variable, an ID, etc.).
- You want to separate the definition of the name/icon from that of the link for better clarity.

## Examples

### Link to the Discord profile of the user

```bdfd
$author[$username;$authorAvatar]
$authorUrl[https://discord.com/users/$authorID]
$title[User Profile]
$description[
Click on the name above to open the Discord profile.
]
$color[#5865F2]
$sendMessage[]
```

### Conditional link

```bdfd
$author[Website;$serverIcon]
$if[$var[page]!=]
$authorUrl[https://mysite.com/$var[page]]
$else
$authorUrl[https://mysite.com]
$endif
$title[Navigation]
$description[Select a page in the menu below.]
$color[#5865F2]
$sendMessage[]
```

### Author with all attributes separated

```bdfd
$author[Bot Designer for Discord]
$authorIcon[https://bdfd.com/icon.png]
$authorUrl[https://bdfd.com]
$title[Created with BDFD]
$description[This bot was created with Bot Designer for Discord.]
$footer[Version 2.0]
$color[#5865F2]
$sendMessage[]
```

## Notes

- `$authorUrl[]` must be called **after** `$author[]`, otherwise there is no author to apply the URL to.
- If you call `$authorUrl[]` alone (without `$author[]` beforehand), the URL will be ignored.
- The URL must be absolute (starting with `http://` or `https://`).
