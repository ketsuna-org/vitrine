---
layout: doc
title: $slug[]
translation_key: docs
category: "Math & Text"
function_name: slug
syntax: $slug[text]
description: "Turns a text into a link or name safe form: lower case, no accent, words joined by `-`."
---
# $slug — Turns a text into a link or name safe form: lower case, no accent, words joined by `-`

## Syntax

```
$slug[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$slug[Été à Paris !] → "ete-a-paris"
```

## Example

```bdfd
$sendMessage[$slug[Été à Paris !]]
```
