---
layout: doc
title: $subtext[]
translation_key: docs
category: "Formatting"
function_name: subtext
syntax: $subtext[text]
description: "Writes the text as small subtext (the `-#` Markdown line)."
---
# $subtext — Writes the text as small subtext (the `-#` Markdown line).

## Syntax

```
$subtext[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$subtext[hi] → "-# hi"
```

## Example

```bdfd
$sendMessage[$subtext[hi]]
```
