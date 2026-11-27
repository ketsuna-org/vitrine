---
layout: doc
title: $interactionUpdate[]
translation_key: docs
category: "Interactions"
function_name: interactionUpdate
syntax: $interactionUpdate[content]
description: "Replaces the text of the message that carries the clicked button or select menu (the click is acknowledged as an update, without a new message)."
---
# $interactionUpdate — Replaces the text of the message that carries the clicked button or select menu (the click is acknowledged as an update, without a new message).

## Syntax

```
$interactionUpdate[content]
```

## Parameters

- **content** *(String, required)* — New text of the message

## Return Value

- String.

## Usage

```
$interactionUpdate[content] → result
```

## Example

```bdfd
$sendMessage[$interactionUpdate[content]]
```
