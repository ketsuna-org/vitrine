---
layout: doc
title: $automodAlertSystemMessageID[]
translation_key: docs
category: "Events"
function_name: automodAlertSystemMessageID
syntax: $automodAlertSystemMessageID
description: "ID of the alert message sent by AutoMod. (AutoMod events)."
---
# $automodAlertSystemMessageID — ID of the alert message sent by AutoMod. (AutoMod events).

## Syntax

```
$automodAlertSystemMessageID
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$automodAlertSystemMessageID → result
```

## Example

```bdfd
$sendMessage[$automodAlertSystemMessageID]
```
