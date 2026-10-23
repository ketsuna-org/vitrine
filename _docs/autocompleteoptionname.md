---
layout: doc
title: $autoCompleteOptionName
translation_key: docs
category: "Components & Interactions"
function_name: autoCompleteOptionName
syntax: $autoCompleteOptionName
description: Returns the name of the option being typed in an autocomplete script.
---

# $autoCompleteOptionName

Returns the **name of the option** the user is typing in, inside an option's autocomplete script. It takes no argument. Anywhere else it raises `Autocomplete functions can only be used in an autocomplete script.`

## Syntax

```text
$autoCompleteOptionName
```

## Behavior

- The script is stored with the option (see [`$appendOptionSuggestion`](/docs/appendoptionsuggestion/#enabling-autocomplete-on-an-option)), so this function lets the same script, copied to several options, branch on which one is active.
- Read-only script, 2 seconds, 25 suggestions at most: same limits as [`$appendOptionSuggestion`](/docs/appendoptionsuggestion/).

## Example

```bdfd
$if[$autoCompleteOptionName==color]
  $appendOptionSuggestion[Red;red]
$else
  $appendOptionSuggestion[Small;s]
  $appendOptionSuggestion[Large;l]
$endif
```
