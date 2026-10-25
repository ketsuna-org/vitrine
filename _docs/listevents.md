---
layout: doc
title: $listEvents
translation_key: docs
category: "Scheduled events"
function_name: listEvents
syntax: $listEvents
description: Returns the scheduled events of the server as a JSON array.
---

# $listEvents

Returns the scheduled events of the server as a JSON array. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching action.

## Syntax

```
$listEvents
```

## Return Value

- **Type**: String (JSON)
- A JSON array of events (ID, name, description, start, end, status, location); empty array when none. Read it with the `$json` functions.

## Behavior

- No special permission is needed.

## Examples

```bdfd
$jsonParse[$listEvents]
$jsonArrayCount
```
