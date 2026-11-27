---
layout: doc
title: $mentionedChannelCount[]
translation_key: docs
category: "Entity Info"
function_name: mentionedChannelCount
syntax: $mentionedChannelCount
description: "Returns the mentioned channel count"
---
# $mentionedChannelCount — Returns the mentioned channel count

## Syntax

```
$mentionedChannelCount
```

## Parameters

None.

## Return Value

- Number.

## Usage

```
$mentionedChannelCount → result
```

## Example

```bdfd
$sendMessage[$mentionedChannelCount]
```
