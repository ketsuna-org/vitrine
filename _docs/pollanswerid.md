---
layout: doc
title: $pollAnswerID[]
translation_key: docs
category: "Messages"
function_name: pollAnswerID
syntax: $pollAnswerID
description: "In a poll vote event, the ID of the answer voted."
---
# $pollAnswerID — In a poll vote event, the ID of the answer voted.

## Syntax

```
$pollAnswerID
```

## Parameters

None.

## Return Value

- Number.

## Usage

```
$pollAnswerID → result
```

## Example

```bdfd
$sendMessage[$pollAnswerID]
```
