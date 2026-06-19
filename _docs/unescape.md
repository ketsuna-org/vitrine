---
layout: doc
title: $unEscape
translation_key: docs
category: "Math & Text"
function_name: unEscape
syntax: $unEscape[text]
description: Converts the escape sequences in a string into their real characters. For example, \n becomes a real line break.
---
# $unEscape

The function `$unEscape[]` **converts escape sequences** (`\n`, `\t`, `\\`, etc.) into their real characters.

## Syntax

```
$unEscape[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | String containing escape sequences to resolve. |

## Return Value

- **Type**: String
- The text with escape sequences resolved.

## Supported Sequences

| Sequence | Result |
|---|---|
| `\n` | Line break |
| `\t` | Tab |
| `\\` | Backslash |
| `\"` | Double quote |
| `\'` | Single quote |

## Examples

### Multi-line Text

```bdfd
$sendMessage[$unEscape[Line 1\nLine 2\nLine 3]]
```

### Message Formatted from a Variable

```bdfd
$let[data;Name: John\nAge: 25\nCity: Paris]
$sendMessage[$unEscape[$var[data]]]
```

### Code with Quotes

```bdfd
$sendMessage[$unEscape[He said: \"Hello!\" ]]
```

### Embed with Formatted Description

```bdfd
$title[Information]
$description[$unEscape[**User:** $username\n**ID:** $authorID\n**Role:** $getRole[$authorID;1]]]
$sendMessage[]
```

## Notes

- Do not confuse with `$disableSpecialEscaping` which disables BDFD interpretation.
- Useful for formatting text stored in variables or databases.
- To encode text for URLs, use `$urlEncode[]`.
