---
layout: doc
title: $guildIcon[]
translation_key: docs
category: "Entity Info"
function_name: guildIcon
syntax: $guildIcon[(guildID)]
description: Alias of $serverIcon. Returns the URL of the Discord server icon.
---

# $guildIcon[] — Server Icon (Alias)

`$guildIcon[]` is an alias of `$serverIcon[]`. It returns the URL of the Discord server icon.

## Syntax

```
$guildIcon[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | *(Optional)* The ID of a server. When omitted or empty, the current server is used. A non-empty value that is not a positive integer raises `Invalid guild ID.` |

## Return Value

- **Type** : `string`
- The URL of the icon (`https://cdn.discordapp.com/icons/<guildID>/<hash>.png`, or `.gif` when the icon hash starts with `a_`, i.e. animated), or an empty string.
- If the server cannot be fetched, the value of the `guild.icon` context variable supplied by the host is returned, or an empty string if there is none.

## Examples

### Embed with icon

```bdfd
$title[$guildName]
$thumbnail[$guildIcon]
$description[$serverDescription]
$color[#5865F2]
```

### Footer with icon

```bdfd
$footer[$guildName;$guildIcon]
$description[Official message]
$color[#2ECC71]
```

### Icon check

```bdfd
$if[$guildIcon==]
$sendMessage[⚠️ This server does not have a custom icon.]
$else
$sendMessage[✅ Server icon: $guildIcon]
$endif
```

## Notes

- `$serverIcon` is not strictly identical: it takes no argument and raises `Guild not found.` when the server cannot be fetched.
- Returns an empty string if the server has no icon.
