---
layout: doc
title: $reactionAuthorID[]
translation_key: docs
category: "Events"
function_name: reactionAuthorID
syntax: $reactionAuthorID
description: "Returns the ID of the user who reacted (reaction events)."
---
# $reactionAuthorID — Returns the ID of the user who reacted (reaction events).

## Syntax

```
$reactionAuthorID
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$reactionAuthorID → result
```

## Example

```bdfd
$sendMessage[$reactionAuthorID]
```
