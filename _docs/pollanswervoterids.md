---
layout: doc
title: $pollAnswerVoterIDs[]
translation_key: docs
category: "Messages"
function_name: pollAnswerVoterIDs
syntax: $pollAnswerVoterIDs[(separator)]
description: "In a poll vote event, the IDs of the users who voted for the answer."
---
# $pollAnswerVoterIDs — In a poll vote event, the IDs of the users who voted for the answer.

## Syntax

```
$pollAnswerVoterIDs[(separator)]
```

## Parameters

- **separator** *(String, optional)* — Separator (default ", ")

## Return Value

- String.

## Usage

```
$pollAnswerVoterIDs[, ] → result
```

## Example

```bdfd
$sendMessage[$pollAnswerVoterIDs[, ]]
```
