---
layout: doc
title: $deleteSound
translation_key: docs
category: "Soundboard"
function_name: deleteSound
syntax: $deleteSound[soundID]
description: Deletes a soundboard sound of the server.
---

# $deleteSound

Deletes a soundboard sound of the server. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching action.

## Syntax

```
$deleteSound[soundID]
```

## Parameters

| Parameter | Description |
|---|---|
| `soundID` | **Required.** The sound ID. |

## Return Value

- Returns nothing.

## Behavior

- The bot needs Manage Guild Expressions.

## Examples

```bdfd
$deleteSound[$message[1]]
```
