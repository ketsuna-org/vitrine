---
layout: doc
title: $authorIcon[]
translation_key: docs
category: "Embed & Message"
function_name: authorIcon
syntax: $authorIcon[url;(embedIndex)]
description: Modifies the icon (avatar) of the author of an embed after it has been set with $author[]. Allows changing only the image without modifying the name or the URL.
---

# $authorIcon[]

The `$authorIcon[]` function **modifies only the icon** of the author of an embed after it has been set with `$author[]`. It avoids repeating the name and the URL when only the image needs to change.

## Syntax

```
$authorIcon[url;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `url` | URL of the image to use as the author's icon. |
| `embedIndex` | Optional. Index of the targeted embed (0 by default). |

## Return value

Modifies the response in progress. Returns nothing.

## When to use $authorIcon[]

- You have already set the author with `$author[name]` and want to add or change the icon without modifying the name.
- The icon depends on a dynamic variable (avatar, role, etc.).
- You want a modular and readable structure.

## Examples

### Adding the user's avatar as an icon

```bdfd
$author[$username]
$authorIcon[$authorAvatar]
$title[Profile of $username]
$description[
**ID:** $authorID
**Account created on:** $creationDate[$authorID]
]
$color[#5865F2]
$sendMessage[]
```

### Different icon based on role

```bdfd
$author[Moderation Message]
$if[$hasRole[$authorID;admin]]
$authorIcon[https://cdn.example.com/admin-badge.png]
$elseif[$hasRole[$authorID;modo]]
$authorIcon[https://cdn.example.com/modo-badge.png]
$else
$authorIcon[$authorAvatar]
$endif
$title[Warning]
$description[Please respect the server rules.]
$color[#ED4245]
$sendMessage[]
```

## Notes

- `$authorIcon[]` must be called **after** `$author[]`, otherwise the icon has no author to apply to.
- If `$authorIcon[]` is called before `$author[]`, the icon will be ignored.
- The URL must point to a publicly accessible image (PNG, JPG, GIF, WebP).
- To change the name or add a link, use `$author[]` (which redefines everything) or `$authorURL[]` respectively.
