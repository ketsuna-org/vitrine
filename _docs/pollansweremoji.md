---
layout: doc
title: $pollAnswerEmoji[]
translation_key: docs
category: "Polls"
function_name: pollAnswerEmoji
syntax: $pollAnswerEmoji
description: "In a poll vote event, the emoji of the answer voted."
---
# $pollAnswerEmoji — In a poll vote event, the emoji of the answer voted.

## Syntax

```
$pollAnswerEmoji
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$pollAnswerEmoji → result
```

## Example

```bdfd
$sendMessage[$pollAnswerEmoji]
```
