---
layout: doc
title: $pollAnswerMessageID[]
translation_key: docs
category: "Polls"
function_name: pollAnswerMessageID
syntax: $pollAnswerMessageID
description: "In a poll vote event, the ID of the poll message."
---
# $pollAnswerMessageID — In a poll vote event, the ID of the poll message.

## Syntax

```
$pollAnswerMessageID
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$pollAnswerMessageID → result
```

## Example

```bdfd
$sendMessage[$pollAnswerMessageID]
```
