---
layout: doc
title: $applicationCommandOptions[]
translation_key: docs
category: "Interactions"
function_name: applicationCommandOptions
syntax: $applicationCommandOptions[(id)]
description: "Options (JSON) of the command being run, or of the application command with this ID."
---
# $applicationCommandOptions — Options (JSON) of the command being run, or of the application command with this ID.

## Syntax

```
$applicationCommandOptions[(id)]
```

## Parameters

- **id** *(String, optional)* — Command ID

## Return Value

- Json.

## Usage

```
$applicationCommandOptions[id] → result
```

## Example

```bdfd
$sendMessage[$applicationCommandOptions[id]]
```
