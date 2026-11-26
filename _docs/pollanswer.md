---
layout: doc
title: $pollAnswer[]
translation_key: docs
category: "Polls"
function_name: pollAnswer
syntax: $pollAnswer[text;(emoji)]
description: "Adds an answer to the poll started with $poll."
---
# $pollAnswer — Adds an answer to the poll started with $poll.

## Syntax

```
$pollAnswer[text;(emoji)]
```

## Parameters

- **text** *(String, required)* — Answer text (55 characters)
- **emoji** *(String, optional)* — Unicode emoji or <:name:id>

## Return Value

- None.

## Usage

```
$pollAnswer[Yes;👍] → result
```

## Example

```bdfd
$sendMessage[$pollAnswer[Yes;👍]]
```
