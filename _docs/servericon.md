---
layout: doc
title: $serverIcon[]
translation_key: docs
category: "Entity Info"
function_name: serverIcon
syntax: $serverIcon
description: Returns the URL of the Discord server icon.
---

# $serverIcon[] — Server Icon

`$serverIcon[]` returns the URL of the Discord server icon. If the server does not have a custom icon, the function returns an empty string.

## Syntax

```
$serverIcon
```

## Parameters

No parameters.

## Return Value

- **Type**: `string`
- The direct URL of the server icon (PNG or WEBP format), or an empty string if no icon is set.

## Usage

### Icon in an embed

```bdfd
$title[$serverName]
$description[Here is the icon of our server]
$image[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Thumbnail in a welcome message

```bdfd
$title[Welcome!]
$thumbnail[$serverIcon]
$description[Welcome to $serverName, $username!]
$addField[Members;$membersCount;yes]
$color[#2ECC71]
$sendEmbedMessage
```

### Check if the server has an icon

```bdfd
$if[$serverIcon==]
  $sendMessage[This server does not have a custom icon.]
$else
  $sendMessage[Icon of the server: $serverIcon]
$endif
```

### Footer with icon

```bdfd
$footer[$serverName;$serverIcon]
$description[Official message from the server]
$color[#F1C40F]
$sendEmbedMessage
```

## Notes

- `$serverIcon[]` is an alias of `$guildIcon[]`.
- The returned URL is a direct Discord CDN URL, accessible publicly.
- If the server does not have an icon, the function returns an empty string (`""`).
- The URL can be used in `$image[]`, `$thumbnail[]`, `$footer[]`, or `$author[text;url;$serverIcon]`.
