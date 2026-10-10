---
layout: doc
title: $getTextSplitIndex
translation_key: docs
category: "Math & Text"
function_name: getTextSplitIndex
syntax: $getTextSplitIndex[value]
description: Returns the position (starting at 1) of a value in the elements produced by the last $textSplit, or -1 if it is not found.
---
# $getTextSplitIndex — Position of a Value in the Split Text

`$getTextSplitIndex[value]` searches `value` among the elements created by the last `$textSplit[]` and returns its position.

## Syntax

```
$getTextSplitIndex[value]
```

## Parameters

| Parameter | Description |
|---|---|
| `value` | The text to search for. Required. It must match an element exactly (same case, no trimming). |

## Return Value

- **Type**: `string` (representing a number)
- The **one-based** position of the first element equal to `value` (1 for the first element, 2 for the second, etc.).
- `-1` if no element equals `value`, or if no `$textSplit[]` was performed.

## Usage

```
$textSplit[red,green,blue,yellow;,]
```

| Call | Result |
|---------|-------|
| `$getTextSplitIndex[red]` | `1` |
| `$getTextSplitIndex[green]` | `2` |
| `$getTextSplitIndex[blue]` | `3` |
| `$getTextSplitIndex[purple]` | `-1` |

## Common Patterns

### Check that a value is present

```bdfd
$textSplit[$message;,]
$if[$getTextSplitIndex[admin]!=-1]
  $sendMessage[The list contains "admin".]
$endif
```

### Read the element that follows a value

```bdfd
$textSplit[key1,value1,key2,value2;,]
$sendMessage[$splitText[$sum[$getTextSplitIndex[key2];1]]]
```

## Important Notes

- **One-based**: the first element is at position `1`, consistent with `$splitText[]`.
- **First match only**: if the value appears several times, the position of the first occurrence is returned.
- **Required parameter**: `$getTextSplitIndex` without brackets is refused; the function takes exactly one parameter.

## Examples

### Finding Index of a Value

```bdfd
$textSplit[red,green,blue,yellow;,]
$title[Search Element Index]
$description[The color `blue` is located at index: **$getTextSplitIndex[blue]**]
$color[#5865F2]
```
