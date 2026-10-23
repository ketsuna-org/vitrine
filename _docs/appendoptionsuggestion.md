---
layout: doc
title: $appendOptionSuggestion
translation_key: docs
category: "Components & Interactions"
function_name: appendOptionSuggestion
syntax: $appendOptionSuggestion[label;value]
description: Adds one suggestion to the answer of an option autocomplete script. Only usable in that script.
---

# $appendOptionSuggestion

`$appendOptionSuggestion[label;value]` adds one suggestion to the list shown while a user types in a slash-command option with autocomplete. It only works in an **autocomplete script** (see below); anywhere else it raises `Autocomplete functions can only be used in an autocomplete script.`

## Syntax

```text
$appendOptionSuggestion[label;value]
```

## Parameters

| Parameter | Description |
|---|---|
| `label` | Required. What the user sees. Trimmed; **cut to 100 characters**. Empty raises `Suggestion label is required.` |
| `value` | Required. What the command receives. Empty raises `Suggestion value is required.` Its form depends on the option type (below). |

Exactly two arguments are required. The function returns an empty string.

| Option type | Value |
|---|---|
| `string` | Text of 100 characters at most (`Suggestion value must be at most 100 characters.`) |
| `integer` | A whole number (`Suggestion value must be an integer.`), sent to Discord as a number |
| `number` | A decimal number (`Suggestion value must be a number.`), sent to Discord as a number |

## Behavior

- **25 suggestions at most** (Discord's limit). Further calls are **ignored**, with no error.
- The script runs in **read-only** mode: variables, HTTP, JSON, text, math, and reading members, users, servers, roles, channels and permissions work; sending a message, moderation and channel changes do not. Written text or a message sent raises `An autocomplete answer cannot send messages.` (`$nomention` from the BDFD wiki is still accepted).
- **Time:** Discord allows 3 seconds and cannot defer an autocomplete, so the script gets **2 seconds**. An error or a timeout answers with an **empty list** (Discord shows no suggestion) and the reason is written to the bot log.

## Enabling autocomplete on an option

The callback is stored **with the option** that needs it, not in the command script (which contains sending functions that do not exist in an autocomplete answer). Only `string`, `integer` and `number` options can have autocomplete. In the command definition:

```json
{
  "type": "string",
  "name": "color",
  "description": "Color",
  "autocomplete": {
    "enabled": true,
    "mode": "script",
    "script": "$appendOptionSuggestion[Red;red]$appendOptionSuggestion[Green;green]"
  }
}
```

`autocomplete.enabled = true` replaces the static `choices` of the option. In BDFD the callback is `$onAutoComplete[Name]`, attached to the command; here, use [`$autoCompleteOptionName`](/docs/autocompleteoptionname/) to share one script between options by copying it.

## Examples

### Filter by what the user typed

```bdfd
$if[$checkContains[red;$autoCompleteOptionValue]==true]
  $appendOptionSuggestion[Red;red]
$endif
$if[$checkContains[green;$autoCompleteOptionValue]==true]
  $appendOptionSuggestion[Green;green]
$endif
```

### Numeric option

For an `integer` option:

```bdfd
$appendOptionSuggestion[Ten;10]
$appendOptionSuggestion[Twenty;20]
```
