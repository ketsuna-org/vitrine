---
layout: doc
title: $reactionEmoji[]
translation_key: docs
category: "Events"
function_name: reactionEmoji
syntax: $reactionEmoji
description: "Returns the emoji used: the character, or its <:name:id> form for a custom emoji."
---
# $reactionEmoji — Returns the emoji used: the character, or its <:name:id> form for a custom emoji.

## Syntax

```
$reactionEmoji
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$reactionEmoji → result
```

## Example

```bdfd
$sendMessage[$reactionEmoji]
```
