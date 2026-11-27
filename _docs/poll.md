---
layout: doc
title: $poll[]
translation_key: docs
category: "Polls"
function_name: poll
syntax: $poll[question;duration;(multiselect);(layout)]
description: "Starts a poll sent as a message of its own in the current channel when the script ends. Add 2 to 10 answers with $pollAnswer / $pollAnswers."
---
# $poll — Starts a poll sent as a message of its own in the current channel when the script ends. Add 2 to 10 answers with $pollAnswer / $pollAnswers.

## Syntax

```
$poll[question;duration;(multiselect);(layout)]
```

## Parameters

- **question** *(String, required)* — Question (300 characters)
- **duration** *(String, required)* — Duration, for example 1h or 2d (1 hour to 32 days)
- **multiselect** *(Boolean, optional)* — Allow several answers (false)
- **layout** *(String, optional)* — Default

## Return Value

- None.

## Usage

```
$poll[Favourite?;1d;false] → result
```

## Example

```bdfd
$sendMessage[$poll[Favourite?;1d;false]]
```
