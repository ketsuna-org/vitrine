---
layout: doc
title: $calendarDay[]
translation_key: docs
category: "Date & Time"
function_name: calendarDay
syntax: $calendarDay
description: "Returns the calendar day"
---
# $calendarDay — Returns the calendar day

## Syntax

```
$calendarDay
```

## Parameters

None.

## Return Value

- Number.

## Usage

```
$calendarDay → result
```

## Example

```bdfd
$sendMessage[$isNumber[$calendarDay]]
```
