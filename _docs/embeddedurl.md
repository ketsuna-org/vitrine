---
layout: doc
title: $embeddedURL
translation_key: docs
category: "Embed & Message"
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
| `embedIndex` | Optional. Index of the targeted embed, from 1 to 10 (1 by default, also when empty). Any other value is an error. |

## Return value

None.

## Behavior

- The title of the embed (`$title[]`) becomes clickable.
- The URL is only sent when the same embed also has a non-empty title; the order of the two calls does not matter.

## Examples

### Embed with a clickable title

```bdfd
$title[Join our server!]
$embeddedURL[https://discord.gg/example]
$description[Click on the title to join us.]
$color[#5865F2]
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
```

### Multiple embeds with different URLs

```bdfd
$title[Website;1]
$embeddedURL[https://example.com;1]
$description[Our official website.;1]
$title[Discord;2]
$embeddedURL[https://discord.gg/example;2]
$description[Our Discord server.;2]
```

## Notes

- Without `$embeddedURL[]`, the title of the embed is not clickable.
- Works with all styles of embed.
