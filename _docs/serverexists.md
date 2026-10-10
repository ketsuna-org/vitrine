---
layout: doc
title: $serverExists[]
translation_key: docs
category: "Entity Info"
function_name: serverExists
syntax: $serverExists[serverID]
description: Tells whether the bot can see the server with the given ID.
---

# $serverExists[]

`$serverExists[serverID]` returns `true` when the bot can look up the server with that ID, and `false` otherwise.

## Parameters

| Parameter | Description |
|---|---|
| `serverID` | The numeric ID of the server. Required. |

## Return Value

- `true` or `false` (as text).
- An ID that is not a valid server ID, or a server the bot cannot see, gives `false`; it is not an error.

## Example

```bdfd
$if[$serverExists[123456789012345678]==true]
  The bot is in that server.
$else
  The bot does not know that server.
$endif
```
