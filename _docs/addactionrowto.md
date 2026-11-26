---
layout: doc
title: $addActionRowTo[]
translation_key: docs
category: "Components & Interactions"
function_name: addActionRowTo
syntax: $addActionRowTo[channelID;messageID;components;(keepexistingrows)]
description: "Adds an action row (or rows) to a message"
---
# $addActionRowTo — Adds an action row (or rows) to a message

## Syntax

```
$addActionRowTo[channelID;messageID;components;(keepexistingrows)]
```

## Parameters

- **channelID** *(id, required)* — The channel id to pull message from
- **messageID** *(id, required)* — The message to add row to
- **components** *(text, required)* — Components for this row
- **keepexistingrows** *(boolean, optional)* — Whether to keep or remove existing rows of given message

## Return Value

- Boolean.

## Usage

```
$addActionRowTo[channelID;messageID;components;(keepexistingrows)] → result
```

## Example

```bdfd
$sendMessage[$addActionRowTo[30;1001;$addButton[yes;ok;Ok;primary]]]
```
