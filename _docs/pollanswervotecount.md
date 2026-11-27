---
layout: doc
title: $pollAnswerVoteCount[]
translation_key: docs
category: "Polls"
function_name: pollAnswerVoteCount
syntax: $pollAnswerVoteCount
description: "In a poll vote event, how many votes the answer has."
---
# $pollAnswerVoteCount — In a poll vote event, how many votes the answer has.

## Syntax

```
$pollAnswerVoteCount
```

## Parameters

None.

## Return Value

- Number.

## Usage

```
$pollAnswerVoteCount → result
```

## Example

```bdfd
$sendMessage[$pollAnswerVoteCount]
```
