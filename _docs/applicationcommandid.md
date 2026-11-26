---
layout: doc
title: $applicationCommandID[]
translation_key: docs
category: "Interactions"
function_name: applicationCommandID
syntax: $applicationCommandID[(name)]
description: "ID of the command being run, or of the global application command with this name."
---
# $applicationCommandID — ID of the command being run, or of the global application command with this name.

## Syntax

```
$applicationCommandID[(name)]
```

## Parameters

- **name** *(String, optional)* — Command name (empty: the current command)

## Return Value

- String.

## Usage

```
$applicationCommandID[name] → result
```

## Example

```bdfd
$sendMessage[$applicationCommandID[name]]
```
