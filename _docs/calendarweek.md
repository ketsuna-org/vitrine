---
layout: doc
title: $calendarWeek[]
translation_key: docs
category: "Date & Time"
function_name: calendarWeek
syntax: $calendarWeek
description: "Returns the calendar week"
---
# $calendarWeek — Returns the calendar week

## Syntax

```
$calendarWeek
```

## Parameters

None.

## Return Value

- Number.

## Usage

```
$calendarWeek → result
```

## Example

```bdfd
$sendMessage[$isNumber[$calendarWeek]]
```
