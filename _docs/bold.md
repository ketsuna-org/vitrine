---
layout: doc
title: $bold[]
translation_key: docs
category: "Formatting"
function_name: bold
syntax: $bold[text]
description: "Makes the text bold."
---
# $bold — Makes the text bold.

## Syntax

```
$bold[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$bold[hi] → "**hi**"
```

## Example

```bdfd
$sendMessage[$bold[hi]]
```
