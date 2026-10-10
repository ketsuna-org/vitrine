---
layout: doc
title: $serverDescription[]
translation_key: docs
category: "Entity Info"
function_name: serverDescription
syntax: $serverDescription
description: Returns the description of the Discord server (configured in the server settings).
---

# $serverDescription[] — Server Description

`$serverDescription[]` returns the description of the current Discord server as reported by Discord.

## Syntax

```
$serverDescription
```

## Parameters

No parameters.

## Return Value

- **Type**: `string`
- The description of the server, or an empty string if no description is set.

## Examples

### Display the description

```bdfd
$sendMessage[📝 Description: $serverDescription]
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
- `$serverDescription` takes no argument.
