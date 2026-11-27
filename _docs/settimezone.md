---
layout: doc
title: $setTimezone[]
translation_key: docs
category: "Date & Time"
function_name: setTimezone
syntax: $setTimezone[timezone]
description: "Sets the timezone for time functions"
---
# $setTimezone — Sets the timezone for time functions

## Syntax

```
$setTimezone[timezone]
```

## Parameters

- **timezone** *(text, required)* — The timezone to set

## Return Value

- String.

## Usage

```
$setTimezone[timezone] → result
```

## Example

```bdfd
$sendMessage[x$setTimezone[Europe/Paris]]
```
