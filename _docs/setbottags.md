---
layout: doc
title: $setBotTags[]
translation_key: docs
category: "Bot profile"
function_name: setBotTags
syntax: $setBotTags[tags]
description: "Sets the tags of the application: up to 5, separated by commas, 20 characters each."
---
# $setBotTags — Sets the tags of the application: up to 5, separated by commas, 20 characters each.

## Syntax

```
$setBotTags[tags]
```

## Parameters

- **tags** *(String, required)* — Tags separated by commas

## Return Value

- String.

## Usage

```
$setBotTags[tags] → result
```

## Example

```bdfd
$sendMessage[$setBotTags[tags]]
```
