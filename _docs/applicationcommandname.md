---
layout: doc
title: $applicationCommandName[]
translation_key: docs
category: "Interactions"
function_name: applicationCommandName
syntax: $applicationCommandName[(id)]
description: "Name of the command being run, or of the application command with this ID."
---
# $applicationCommandName — Name of the command being run, or of the application command with this ID.

## Syntax

```
$applicationCommandName[(id)]
```

## Parameters

- **id** *(String, optional)* — Command ID (empty: the current command)

## Return Value

- String.

## Usage

```
$applicationCommandName[id] → result
```

## Example

```bdfd
$sendMessage[$applicationCommandName[id]]
```
