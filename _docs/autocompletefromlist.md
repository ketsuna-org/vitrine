---
layout: doc
title: $autocompleteFromList[]
translation_key: docs
category: "Embed & Message"
function_name: autocompleteFromList
syntax: $autocompleteFromList[list;(separator);(filter)]
description: "In an autocomplete script, suggests every item of a list in one call (replaces one `$appendOptionSuggestion` per choice)."
---
# $autocompleteFromList — In an autocomplete script, suggests every item of a list in one call (replaces one `$appendOptionSuggestion` per choice)

## Syntax

```
$autocompleteFromList[list;(separator);(filter)]
```

## Parameters

- **list** *(text, required)* — The items, joined by the separator.
- **separator** *(text, optional)* — Default: `,`.
- **filter** *(`yes` or `no`, optional)* — `yes` (default): only the items that contain what the member typed.

## Return Value

- empty.

## Usage

```
$autocompleteFromList[red,green,blue]
```

## Important Notes

- Discord shows 25 suggestions at most; an item longer than 100 characters, or not a number for a number option, is skipped.

## Example

```bdfd
$sendMessage[$autocompleteFromList[red,green,blue]]
```
