---
layout: doc
title: $applicationCommandDescription[]
translation_key: docs
category: "Interactions"
function_name: applicationCommandDescription
syntax: $applicationCommandDescription[(id)]
description: "Description of the command being run, or of the application command with this ID."
---
# $applicationCommandDescription — Description of the command being run, or of the application command with this ID.

## Syntax

```
$applicationCommandDescription[(id)]
```

## Parameters

- **id** *(String, optional)* — Command ID

## Return Value

- String.

## Usage

```
$applicationCommandDescription[id] → result
```

## Example

```bdfd
$sendMessage[$applicationCommandDescription[id]]
```
