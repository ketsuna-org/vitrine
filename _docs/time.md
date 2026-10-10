---
layout: doc
title: $time[]
translation_key: docs
category: "Date & Time"
function_name: time
syntax: $time[timezone]
description: Sets the timezone (TZ database name) used by the date and time functions of the rest of the command. Returns nothing.
---

# $time[]

The function `$time[]` **sets the timezone** used by the date and time functions (`$hour`, `$minute`, `$second`, `$date`, `$day`, `$month`, `$year`, `$creationDate`, ...) evaluated afterwards in the command.

## Syntax

```
$time[timezone]
```

## Parameters

| Parameter | Description |
|---|---|
| `timezone` | Required - A TZ database timezone name (e.g., `Europe/Paris`, `America/New_York`). |

## Return Value

None (empty string). An error is raised if the timezone is empty or unknown.

## Examples

### Set the timezone

```bdfd
$time[Europe/Paris]
It is $hour:$minute:$second in Paris.
```

### Date in a given timezone

```bdfd
$time[America/New_York]
📅 $date, hour: $hour
```

## Notes

- Used on its own (`$time` with no argument), the function is invalid: the timezone is required.
- For the individual values, use `$hour`, `$minute` and `$second`.
- For a Unix timestamp, use `$getTimestamp[]`.
