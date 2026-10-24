---
layout: doc
title: $getCreationDateTimestamp
translation_key: docs
category: "Date & Time"
function_name: getCreationDateTimestamp
syntax: $getCreationDateTimestamp[ID;(Time unit)]
description: Returns the creation date of any Discord ID (snowflake) as a Unix timestamp, in seconds or milliseconds.
---

# $getCreationDateTimestamp

Extracts the creation instant encoded in a Discord ID (user, server, channel, role, message...) and returns it as a Unix timestamp.

## Syntax

```
$getCreationDateTimestamp[ID;(Time unit)]
```

## Parameters

| Parameter | Description |
|---|---|
| `ID` | Required. A positive unsigned 64-bit Discord ID, otherwise the error "Expected a positive unsigned 64-bit Discord ID." is raised. |
| `Time unit` | Optional. `s` (seconds, default) or `ms` (milliseconds). Any other value raises "Time unit must be s or ms.". |

## Return value

- The Unix timestamp of the creation of the ID.

## Examples

### Discord timestamp

```bdfd
Account created: <t:$getCreationDateTimestamp[$authorID]:R>
```

### Milliseconds

```bdfd
$getCreationDateTimestamp[$channelID;ms]
```
