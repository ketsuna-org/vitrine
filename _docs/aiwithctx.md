---
layout: doc
title: $aiWithCtx[]
translation_key: docs
category: "AI"
function_name: aiWithCtx
syntax: $aiWithCtx[prompt;(system prompt);(response token limit)]
description: "Like `$ai`, with the context of the message that triggered the command. Uses your AI credits."
---
# $aiWithCtx — Like `$ai`, with the context of the message that triggered the command. Uses your AI credits.

## Syntax

```
$aiWithCtx[prompt;(system prompt);(response token limit)]
```

## Parameters

- **prompt** *(text, required)* — For example `Summarize the message above`.
- **system prompt** *(text, optional)* — Extra instructions, added after the message context.
- **response token limit** *(number, optional)* — Caps the length of the answer.

## Return Value

- The AI answer, trimmed. Empty when the call failed.

## Usage

```
$aiWithCtx[$message;Be friendly and casual]
```

## Important Notes

- The AI receives the author (name and ID), channel, server, message content and the quoted message (200 characters at most).
- Same credits, limits and availability as `$ai`.

## Example

```bdfd
$nomention
$aiWithCtx[$message;Be friendly and casual]
```
