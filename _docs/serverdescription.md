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

`$serverDescription[]` returns the text description of the Discord server as configured in the server settings (under the "Overview" section).

## Syntax

```
$serverDescription
```

## Parameters

No parameters.

## Return Value

- **Type**: `string`
- The description of the server, or an empty string if no description is set.

## Usage

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
$sendEmbedMessage
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
$if[$toLowercase[$serverDescription]$contains[gaming]]
  $sendMessage[This server is dedicated to gaming!]
$else
  $sendMessage[This server is not categorized as gaming.]
$endif
```

## Notes

- The description is optional; not all servers have one.
- The maximum length of a server description is 1,000 characters.
- Useful for displaying contextual information about the server in embeds or help commands.
- Can be combined with other functions for more complete server information.
