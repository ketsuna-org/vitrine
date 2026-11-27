---
layout: doc
title: $hyperlink[]
translation_key: docs
category: "Formatting"
function_name: hyperlink
syntax: $hyperlink[text;url]
description: "Creates a Markdown link."
---
# $hyperlink — Creates a Markdown link.

## Syntax

```
$hyperlink[text;url]
```

## Parameters

- **text** *(text, required)* — The text.
- **url** *(text, required)* — The link target.

## Return Value

- string.

## Usage

```
$hyperlink[Docs;https://a.fr] → "[Docs](https://a.fr)"
```

## Example

```bdfd
$sendMessage[$hyperlink[Docs;https://a.fr]]
```
