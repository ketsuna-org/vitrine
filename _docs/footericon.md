---
layout: doc
title: $footerIcon[]
translation_key: docs
category: "Embed & Message"
function_name: footerIcon
syntax: $footerIcon[url;(embedIndex)]
description: Modifies the footer icon of an embed after it has been defined with $footer[]. Allows changing only the image without modifying the text.
---

# $footerIcon[]

The `$footerIcon[]` function allows you to **modify only the icon** of a footer already defined with `$footer[]`. It is useful when you want to define a dynamic icon without repeating the footer text.

## Syntax

```
$footerIcon[url;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `url` | URL of the image to use as the footer's icon. |
| `embedIndex` | Optional. Index of the targeted embed, from 1 to 10 (1 by default, also when empty). Any other value is an error. |

## Return Value

Modifies the response currently being constructed. Returns nothing.

## When to use $footerIcon[]

- You have already defined the footer with `$footer[text]` and want to add or change the icon.
- The icon depends on a dynamic variable (avatar, status, etc.).
- You want to separate the logic of the text and the icon for better readability.

## Examples

### Dynamic icon based on the user

```bdfd
$title[Profile]
$description[
**Name:** $username
**Tag:** $discriminator[$authorID]
]
$footer[Requested by $username]
$footerIcon[$authorAvatar]
$color[#5865F2]
```

### Conditional icon

```bdfd
$title[Server Status]
$description[The server is operational.]
$footer[Last check: $hour:$minute]
$if[$var[status]==online]
  $footerIcon[https://cdn.example.com/green.png]
$else
  $footerIcon[https://cdn.example.com/red.png]
$endif
$color[#57F287]
```

## Notes

- The icon is only sent when the same embed also has footer **text** (`$footer[]`). The order of the two calls does not matter, but an icon without text is dropped.
- The URL must point to a publicly accessible image.
