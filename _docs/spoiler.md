---
layout: doc
title: $spoiler[]
translation_key: docs
category: "Formatting"
function_name: spoiler
syntax: $spoiler[text]
description: "Hides the text behind a spoiler."
---
# $spoiler — Hides the text behind a spoiler.

## Syntax

```
$spoiler[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$spoiler[hi] → "||hi||"
```

## Example

```bdfd
$sendMessage[$spoiler[hi]]
```
