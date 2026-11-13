---
layout: doc
title: $linkButton[]
translation_key: docs
category: "Embed & Message"
function_name: linkButton
syntax: $linkButton[label;url;(newRow);(messageID)]
description: "A link button in one call (shortcut of `$addButton` with the `link` style)."
---
# $linkButton — A link button in one call (shortcut of `$addButton` with the `link` style)

## Syntax

```
$linkButton[label;url;(newRow);(messageID)]
```

## Parameters

- **label** *(text, required)* — Up to 80 characters.
- **url** *(URL, required)* — `http` or `https`.
- **newRow** *(`yes` or `no`, optional)* — `yes` starts a new row.
- **messageID** *(ID, optional)* — Edit this message instead of the one being built.

## Return Value

- empty.

## Usage

```
$linkButton[Documentation;https://example.com]
```

## Example

```bdfd
$linkButton[Documentation;https://example.com]
$sendMessage[Read the docs]
```
