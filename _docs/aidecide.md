---
layout: doc
title: $aiDecide[]
translation_key: docs
category: "AI"
function_name: aiDecide
syntax: $aiDecide[content;question]
description: "Asks the AI a yes/no question about a content and returns true or false. Uses your AI credits."
---
# $aiDecide — Asks the AI a yes/no question about a content and returns true or false. Uses your AI credits.

## Syntax

```
$aiDecide[content;question]
```

## Parameters

- **content** *(text, required)* — The content to judge, for example a message or a variable.
- **question** *(text, required)* — A yes/no question about it.

## Return Value

- `true` or `false`. `false` when the call failed (see `$aiError`).

## Usage

```
$aiDecide[$message;Is this message a question?]
```

## Important Notes

- Costs a few credits per call (short answer). Same limits and availability as `$ai`.

## Example

```bdfd
$nomention
$if[$aiDecide[$message;Is this message a question?]==true]
That looks like a question!
$else
That is not a question.
$endif
```
