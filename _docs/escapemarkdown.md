---
layout: doc
title: $escapeMarkdown[]
translation_key: docs
category: "Math & Text"
function_name: escapeMarkdown
syntax: $escapeMarkdown[text]
description: "Adds a backslash before `* _ ~ ` | > \\` so a user text is shown as typed and not formatted."
---
# $escapeMarkdown — Adds a backslash before `* _ ~ ` | > \` so a user text is shown as typed and not formatted

## Syntax

```
$escapeMarkdown[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$escapeMarkdown[*a*] → "\\*a\\*"
```

## Example

```bdfd
$sendMessage[$escapeMarkdown[*a*]]
```
