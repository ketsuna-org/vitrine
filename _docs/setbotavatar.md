---
layout: doc
title: $setBotAvatar
translation_key: docs
category: "Bot profile"
function_name: setBotAvatar
syntax: $setBotAvatar[url]
description: Changes the avatar of the bot from an image URL.
---

# $setBotAvatar

Changes the avatar of the bot from an image URL. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching action.

## Syntax

```
$setBotAvatar[url]
```

## Parameters

| Parameter | Description |
|---|---|
| `url` | **Required.** A public image URL (PNG, JPG or GIF). |

## Return Value

- Returns nothing.

## Behavior

- Discord limits how often the avatar can change.
- The image is downloaded by the bot, never keep a private URL here.

## Examples

```bdfd
$setBotAvatar[https://example.com/avatar.png]
```
