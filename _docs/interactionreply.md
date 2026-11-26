---
layout: doc
title: $interactionReply[]
translation_key: docs
category: "Interactions"
function_name: interactionReply
syntax: $interactionReply[content;(returnMessageID)]
description: "Sends the response now, with this text added: the first call answers the interaction, the next ones are follow-ups."
---
# $interactionReply — Sends the response now, with this text added: the first call answers the interaction, the next ones are follow-ups.

## Syntax

```
$interactionReply[content;(returnMessageID)]
```

## Parameters

- **content** *(String, required)* — Text added to the response
- **returnMessageID** *(Boolean, optional)* — Return the ID of the sent message

## Return Value

- String.

## Usage

```
$interactionReply[content;returnMessageID] → result
```

## Example

```bdfd
$sendMessage[$interactionReply[content;returnMessageID]]
```
