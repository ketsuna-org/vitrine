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

`$serverIcon[]` returns the URL of the icon of the current Discord server. If the server does not have a custom icon, the function returns an empty string.

## Syntax

```
$serverIcon
```

## Parameters

No parameters.

## Return Value

- **Type**: `string`
- The URL of the server icon (`https://cdn.discordapp.com/icons/<guildID>/<hash>.png`, or `.gif` when the icon hash starts with `a_`), or an empty string if no icon is set.
- The server is fetched from Discord; if it cannot be fetched the error `Guild not found.` is raised.

## Examples

### Icon in an embed

```bdfd
$title[$serverName]
$description[Here is the icon of our server]
$image[$serverIcon]
$color[#5865F2]
```

### Thumbnail in a welcome message

```bdfd
$title[Welcome!]
$thumbnail[$serverIcon]
$description[Welcome to $serverName, $username!]
$addField[Members;$membersCount;yes]
$color[#2ECC71]
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
```

## Notes

- `$serverIcon` takes no argument. `$guildIcon[(guildID)]` is a different function that accepts a server ID and does not raise an error when the server cannot be fetched.
- If the server does not have an icon, the function returns an empty string (`""`).
- The URL can be used in `$image[]`, `$thumbnail[]` or `$footer[]`.
