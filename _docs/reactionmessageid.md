---
layout: doc
title: $reactionMessageID[]
translation_key: docs
category: "Events"
function_name: reactionMessageID
syntax: $reactionMessageID
description: "Returns the ID of the message reacted to (reaction events)."
---
# $reactionMessageID — Returns the ID of the message reacted to (reaction events).

## Syntax

```
$reactionMessageID
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$reactionMessageID → result
```

## Example

```bdfd
$sendMessage[$reactionMessageID]
```
