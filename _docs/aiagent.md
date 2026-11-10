---
layout: doc
title: $aiAgent[]
translation_key: docs
category: "AI"
function_name: aiAgent
syntax: $aiAgent[prompt;(system prompt);(functions);(response token limit)]
description: "Asks the AI, which can call the functions you list as tools. Uses your AI credits."
---
# $aiAgent — Asks the AI, which can call the functions you list as tools. Uses your AI credits.

## Syntax

```
$aiAgent[prompt;(system prompt);(functions);(response token limit)]
```

## Parameters

- **prompt** *(text, required)* — The request, for example `What is the user's score?`.
- **system prompt** *(text, optional)* — Extra instructions, added after the message context.
- **functions** *(text, optional)* — Comma-separated function names the AI may call, for example `getUserVar,setUserVar,title`.
- **response token limit** *(number, optional)* — Caps the length of each answer.

## Return Value

- The final answer of the AI. If the limit of 10 rounds is reached, the last message of the AI.

## Usage

```
$aiAgent[$message;Answer using the stored score;listVar,getUserVar]
```

## Important Notes

- The AI calls a listed function, receives its result, then calls another or answers. 10 rounds at most; each round is billed like a `$ai` call.
- Only the functions you list can be called, and `$ai` functions are never offered (no recursion).
- Security: a user can write a message that makes the AI call a listed function on their behalf (prompt injection). Do not list powerful functions such as `ban` or `setVar` in a command anyone can use; restrict it to owners or trusted roles.
- Same limits and availability as `$ai`.

## Example

```bdfd
$nomention
$aiAgent[$message;Answer the question using their stored score if needed.;listVar,getUserVar]
```
