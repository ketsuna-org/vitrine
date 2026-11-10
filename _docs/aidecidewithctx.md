---
layout: doc
title: $aiDecideWithCtx[]
translation_key: docs
category: "AI"
function_name: aiDecideWithCtx
syntax: $aiDecideWithCtx[question]
description: "Asks the AI a yes/no question about the message that triggered the command. Uses your AI credits."
---
# $aiDecideWithCtx — Asks the AI a yes/no question about the message that triggered the command. Uses your AI credits.

## Syntax

```
$aiDecideWithCtx[question]
```

## Parameters

- **question** *(text, required)* — For example `Does this message contain profanity?`.

## Return Value

- `true` or `false`. `false` when the call failed.

## Usage

```
$aiDecideWithCtx[Does this message contain profanity?]
```

## Important Notes

- Receives the same message context as `$aiWithCtx`. Same limits and availability as `$ai`.

## Example

```bdfd
$nomention
$if[$aiDecideWithCtx[Does this message contain profanity?]==true]
$deleteMessage
Please keep it clean!
$endif
```
