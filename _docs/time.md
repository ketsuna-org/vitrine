---
layout: doc
title: $time[]
translation_key: docs
category: "Date & Time"
function_name: time
syntax: $time
description: Returns the hour currentle to the format HH:MM:SS. Resolved to the runtime.
---

# $time[]

The function `$time[]` retourne l'hour currentle to the format `HH:MM:SS` (hours:minutes:seconds).

> **Important:** This function utilise l'identifier special `((time))` qui est resolved to the **runtime**, it is-à-dire to each exécution of the command.

## Syntax

```
$time
```

> **Note :** This function ne prend no parameter.

## Return Value

A string of becauseactères to the format `HH:MM:SS` (ex: `14:30:05`).

## Examples

### Time simple

```bdfd
Il est $time.
```

### Embed with the hour

```bdfd
$title[🕐 Horloge of the server]
$description[Time currentle : **$time**]
$footer[Format 24h]
```

### Timestamp complete

```bdfd
📅 $date to $time
```

## Notes

- `$time[]` est l'équivaslow of `$hour:$minute:$second` en a single function.
- L'hour est basée on the fuseau horaire of the server exécutant the bot.
- Pour un timestamp Unix, utilisez `$getTimestamp[]`.
