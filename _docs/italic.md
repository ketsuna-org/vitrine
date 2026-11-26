---
layout: doc
title: $italic[]
translation_key: docs
category: "Formatting"
function_name: italic
syntax: $italic[text]
description: "Makes the text italic."
---
# $italic — Makes the text italic.

## Syntax

```
$italic[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$italic[hi] → "_hi_"
```

## Example

```bdfd
$sendMessage[$italic[hi]]
```
