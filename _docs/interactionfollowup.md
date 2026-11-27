---
layout: doc
title: $interactionFollowUp[]
translation_key: docs
category: "Interactions"
function_name: interactionFollowUp
syntax: $interactionFollowUp[content;(returnMessageID)]
description: "Sends the response now as a follow-up of the interaction, with this text added."
---
# $interactionFollowUp — Sends the response now as a follow-up of the interaction, with this text added.

## Syntax

```
$interactionFollowUp[content;(returnMessageID)]
```

## Parameters

- **content** *(String, required)* — Text added to the response
- **returnMessageID** *(Boolean, optional)* — Return the ID of the sent message

## Return Value

- String.

## Usage

```
$interactionFollowUp[content;returnMessageID] → result
```

## Example

```bdfd
$sendMessage[$interactionFollowUp[content;returnMessageID]]
```
