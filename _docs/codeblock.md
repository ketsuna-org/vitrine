---
layout: doc
title: $codeBlock[]
translation_key: docs
category: "Formatting"
function_name: codeBlock
syntax: $codeBlock[text;(language)]
description: "Puts the text in a code block, with an optional language."
---
# $codeBlock — Puts the text in a code block, with an optional language.

## Syntax

```
$codeBlock[text;(language)]
```

## Parameters

- **text** *(text, required)* — The text.
- **language** *(text, optional)* — Syntax highlighting language.

## Return Value

- string.

## Usage

```
$codeBlock[x;js] → a js code block
```

## Example

```bdfd
$sendMessage[$codeBlock[x;js]]
```
