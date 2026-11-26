---
layout: doc
title: $pollAnswerText[]
translation_key: docs
category: "Messages"
function_name: pollAnswerText
syntax: $pollAnswerText
description: "In a poll vote event, the text of the answer voted."
---
# $pollAnswerText — In a poll vote event, the text of the answer voted.

## Syntax

```
$pollAnswerText
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$pollAnswerText → result
```

## Example

```bdfd
$sendMessage[$pollAnswerText]
```
