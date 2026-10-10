---
layout: doc
title: $splitText[]
translation_key: docs
category: "Math & Text"
function_name: splitText
syntax: $splitText[index]
description: Retrieves the element at the given 1-based index (or < for the first, > for the last) from the most recent $textSplit.
---
# $splitText — Access a Split Element

`$splitText` retrieves a single element from the list produced by the most recent `$textSplit` call.

## Syntax

```
$splitText[index]
```

## Parameters

- **index** *(required)* — The position of the element, **starting at 1**. Besides an integer, two selectors are accepted: `<` for the first element and `>` for the last one. Surrounding spaces are ignored. Any other value (text, empty) raises the error "Split index must be an integer, < or >.".

## Return Value

- **Type**: `string`
- Returns the text of the element at the given position.
- Returns an **empty string** if the index is `0`, negative or larger than the number of elements. No error is raised.
- Returns an empty string if no `$textSplit` has been run yet.

## Usage

```
$textSplit[Hello World Foo Bar; ]
$splitText[1]  → "Hello"
$splitText[3]  → "Foo"
$splitText[>]  → "Bar"
$splitText[<]  → "Hello"
$splitText[0]  → "" (index 0 does not exist)
$splitText[-1] → "" (negative indices are not supported)
$splitText[99] → "" (out of bounds)
```

## Getting the Last Element

Negative indices are not supported. Use `>` to get the last element, or `$getTextSplitLength` as the index:

```
$textSplit[$message; ]
$sendMessage[The last word you typed was: $splitText[>]]
```

## Common Patterns

### Access by Index

```
$textSplit[$getUserVar[list];,]
$var[first;$splitText[<]]
$var[last;$splitText[>]]
```

### Conditional Element Check

```
$textSplit[$message; ]
$if[$splitText[1]==!help]
  $sendMessage[Help command detected!]
$endif
```

### Building Output from Multiple Elements

```
$textSplit[$message; ]
$sendMessage[Args: 1=$splitText[1], 2=$splitText[2], 3=$splitText[3]]
```

## Important Notes

- **Depends on $textSplit**: `$splitText` has nothing to read without a prior `$textSplit` call; it then returns an empty string.
- **Silent out-of-bounds**: an index outside `1..length` returns `""` without error. Check `$getTextSplitLength` if bounds are uncertain.
- **No mutation**: `$splitText` only reads. Use `$editSplitText[]` to replace an element.

## Examples

### Extracting Words from a Message

```bdfd
$textSplit[$message; ]
$title[Text Analysis]
$description[Original sentence: *$message*]
$addField[First Word;$splitText[1];yes]
$addField[Second Word;$splitText[2];yes]
$addField[Last Word;$splitText[>];yes]
$color[#5865F2]
```
