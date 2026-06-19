---
layout: doc
title: $embeddedURL
translation_key: docs
category: "Embeds"
function_name: embeddedURL
syntax: $embeddedURL[url;(embedIndex)]
description: Sets the clickable URL of an embed's title. When the user clicks on the title of the embed, they are redirected to this URL.
---
# $embeddedURL

The `$embeddedURL[]` function sets the **clickable URL of the title** of an embed. The title becomes a hyperlink.

## Syntax

```
$embeddedURL[url;(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `url` | The target URL (must start with `http://` or `https://`). |
| `embedIndex` | *(Optional)* Index of the embed (1, 2, 3...). Default: 1. |

## Return value

None.

## Behavior

- The title of the embed (`$title[]`) becomes clickable.
- Works only if a `$title[]` is defined.
- The URL must be valid and accessible.

## Examples

### Embed with a clickable title

```bdfd
$title[Join our server!]
$embeddedURL[https://discord.gg/example]
$description[Click on the title to join us.]
$color[#5865F2]
$sendMessage[]
```

### Informative embed with a link

```bdfd
$title[View the documentation]
$embeddedURL[https://docs.example.com]
$description[
Command: **!help**
Category: Utilities
]
$footer[Official documentation]
$color[#57F287]
$sendMessage[]
```

### Multiple embeds with different URLs

```bdfd
$title[Website]
$embeddedURL[https://example.com]
$description[Our official website.]
$addEmbed
$title[Discord]
$embeddedURL[https://discord.gg/example;2]
$description[Our Discord server.]
```

## Notes

- Without `$embeddedURL[]`, the title of the embed is not clickable.
- Should be placed after `$title[]` for the URL to be associated.
- Works with all styles of embed.
