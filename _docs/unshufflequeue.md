---
layout: doc
title: $unshuffleQueue[]
translation_key: docs
category: "Music"
function_name: unshuffleQueue
syntax: $unshuffleQueue
description: "Puts the upcoming tracks back in the order they had before the last $shuffleQueue."
---
# $unshuffleQueue — Puts the upcoming tracks back in the order they had before the last $shuffleQueue.

## Syntax

```
$unshuffleQueue
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$unshuffleQueue → result
```

## Example

```bdfd
$sendMessage[$unshuffleQueue]
```
