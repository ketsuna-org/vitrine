---
layout: doc
title: $serverDescription[]
translation_key: docs
category: "Entity Info"
function_name: serverDescription
syntax: $serverDescription[(Guild ID)]
description: Returns the description of the current Discord server, or of the server whose ID is given.
---

# $serverDescription[] — Server Description

`$serverDescription[]` returns the description of the current Discord server, or of another server when its ID is given, as reported by Discord.

## Syntax

```
$serverDescription[(Guild ID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `Guild ID` | Optional. The server to read. If omitted or empty, the current server is used. A non-numeric or non-positive value raises `Invalid guild ID.` |

## Return Value

- **Type**: `string`
- The description of the server, or an empty string if no description is set.

## Examples

### Display the description

```bdfd
$sendMessage[📝 Description: $serverDescription]
```

### Description of another server

```bdfd
$sendMessage[$serverDescription[123456789012345678]]
```

### Informational Embed

```bdfd
$title[$serverName]
$description[$serverDescription]
$addField[Owner;<@$serverOwner>;yes]
$addField[Members;$membersCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
```

### Check if a description exists

```bdfd
$if[$serverDescription==]
  $sendMessage[This server does not have a description.]
$else
  $sendMessage[**$serverName**: $serverDescription]
$endif
```

### Filter by keyword in the description

```bdfd
$if[$checkContains[$toLowercase[$serverDescription];gaming]==true]
  $sendMessage[This server is dedicated to gaming!]
$else
  $sendMessage[This server is not categorized as gaming.]
$endif
```

## Notes

- The description is optional; the function returns an empty string for a server without one.
- The server is fetched from Discord; if it cannot be fetched the error `Guild not found.` is raised.
- `$serverDescription` takes at most one argument, the server ID.
