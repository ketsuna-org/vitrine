---
layout: doc
title: $loadEmbeds[]
translation_key: docs
category: "Responses"
function_name: loadEmbeds
syntax: $loadEmbeds[embeds]
description: "Adds embeds from a JSON object or list (Discord embed format) to the response, up to 10 in all."
---
# $loadEmbeds — Adds embeds from a JSON object or list (Discord embed format) to the response, up to 10 in all.

## Syntax

```
$loadEmbeds[embeds]
```

## Parameters

- **embeds** *(Json, required)* — Embed object or list

## Return Value

- None.

## Usage

```
$loadEmbeds[embeds] → result
```

## Example

```bdfd
$sendMessage[$loadEmbeds[embeds]]
```
