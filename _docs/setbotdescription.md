---
layout: doc
title: $setBotDescription[]
translation_key: docs
category: "Bot profile"
function_name: setBotDescription
syntax: $setBotDescription[description]
description: "Sets the description of the application (400 characters at most)."
---
# $setBotDescription — Sets the description of the application (400 characters at most).

## Syntax

```
$setBotDescription[description]
```

## Parameters

- **description** *(String, required)* — New description

## Return Value

- String.

## Usage

```
$setBotDescription[description] → result
```

## Example

```bdfd
$sendMessage[$setBotDescription[description]]
```
