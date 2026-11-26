---
layout: doc
title: $attachment[]
translation_key: docs
category: "Responses"
function_name: attachment
syntax: $attachment[path;name;(asText);(encoding)]
description: "Adds a file to the response, from a URL or data URL, or from a text (asText true). 8 MB at most."
---
# $attachment — Adds a file to the response, from a URL or data URL, or from a text (asText true). 8 MB at most.

## Syntax

```
$attachment[path;name;(asText);(encoding)]
```

## Parameters

- **path** *(String, required)* — URL, or the text when asText is true
- **name** *(String, required)* — File name with its extension
- **asText** *(Boolean, optional)* — Use the first argument as the file content
- **encoding** *(String, optional)* — Ignored, always UTF-8

## Return Value

- None.

## Usage

```
$attachment[path;name;asText;encoding] → result
```

## Example

```bdfd
$sendMessage[$attachment[path;name;asText;encoding]]
```
