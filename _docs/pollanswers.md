---
layout: doc
title: $pollAnswers[]
translation_key: docs
category: "Polls"
function_name: pollAnswers
syntax: $pollAnswers[text;emoji]
description: "Adds several answers to the poll: text, emoji, text, emoji…"
---
# $pollAnswers — Adds several answers to the poll: text, emoji, text, emoji…

## Syntax

```
$pollAnswers[text;emoji]
```

## Parameters

- **text;emoji** *(String, required)* — Pairs of answer text and emoji

## Return Value

- None.

## Usage

```
$pollAnswers[Yes;👍;No;👎] → result
```

## Example

```bdfd
$sendMessage[$pollAnswers[Yes;👍;No;👎]]
```
