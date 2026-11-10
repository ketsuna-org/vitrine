---
layout: doc
title: $ai[]
translation_key: docs
category: "AI"
function_name: ai
syntax: $ai[prompt;(system prompt);(response token limit)]
description: "Asks the AI model a question and returns its answer. Uses your AI credits."
---
# $ai — Asks the AI model a question and returns its answer. Uses your AI credits.

## Syntax

```
$ai[prompt;(system prompt);(response token limit)]
```

## Parameters

- **prompt** *(text, required)* — The message sent to the AI, for example `Say something funny!`.
- **system prompt** *(text, optional)* — Instructions that shape its behavior, for example `Act funny`.
- **response token limit** *(number, optional)* — Caps the length of the answer. 500 by default, 1500 at most.

## Return Value

- The AI answer, trimmed. Empty when the call failed (see `$aiError`).

## Usage

```
$ai[What is 2+5?;You are a math teacher]
```

## Important Notes

- Each call spends AI credits from the account that owns the bot: the tokens of the prompt that are not served from the cache plus the tokens of the answer, 1 credit = 1000 tokens. There is no fixed price per call.
- Free and Premium accounts can use it; the call fails when there are no credits left.
- Not available on a self-hosted runner or when the app is offline or signed out: the function returns an empty text and `$aiError` is `ai_unavailable`.
- Tokens, API keys and e-mail addresses in the prompt are masked before it is sent to the AI provider.
- At most 20 calls per minute and per bot.

## Example

```bdfd
$nomention
$ai[What is 2+5?;You are a math teacher]
```
