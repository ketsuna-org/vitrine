---
layout: doc
title: $autoCompleteOptionValue
translation_key: docs
category: "Components & Interactions"
function_name: autoCompleteOptionValue
syntax: $autoCompleteOptionValue
description: Returns the text typed so far in the option, inside an autocomplete script.
---

# $autoCompleteOptionValue

Returns the **text typed so far** in the option being completed, inside an option's autocomplete script. It takes no argument. Anywhere else it raises `Autocomplete functions can only be used in an autocomplete script.`

## Syntax

```text
$autoCompleteOptionValue
```

## Behavior

- The value is the raw text of the field; it is empty when the user has typed nothing yet.
- Read-only script, 2 seconds (Discord gives 3 and cannot defer), 25 suggestions at most: see [`$appendOptionSuggestion`](/docs/appendoptionsuggestion/) for how to enable autocomplete on an option and for the limits.

## Example

```bdfd
$if[$autoCompleteOptionValue==]
  $appendOptionSuggestion[Start typing...;none]
$else
  $appendOptionSuggestion[Search: $autoCompleteOptionValue;$autoCompleteOptionValue]
$endif
```
